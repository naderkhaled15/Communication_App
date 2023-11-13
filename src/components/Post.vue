<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getPosts } from "../stores/getPosts";
import { getComments } from "../stores/getComments";
import { inject, onMounted, ref } from "vue";
import ShowCommentModal from "../Modals/ShowCommentModal.vue";
import EditPostModal from "../Modals/EditPostModal.vue";
import axios from "../axios";

// pinia store
const postsStore = getPosts();
const commentStore = getComments();
const { allPosts } = storeToRefs(postsStore);
const { mainPostId } = storeToRefs(commentStore);
const getAllPosts = postsStore.getAllPosts;
const upToDate = postsStore.upToDate;
const emit = defineEmits(["shouldUpdate"]);
let postId = ref();
const postObj = ref();
const userInfo = JSON.parse(localStorage.getItem("user-info")!);
const token = JSON.parse(localStorage.getItem("token")!);

// watch local storage
window.addEventListener("storage", function () {
  this.location.reload();
});

// check on mounted
onMounted(() => {
  getAllPosts();
});

let showComment = ref(false);
let showEdit = ref(false);

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

const emitter: any = inject("emitter");

emitter.on("created", () => {
  upToDate();
});
const checkAppearance = (userId: number) => {
  let appear = userInfo?.id == userId;
  return appear;
};

// delete post
const deletePost = async (postId: number) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let result = await axios.delete(`/posts/${postId}`, { headers });
  upToDate();
};
</script>

<template>
  <div
    class="card my-5 shadow post-card"
    v-for="post in allPosts"
    :key="post['id']"
  >
    <!-- post header -->
    <div class="card-header d-flex align-items-center gap-2">
      <img
        class="rounded-circle border border-dark"
        :src="post['author']['profile_image']"
        alt=""
        width="40"
        height="40"
      />
      <h6 class="user-name fw-bold">
        {{ post["author"]["username"] }}
      </h6>
      <button
        v-if="checkAppearance(post['author']['id'])"
        type="button"
        class="btn btn-outline-danger btn-sm btn-delete"
        @click="deletePost(post['id'])"
      >
        delete
      </button>
    </div>

    <!-- post body -->
    <div class="card-body">
      <img :src="post['image']" alt="" class="w-100" />
      <small class="text-small">{{ post["created_at"] }}</small>
      <h5 class="card-title" v-if="post['title']">{{ post["title"] }}</h5>
      <p class="card-text" v-if="post['body']">
        {{ post["body"] }}
      </p>
    </div>
    <!-- post footer -->
    <div class="card-footer text-muted">
      <div class="d-flex flex-row align-items-center">
        <button class="btn">
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
          class="btn p-0 fw-bold"
          @click="updatePostId(post['id'])"
          :id="post['id']"
        >
          ({{ post["comments_count"] }}) comments
        </button>
      </div>
      <button
        v-if="checkAppearance(post['author']['id'])"
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="editPostId(post)"
      >
        edit
      </button>
    </div>
  </div>
  <!-- edit post model -->
  <edit-post-modal
    v-if="showEdit"
    :show="showEdit"
    @close="showEdit = false"
    :post="postObj"
  />
  <ShowCommentModal
    v-if="showComment"
    @closeModal="showComment = false"
    @comment-done="upToDate"
    :id="postId"
  />
</template>
