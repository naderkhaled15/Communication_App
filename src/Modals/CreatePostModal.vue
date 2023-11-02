<script setup lang="ts">
import { ref } from "vue";
import axios from "../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
defineProps({
  show: Boolean,
});

const emit = defineEmits(["clear", "update"]);

let title = ref("");
let body = ref("");
let image = ref("");

// uploading image
const uploadfile = (event: any) => {
  image.value = event.target.files[0];
};

// creating post
const createPost = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token") || "{}");

    // 1-create form data
    const formData = new FormData();
    if (title.value) {
      formData.append("title", title.value);
    }
    formData.append("body", body.value);
    if (image.value) {
      formData.append("image", image.value);
    }
    // 2-creating header
    const headers = {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
      Authorization: `Bearer ${token}`,
    };
    // 3-make request
    let result = await axios.post("/posts", formData, { headers });
    if (result.status == 201) {
      // close modal
      emit("clear");
      // update posts
      emit("update");
      //reset values
      title.value = body.value = image.value = "";
      // show notifications
      (function () {
        toast.success("Post created successfully", {
          position: "bottom-right",
          autoClose: 1000,
          closeButton: false,
          pauseOnHover: false,
        });
      })();
    }
  } catch (e: any) {
    const message = e.response.data.message;
    (function () {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 1000,
        closeButton: false,
        pauseOnHover: false,
      });
    })();
  }
};
</script>
<template>
  <div class="modal-mask" v-if="show">
    <div class="model-container">
      <div class="modal-header">
        <h6 class="modal-header">new post</h6>
        <button
          class="btn btn-outline-danger my-sm-0 close-modal"
          @click="$emit('clear')"
        >
          &#9587;
        </button>
      </div>
      <hr />

      <label for="post-title">Title</label>
      <input type="text" v-model="title" id="post-title" />

      <label for="post-body">body</label>
      <textarea type="text" v-model="body" id="post-body"></textarea>

      <label for="img">image</label>
      <input type="file" id="img" @change="uploadfile" />

      <button class="create-post" @click="createPost">create</button>
    </div>
  </div>
</template>
