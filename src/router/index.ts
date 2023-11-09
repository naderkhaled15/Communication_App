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
      // component: HomeView,
      component: () => import("../views/HomeView.vue"),
      meta: {
        title: "Home",
      },
    },
    {
      path: "/log-in",
      name: "log-in",
      // component: LogIn,
      component: () => import("../components/LogIn.vue"),
      meta: {
        title: "Log In",
      },
    },
    {
      path: "/sign-up",
      name: "sign-up",
      // component: signUp,
      component: () => import("../components/signUp.vue"),
      meta: {
        title: "Sign Up",
      },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  document: Document;

  document.title = to.meta.title;
  next();
});

export default router;
