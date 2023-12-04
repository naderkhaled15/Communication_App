<script setup lang="ts">
import { onMounted, ref } from "vue";
import { showToast } from "@/types/ToastFunc";
import { useRouter } from "vue-router";

let userCard = ref(JSON.parse(localStorage.getItem("user-info") || "{}"));
const router=useRouter()
let show = ref(userCard.value ? true : false),
  showBtn = ref(userCard.value ? true : false);

const emit=defineEmits(['add'])


onMounted(() => {
  let token = localStorage.getItem("token");
  if (router.currentRoute.value.name == "profile") {
    showBtn.value = false;
  } else if (router.currentRoute.value.name == "home") {
    showBtn.value = true;
  }
  if (!token) {
    show.value = false;
    showBtn.value = false;
  }
});

window.addEventListener("storage", function () {
  
  if (
    !this.localStorage.getItem("token") ||
    !this.localStorage.getItem("user-info")
  ) {
    this.localStorage.clear()
    show.value = false;
    showBtn.value = false;
  }
});

let logOut = () => {
  router.push({ name: "home" });
  localStorage.clear();
  show.value = false;
  showBtn.value = false;

  // toast func
  showToast('error',"logged out")
};

const addEmit=()=>{
  emit('add')
}
</script>
<template>
  <div class="nav-box">      
    <!-- class="navbar navbar-expand-lg navbar-light bg-light px-2 py-2 rounded" -->
  <b-navbar toggleable="md" type="dark" variant="faded" class="navbar navbar navbar-expand-lg
px-2 py-2 rounded">
    <RouterLink class="navbar-brand fw-bold" to="/"> comu<span>app</span></RouterLink>
    
    <b-navbar-toggle target="nav-collapse" class="rounded-circle border border-dark p-0"
>
      <form v-if="show">
              <img
              v-if="show"
              loading="lazy"
              class=" rounded-circle user-img"
              :src="userCard['profile_image']"
              width="40"
              height="40"
              alt="user img"
                
              />
          </form>
    </b-navbar-toggle>
    <!-- for collapsing -->
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto container">
       

        <ul class="navbar-nav mr-auto" >
              <li class="nav-item active">
                <RouterLink class="nav-link" active-class="active" to="/"> home </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink v-if="show" active-class="active" class="nav-link" :to="'/profile/'+userCard.id"> profile </RouterLink>
              </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" v-if="show">
            <span role="button" @click="router.push(`/profile/${userCard.id}`)">
              <img
              loading="lazy"
              :src="userCard['profile_image']"
              class="rounded-circle border border-dark"
              width="30"
              height="30"
              alt="user img"
                
              />
              <!-- username -->
              <h6 class="user-name fw-bold d-inline mx-3">{{ userCard["username"] }}</h6>
            </span>

            <!-- logout button -->
            <button
              class="btn btn-outline-danger my-2 my-sm-0 logout"
              @click.prevent="logOut"
            >
              log out
            </button>
          </form>
        <form class="form-inline my-2 my-lg-0 " v-if="!show">
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
    
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>     
</div> 
    <!-- end nav bar -->
    <!--start add post button -->
    <button class="add-post-button" v-if="showBtn" @click="addEmit()" >
        &#x2b;
    </button>
    <!--end add post button -->
</template>
