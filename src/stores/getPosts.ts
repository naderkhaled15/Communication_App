import { defineStore } from "pinia";
import axios from "../axios";
export const getPosts = defineStore("posts", {
  state: () => ({
    allPosts: [],
    perPage: 5,
    currentPage: 1,
  }),
  actions: {
    async getAllPosts() {
      try {
        let result = await axios.get(
          "/posts?limit=" + this.perPage + "&page=" + this.currentPage
        );
        let posts: never[] = result.data.data;
        this.allPosts.push(...posts);
        return this.allPosts;
      } catch (e: any) {
        console.error(e.message);
      }
    },
    increasePage() {
      this.currentPage++;
      this.getAllPosts();
    },
    upToDate() {
      this.allPosts = [];
      this.getAllPosts();
    },
  },
  getters: {},
});
