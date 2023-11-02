import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LogIn from "../components/LogIn.vue";
import signUp from "../components/signUp.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/log-in",
      name: "log-in",
      component: LogIn,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: signUp,
    },
  ],
});

export default router;
