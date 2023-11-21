<script setup lang="ts">
import { ref } from "vue";
import axios from "../axios";
import "vue3-toastify/dist/index.css";
import { showToast } from "@/types/ToastFunc";

const props = defineProps({
  show: {
    type: Boolean,
  },
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "updated"]);

let title = ref(props["post"]["title"]);
let body = ref(props["post"]["body"]);
let img = ref(props["post"]["image"]);

// uploading image
const uploadfile = (e: any) => {
  img.value = e.target.files[0];
};

// creating post
const editPost = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token")!);
    // 1-create form data
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("body", body.value);
    formData.append("image", img.value);

    formData.append("_method", "put");

    // 2-creating header
    const headers = {
      "Content-Type": "multipart/form-data; ",
      Authorization: `Bearer ${token}`,
    };
    // 3-make request
    let result = await axios.post("/posts/" + props["post"]["id"], formData, {
      headers,
    });

    // check result status
    if (result.status == 200) {   
      showToast('success',"Post updated successfully")
      // close modal
      emit("close");
      // update posts
      emit("updated");
    }
  } catch (e: any) {
    let message = e.response.data.errors.image;
    showToast('error',message)
  }
};
</script>
<template>
  <div class="modal-mask" v-if="props.show">
    <div class="modal-container">
      <div class="modal-header">
        <h6 class="modal-header">edit post</h6>
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
      <input type="file" id="img" v-on:change="uploadfile" />

      <button class="create-post" @click="editPost">Edit</button>
    </div>
  </div>
</template>
