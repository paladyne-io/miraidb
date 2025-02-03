import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import adminPage from "../pages/AdminDashboardPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/aichatbot",
      name: "home",
      component: HomeView,
    },
    {
      path: '/admin',
      component:adminPage
    },
  ],
});

export default router;
