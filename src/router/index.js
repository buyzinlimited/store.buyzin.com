import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/login.vue"),
    },

    {
      path: "/",
      name: "home",
      component: () => import("../views/index.vue"),
    },

    {
      path: "/orders",
      name: "orders",
      component: () => import("../views/orders/index.vue"),
    },
  ],
});

export default router;
