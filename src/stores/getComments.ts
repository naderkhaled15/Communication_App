import { defineStore } from "pinia";
import axios from "../axios";
export const getComments = defineStore("comments", {
  state: () => ({
    mainPostId: 0,
    allComments: [],
    postInfo: [],
  }),
  actions: {
    async getAllComments() {
      this.allComments = [];
      this.postInfo = [];
      try {
        let result = await axios.get("/posts/" + this.mainPostId);
        let userData: never[] = result.data.data;
        this.postInfo.push(userData);
        let comments: never[] = result.data.data.comments;
        this.allComments.push(...comments);
      } catch (e: any) {
        console.error(e.message);
      }
    },
  },
  getters: {},
});
