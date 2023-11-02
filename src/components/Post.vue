<script setup lang="ts">
import { inject } from "vue";
const posts = inject("allPosts");
console.log(posts);
</script>
<template>
  <div
    class="card my-5 shadow post-card"
    v-for="post in posts"
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
        <button class="btn p-0 fw-bold">
          ({{ post["comments_count"] }}) comments
        </button>

        <!-- list of -->
        <!-- <ul
          class="tags d-flex gap-3 m-0 p-0 mx-3 list-inline"
          v-for="tag in post['tags']"
          :key="tag['name']"
          v-if="post['tags']"
        >
          <li>
            <button>{{ tag }}</button>
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>
