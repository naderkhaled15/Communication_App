<script setup lang="ts">
import NavHeader from "../components/NavHeader.vue";
import Post from "../components/Post.vue";
import { defineAsyncComponent, ref } from "vue";
import { getPosts } from "../stores/getPosts";
import "vue3-toastify/dist/index.css";

// pinia store
const CreatePostModal=defineAsyncComponent(()=>import("../Modals/CreatePostModal.vue"))
const postsStore = getPosts();
const increasePage = postsStore.increasePage;
// show or hide add post modal
let showModal = ref(false);

document.addEventListener("scroll", () => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (window.scrollY >= scrollableHeight) {
    increasePage();
  }
});
</script>
<!-- ki -->
<template>
  <div class="display-container">
    <!-- nav bar -->
    <nav-header  @add="showModal = true"/>
    <!-- posts -->
    <post />
    <!-- post modal -->
    <create-post-modal :show="showModal" @close="showModal = false" />
  </div>
</template>
