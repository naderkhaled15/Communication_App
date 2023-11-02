// import axios from "axios";
import { defineStore } from "pinia";
import axios from "../axios";
export let usePosts = defineStore("posts", {
  state() {
    return {
      allPosts: [],
    };
  },
  actions: {
    async getAllPosts(page = 1) {
      try {
        let result = await axios.get(`/posts?limit=6&page=${page}`);
        let posts: never[] = result.data.data;
        this.allPosts.push(...posts);
        return this.allPosts;
      } catch (e: any) {
        console.error(e.message);
      }
    },
  },
  getters: {},
});
