<script setup lang="ts">
import { inject, ref } from "vue";
import axios from "../axios";
import "vue3-toastify/dist/index.css";
import { showToast } from "@/types/ToastFunc";

defineProps({
  show: Boolean,
});

const emit = defineEmits(["close"]);
const emitter: any = inject("emitter");
const fireEmit = () => {
  emitter.emit("created");
};

let title = ref("");
let body = ref("");
let image = ref("");

// uploading image
const uploadfile = (event: any) => {
  image.value = event.target.files[0];
};

// creating post
const createPost = async () => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  try {
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
      "Content-Type": "multipart/form-data;",
      Authorization: `Bearer ${token}`,
    };
    // 3-make request
    let result = await axios.post("/posts", formData, { headers });
    // check result status
    if (result.status == 201) {
      // close modal
      emit("close");
      // update posts
      fireEmit();
      //reset values
      title.value = body.value = image.value = "";
      // show notifications
      showToast('success',"Post created successfully")
      
    }
  } catch (e: any) {
    const message = e.response.data.message;
    showToast('error',message)
  }
};
</script>
<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-container">
      <div class="modal-header">
        <h6 class="modal-header">new post</h6>
        <button
          class="btn btn-outline-danger my-sm-0 close-modal"
          @click="$emit('close')"
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
