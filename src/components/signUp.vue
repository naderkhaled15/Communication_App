<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "../axios";
import router from "../router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let params = reactive({
  username: "",
  password: "",
  name: "",
  image: "",
});

let token = ref("");
let userInfo = ref("");

onMounted(() => {
  let user = localStorage.getItem("user-info");
  if (user) {
    router.push({ name: "home" });
  }
});

let upladeImage = (event: any) => {
  params.image = event.target.files[0];
};
let signUp = async () => {
  try {
    const formData = new FormData();
    formData.append("username", params.username);
    formData.append("password", params.password);
    formData.append("name", params.name);
    if (params.image) {
      formData.append("image", params.image);
    }
    const headers = {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
    };
    let result = await axios.post("/register", formData, {
      headers,
    });
    token = result.data.token;
    userInfo = result.data.user;
    if (result.status == 200) {
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user-info", JSON.stringify(userInfo));
    }
    params.name = params.password = params.username = "";
    router.push({ name: "home" });
    console.log("signed up successfully");
    (function () {
      toast.success("signed up successfully", {
        position: "bottom-right",
        autoClose: 1000,
        closeButton: false,
        pauseOnHover: false,
      });
    })();
  } catch (e: any) {
    let message = e.response.data.message;
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
  <div>
    <form class="register">
      <p class="title">Sign Up</p>
      <RouterLink to="/" class="extra home">X</RouterLink>

      <label for="user">enter username</label>
      <input
        type="text"
        placeholder="Enter username here"
        v-model="params.username"
        id="user"
      />

      <label for="name">enter name</label>
      <input
        type="text"
        placeholder="Enter name here"
        v-model="params.name"
        id="name"
      />

      <label for="img">profile image</label>
      <input
        type="file"
        placeholder="Enter name here"
        id="img"
        @change="upladeImage"
      />

      <label for="pass">enter password</label>
      <input
        type="password"
        placeholder="Enter password here"
        v-model="params.password"
        autocomplete="off"
        id="pass"
      />

      <button type="submit" @click.prevent="signUp" class="active">
        Sign Up
      </button>
      <RouterLink to="/log-in" class="extra">Log In</RouterLink>
    </form>
  </div>
</template>
