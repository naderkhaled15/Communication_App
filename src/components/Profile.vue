<script setup lang="ts">
import NavHeader from "./NavHeader.vue";
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import {  useRoute } from "vue-router";
import axios from "../axios";
import { getPosts } from "../stores/getPosts";
import { storeToRefs } from "pinia";
import { getComments } from "../stores/getComments";
import { showToast } from "@/types/ToastFunc";



const ShowCommentModal=defineAsyncComponent(()=>import("../Modals/ShowCommentModal.vue"))
const EditPostModal =defineAsyncComponent(()=>import("../Modals/EditPostModal.vue"))
const route=useRoute()
const commentStore = getComments();
const postStore = getPosts();
const { mainPostId } = storeToRefs(commentStore);
const getUserPosts = postStore.getUserPosts;
const getAuhtorCard = postStore.getAuhtorCard;
const updateUserPosts = postStore.updateUserPosts;
const { userPosts, authorInfo, userId } = storeToRefs(postStore);

const {id}= route.params;
let userinfo = ref([]);
let postId = ref();
let showComment = ref(false);
let showEdit = ref(false);
const postObj = ref();
let currentUser = JSON.parse(localStorage.getItem("user-info")!);

onBeforeMount(()=>{
  userId.value=+id
  getAuhtorCard(Number(userId));
  getUserPosts(Number(userId));
  userinfo.value = authorInfo.value;
})

window.addEventListener("storage", function () {
  if (
    !this.localStorage.getItem("token") ||
    !this.localStorage.getItem("user-info")
  ) {
    this.localStorage.clear();
    showToast('error',"please login again")
  }
});

// comment post id
const updatePostId = (postid: number) => {
  mainPostId.value = postid;
  postId.value = postid;
  showComment.value = true;
};

const checkAuthentication=()=>{
  let appear= Number(id)===currentUser?.id ?true:false
  return appear
}

// edited post id
const editPostId = (postObject: object) => {
  showEdit.value = true;
  postObj.value = postObject;
};

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
      updateUserPosts();
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

const useAvatar = (userName:string) => {
  return `https://ui-avatars.com/api/?background=random&bold=true&name=${userName}`
}

</script>
<template>
  <div class="display-container">
    <NavHeader/>
    <!-- user card info -->
    <div class="profile-box my-3 shadow-sm user-info">
      <div class="row" v-for="userCard in userinfo ">
        <div class="col-lg-2 col-md-4  col-sm-12 "> 
          <img
          v-if="userCard['profile_image']['length'] > 0"
          loading="lazy"
          class="rounded-circle"
          alt="user photo"
          :src="userCard['profile_image']"
          width="120"
          height="120" 
          />
          <img
          v-else
          loading="lazy"
          class="rounded-circle"
          alt="user photo"
          :src="useAvatar(userCard['name'])"
          width="120"
          height="120" 
          />
        </div>
        <div class="col-lg-5 col-md-4  col-sm-6 user-name">
          <p v-if="userCard['email']"><span class="text-secondary fw-bold">Email:</span> {{ userCard["email"] }}</p>
          <p><span class="text-secondary ">usernaem :</span> {{ userCard["username"] }}</p>
          <p><span class="text-secondary ">name :</span> {{ userCard["name"] }}</p>
        </div>
        <div class="col-lg-5 col-md-4  col-sm-6 user-count">
          <p>
            <span>{{ userCard["posts_count"] }}</span> posts
          </p>
          <p>
            <span> {{ userCard["comments_count"] }} </span> comments
          </p>
        </div>
        <p class="fw-bold fs-5 my-3">{{ userCard["name"] }}'s posts</p>
      </div>
    </div>
    <!-- user posts -->
    <div
      class="card my-5 shadow post-card"
      v-for="post in userPosts"
      :key="post['id']"
    >
      <!-- post header -->
      <div class="card-header d-flex align-items-center gap-2">
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
          v-if="checkAuthentication()"
          type="button"
          class="btn btn-outline-danger btn-sm btn-delete"
          @click="deletePost(post['id'])"
        >
          delete
        </button>
      </div>
      <!-- post body -->
      <div class="card-body">

   
        <img loading="lazy" :src="post['image']" alt=""  class="post-img w-100"/>

        <small class="text-small">{{ post["created_at"] }}</small>
        <h5 class="card-title" v-if="post['title']">{{ post["title"] }}</h5>
        <p class="card-text" v-if="post['body']">
          {{ post["body"] }}
        </p>
      </div>
      <!-- post footer -->
      <div class="card-footer text-muted">
        <div class="footer-container">
          <div class="footer-list">
            <button
              v-if="checkAuthentication()"
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
              @click="updatePostId(post['id'])">
              ({{ post["comments_count"] }}) comments
            </button>
          </div>

          <!-- show comment modal -->
        </div>
      </div>
    </div>
    <!-- edit post model -->
    <EditPostModal
      v-if="showEdit"
      :show="showEdit"
      @close="showEdit = false"
      :post="postObj"
      @updated="updateUserPosts"
    />
    <ShowCommentModal
      v-if="showComment"
      @closeModal="showComment = false"
      :id="postId"
      @comment-done="updateUserPosts"
    />
  </div>
</template>
