<script setup lang="ts">
import NavHeader from "../components/NavHeader.vue";
import Post from "../components/Post.vue";
import CreatePostModal from "../Modals/CreatePostModal.vue";
import { onMounted, provide, ref } from "vue";
import { usePosts } from "../stores/getPosts";
import "vue3-toastify/dist/index.css";

const getPosts = usePosts();
let showModal = ref(false);
let currentPage = 1;

let updatePage = () => {
  window.location.reload();
};

onMounted(() => {
  let token = localStorage.getItem("token");
  if (!token) {
    getPosts.getAllPosts();
  } else {
    getPosts.getAllPosts();
    // getPosts.getAllPosts();
  }
});

//try scrolling
window.addEventListener("scroll", function () {
  const endOfPage =
    this.window.innerHeight + this.window.scrollY >=
    this.document.body.offsetHeight;

  if (endOfPage) {
    console.log("this is the end of page");
    currentPage += 1;
    getPosts.getAllPosts(currentPage);
  }
});

provide("allPosts", getPosts.allPosts);
</script>

<template>
  <div class="container">
    <!-- nav bar -->
    <nav-header @add="showModal = true" />
    <!-- posts -->
    <post />
    <!-- post modal -->
    <create-post-modal
      :show="showModal"
      @clear="showModal = false"
      @update="updatePage"
    />
  </div>
</template>
