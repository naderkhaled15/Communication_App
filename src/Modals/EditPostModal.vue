<script setup lang="ts">
import { ref } from "vue";
import axios from "../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { getPosts } from "../stores/getPosts";

const postsStore = getPosts();
const upToDate = postsStore.upToDate;

const props = defineProps({
  show: {
    type: Boolean,
  },
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

let title = ref(props["post"]["title"]);
let body = ref(props["post"]["body"]);
let image = ref(props["post"]["image"]);

// uploading image
const uploadfile = (e: any) => {
  console.log(e.target);
  image.value = e.target.files[0];
};

// creating post
const editPost = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token")!);
    // 1-create form data
    const formData = new FormData();
    if (title.value) {
      formData.append("title", title.value);
    }
    if (body.value) {
      formData.append("body", body.value);
    }
    if (image.value) {
      formData.append("image", image.value);
    }
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
      (function () {
        toast.success("Post updated successfully", {
          position: "bottom-right",
          autoClose: 1000,
          closeButton: false,
          pauseOnHover: false,
        });
      })();
      // close modal
      emit("close");
      // update posts
      upToDate();
    }
  } catch (e: any) {
    let error: string = e.response.data.error_message;
    (function () {
      toast.error(error, {
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
      <input type="file" id="img" @change="uploadfile" />

      <button class="create-post" @click="editPost">Edit</button>
    </div>
  </div>
</template>
