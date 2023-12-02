<script setup lang="ts">
import { ref } from "vue";
import axios from "../axios";
import { showToast } from "@/types/ToastFunc";


let comment = ref<String>("");
const props = defineProps({ postId: Number });
const emit = defineEmits(["success"]);

const addComment = async () => {
  let token = JSON.parse(localStorage.getItem("token") || "{}");

  try {
    if (comment.value) {
      // send data
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      let result = await axios.post(
        "/posts/" + props.postId + "/comments",
        { body: comment.value },
        {
          headers,
        }
      );
      if (result.status == 201) {
        // toast message
        showToast('success',"comment added")
        comment.value = "";
        emit("success");
      }
    } else {
      // toast message
      showToast('warning',"write a comment")
    }
  } catch (e: any) {
    console.log(e.message);
  }
};
</script>
<template>
  <form action="" class="form-box">
    <input type="text" v-model="comment" />
    <button type="button" class="btn btn-outline-success" @click="addComment">
      send
    </button>
  </form>
</template>
