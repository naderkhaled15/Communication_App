<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "../router";
import { toast } from "vue3-toastify";

let userCard = ref(JSON.parse(localStorage.getItem("user-info") || "{}"));

let show = ref(userCard);

onMounted(() => {
  let token = localStorage.getItem("token");
  if (token) {
  } else {
    show.value = false;
  }
});

window.addEventListener("storage", function () {
  show.value = false;
});

let logOut = () => {
  localStorage.clear();
  router.push({ name: "home" });
  show.value = false;
  // toast func
  (function () {
    toast.error("Logged Out", {
      position: "bottom-right",
      autoClose: 1000,
      closeButton: false,
      pauseOnHover: false,
    });
  })();
};
</script>
<template>
  <div class="container">
    <!-- start nav bar -->
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light px-2 py-2 rounded"
    >
      <div class="container">
        <RouterLink class="navbar-brand fw-bold" to="/"> comuapp </RouterLink>
        <!-- <a class="navbar-brand fw-bold" href="#">comuapp</a> -->
        <!-- menu button at sm screens -->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">profile</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0" v-if="!show">
            <!-- login button -->
            <RouterLink
              class="btn btn-outline-success my-2 my-sm-0"
              to="/log-in"
            >
              log in
            </RouterLink>
            <!-- login button -->
            <RouterLink
              class="btn btn-outline-success my-2 my-sm-0"
              to="/sign-up"
            >
              register
            </RouterLink>
          </form>
          <form class="form-inline my-2 my-lg-0" v-if="show">
            <!-- user name and image -->
            <!-- <h6 class="user-name fw-bold">
            {{ userCard["_rawValue"]["name"] }}
          </h6>  -->
            <img
              :src="userCard['profile_image']"
              class="rounded-circle border border-dark"
              width="30"
              height="30"
              alt=""
            />
            <!-- username -->

            <h6 class="fw-bold d-inline mx-3">{{ userCard["username"] }}</h6>

            <!-- logout button -->
            <button
              class="btn btn-outline-danger my-2 my-sm-0 logout"
              @click.prevent="logOut"
            >
              log out
            </button>
          </form>
        </div>
      </div>
    </nav>
    <!-- end nav bar -->
    <!--start add post button -->
    <button class="add-post-button" v-if="show" @click="$emit('add')">
      &#x2b;
    </button>
    <!--end add post button -->
  </div>
</template>
