<!-- <script setup lang="ts">
import { getPosts } from "../stores/getPosts";
import { storeToRefs } from "pinia";

const postsStore = getPosts();
let { perPage, currentPage, rows } = storeToRefs(postsStore);

console.log(
  "per page",
  perPage.value,
  " ",
  "current page",
  currentPage.value,
  " ",
  "row",
  rows.value
);

function page(e: any) {
  let pageNumb = e.target.innerHTML;
  let number = +pageNumb;
  if (Number.isNaN(number)) {
    let vv = pageNumb;
    console.log(vv);
  } else {
    let cc = number;
    console.log(cc);
  }
}
</script>

<template>
  <b-container>
    <!-- Use text in props -->
    <b-pagination
      class="mt-3 pt-3"
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @click="page"
    >
    </b-pagination>
  </b-container>
</template>
base-url="http://tarmeezacademy.com/api/v1/posts?page=2" -->
