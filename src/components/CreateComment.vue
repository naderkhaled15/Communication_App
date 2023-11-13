<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue3-toastify";
import axios from "../axios";

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
        (function () {
          toast.success("comment added", {
            position: "bottom-right",
            autoClose: 1000,
            closeButton: false,
            pauseOnHover: false,
          });
        })();
        comment.value = "";
        emit("success");
      }
    } else {
      // toast message
      (function () {
        toast.warning("write a comment", {
          position: "bottom-right",
          autoClose: 1000,
          closeButton: false,
          pauseOnHover: false,
        });
      })();
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
