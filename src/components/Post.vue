<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getPosts } from "../stores/getPosts";
import { getComments } from "../stores/getComments";
import { defineAsyncComponent, inject, onMounted, ref } from "vue";
import axios from "../axios";
import router from "../router";
import { showToast } from "@/types/ToastFunc";

// pinia store
const ShowCommentModal=defineAsyncComponent(()=>import("../Modals/ShowCommentModal.vue"))
const EditPostModal =defineAsyncComponent(()=>import("../Modals/EditPostModal.vue"))
const postsStore = getPosts();
const commentStore = getComments();
const { allPosts } = storeToRefs(postsStore);
const { mainPostId } = storeToRefs(commentStore);
const getAllPosts = postsStore.getAllPosts;
const upToDate = postsStore.upToDate;
let postId = ref();
const postObj = ref();
const userInfo = ref(JSON.parse(localStorage.getItem("user-info")!));
const token = ref(JSON.parse(localStorage.getItem("token")!));
let showComment = ref(false);
let showEdit = ref(false);
const emitter: any = inject("emitter");

const checkAppearance = (userId: number) => {
  let appear =userId== userInfo.value?.id ?true:false;
  return appear;
};

// watch local storage
window.addEventListener("storage", function () {
  if (
    !this.localStorage.getItem("token") ||
    !this.localStorage.getItem("user-info")
  ) {
    this.localStorage.clear();
    userInfo.value="";
    token.value=""
  }
});

// check on mounted
onMounted(() => {
  getAllPosts();
});

// comment post id
const updatePostId = (postid: number) => {
  mainPostId.value = postid;
  postId.value = postid;
  showComment.value = true;
};

// edited post id
const editPostId = (postObject: object) => {
  showEdit.value = true;
  postObj.value = postObject;
};

emitter.on("created", () => {
  upToDate();
});

// delete post
const deletePost = async (postId: number) => {
  const token = JSON.parse(localStorage.getItem("token")!);
  let cnfrm = confirm("are you sure");
  if (!cnfrm) {
    return;
  }
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let result = await axios.delete(`/posts/${postId}`, { headers });
    if (result.status == 200) {
      showToast("success","Post deleted successfully")
      upToDate()
    }
  } catch (e: any) {
    console.log(e.message);
  }
    }
  
const useAvatar = (userName:string) => {
  return `https://ui-avatars.com/api/?background=random&name=${userName}`
}
</script>

<template>
  <div
    class="card my-5 shadow post-card"
    v-for="post in allPosts"
    :key="post['id']"
  >
    <!-- post header -->
    <div
      class="card-header d-flex align-items-center gap-2"
      @click="router.push(`/profile/${post['author']['id']}`)"
      >
      <img
      v-if="post['author']['profile_image']['length']>0"
      loading="lazy"
        class="rounded-circle border border-dark user-img"
        :src="post['author']['profile_image']"
        alt="user img"        
        width="40"
        height="40"
        />
      <img
        v-else
        loading="lazy"
        class="rounded-circle border border-dark user-img"
        :src="useAvatar(post['author']['name'])"
        alt="user img"        
        width="40"
        height="40"
        />
      <h6 class="user-name fw-bold">
        {{ post["author"]["username"] }}
      </h6>
      <button
      type="button"
      class="btn btn-outline-danger btn-sm btn-delete"
        v-if="checkAppearance(post['author']['id'])"
        @click="deletePost(post['id'])"
      >
        delete
      </button>
    </div>

    <!-- post body -->
    <div class="card-body">
      <img loading="lazy" :src="post['image']" alt="" class="w-100"  />
      <small class="text-small">{{ post["created_at"] }}</small>
      <h5 class="card-title" v-if="post['title']">{{ post["title"] }}</h5>
      <p class="card-text" v-if="post['body']">
        {{ post["body"] }}
      </p>
    </div>

    <!-- post footer -->
    <div class="card-footer text-muted">
      <div class="d-flex flex-row align-items-center">
        <button
          v-if="checkAppearance(post['author']['id'])"
          type="button"
          class="btn btn-md btn-edit"
          @click="editPostId(post)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pen"
            viewBox="0 0 16 16"
          >
            <path
              d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
            />
          </svg>
        </button>
        <button
          class="btn p-0 fw-bold btn-comment"
          @click="updatePostId(post['id'])"
          :id="post['id']"
        >
          ({{ post["comments_count"] }}) comments
        </button>
      </div>
    </div>

  </div>
  <!-- edit post model -->
  <edit-post-modal
    v-if="showEdit"
    :show="showEdit"
    @close="showEdit = false"
    :post="postObj"
    @updated="upToDate"
  />
  <ShowCommentModal
    v-if="showComment"
    @closeModal="showComment = false"
    @comment-done="upToDate"
    :id="postId"
  />
</template>
