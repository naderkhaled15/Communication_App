import { defineStore } from "pinia";
import axios from "../axios";
export const getPosts = defineStore("posts", {
  state: () => ({
    allPosts: [],
    perPage: 5 as number,
    currentPage: 1 as number,
    // current user posts
    userPosts: [],
    authorInfo: [],
    userId: 0 as number,
  }),
  actions: {
    async getAllPosts() {
      try {
        let result = await axios.get(
          `/posts?limit=${this.perPage}&page=${this.currentPage}`
        );
        let posts: never[] = result.data.data;
        this.allPosts.push(...posts);
        return this.allPosts
      } catch (e: any) {
        console.error(e.message);
      }
    },

    upToDate():void{
      this.allPosts = [];
      this.getAllPosts();
    },
    async getUserPosts(id: number) {
      this.userPosts = [];
      id = this.userId;
      try {
        let result = await axios.get(`/users/${id}/posts`);
        let posts: [] = result.data.data;
        this.userPosts.push(...posts);
        return this.userPosts.reverse();
      } catch (e: any) {
        console.log(e.message);
      }
    },
    async getAuhtorCard(id: number) {
      this.authorInfo = [];
      try {
        id = this.userId;
        let result = await axios.get(`/users/${id}`);        
        let info:[] = result.data.data;
        this.authorInfo.push(info);
        return this.authorInfo;
      } catch (e: any) {
        console.log(e.message);
      }
    },
    increasePage() {
      this.currentPage++;
      this.getAllPosts();
    },
    updateUserPosts() {
      this.userPosts = [];
      this.getUserPosts(this.userId);
    },
  },
  getters: {},
});
