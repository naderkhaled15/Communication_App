<script setup lang="ts">
import NavHeader from "../components/NavHeader.vue";
import Post from "../components/Post.vue";
import CreatePostModal from "../Modals/CreatePostModal.vue";
import { onMounted, ref } from "vue";
import { getPosts } from "../stores/getPosts";
import "vue3-toastify/dist/index.css";

// pinia store
const postsStore = getPosts();
const getAllPosts = postsStore.getAllPosts;
const increasePage = postsStore.increasePage;
// show or hide add post modal
let showModal = ref(false);

// check on mounted
onMounted(() => {
  let token = localStorage.getItem("token");
  if (!token) {
    getAllPosts();
  } else {
    getAllPosts();
  }
});

document.addEventListener("scroll", () => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (window.scrollY >= scrollableHeight) {
    // increase page includes getPosts func recall
    increasePage();
  }
});
</script>

<template>
  <div class="container">
    <!-- nav bar -->
    <nav-header @add="showModal = true" />
    <!-- posts -->
    <post />
    <!-- post modal -->
    <create-post-modal :show="showModal" @clear="showModal = false" />
  </div>
</template>
