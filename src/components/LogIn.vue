<script setup lang="ts">
import axios from "../axios";
import { onMounted, reactive, ref } from "vue";
import router from "../router";
import "vue3-toastify/dist/index.css";
import { getPosts } from "../stores/getPosts";
import { showToast } from "@/types/ToastFunc";

const postsStore = getPosts();

const upToDate = postsStore.upToDate;

let params = reactive({
  username: "",
  password: "",
});

let token = ref("");
let userInfo = ref("");

onMounted(() => {
  let user = localStorage.getItem("user-info");
  if (user) {
    router.push({ name: "home" });
  }
});

let login = async () => {
  try {
    let result = await axios.post("/login", {
      username: params.username,
      password: params.password,
    });
    token = result.data.token;
    userInfo = result.data.user;
    if (result.status == 200) {
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user-info", JSON.stringify(userInfo));
    }
    params.username = params.password = "";
    router.push({ name: "home" });
    upToDate();
    showToast('success',"logged in suuccessfully")
  } catch (e: any) {
    let message = e.response.data.message;
    showToast('error',message)
  }
};
</script>
<template>
  <div>
    <form class="log-in">
      <p class="title">Log In</p>
      <RouterLink to="/" class="extra home">X</RouterLink>

      <label for="em">enter username</label>
      <input
        autofocus
        type="text"
        placeholder="Enter email here"
        v-model="params.username"
        id="em"
      />

      <label for="pass">enter password</label>
      <input
        type="password"
        placeholder="Enter password here"
        v-model="params.password"
        autocomplete="off"
        id="pass"
      />

      <button type="submit" @click.prevent="login" class="btn-login">
        Log In
      </button>
      <RouterLink to="/sign-up" class="btn-signup">Sign Up</RouterLink>
    </form>
  </div>
</template>
