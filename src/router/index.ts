import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
// import LogIn from "../components/LogIn.vue";
// import signUp from "../components/signUp.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        title: "Home",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../components/Profile.vue"),
      meta: {
        title: "profile",
      },
    },
    {
      path: "/log-in",
      name: "log-in",
      component: () => import("../components/LogIn.vue"),
      meta: {
        title: "Log In and remember me",
      },
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("../components/signUp.vue"),
      meta: {
        title: "Sign Up",
      },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
