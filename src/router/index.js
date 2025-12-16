import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/login.vue"),
    },

    {
      path: "/forgot",
      name: "forgot",
      component: () => import("../views/auth/forgot.vue"),
    },

    {
      path: "/",
      name: "home",
      component: () => import("../views/index.vue"),
    },

    {
      path: "/products",
      name: "products",
      component: () => import("../views/products/index.vue"),
    },

    {
      path: "/products/create",
      name: "products.create",
      component: () => import("../views/products/create.vue"),
    },

    {
      path: "/orders",
      name: "orders",
      component: () => import("../views/orders/index.vue"),
    },

    {
      path: "/customers",
      name: "customers",
      component: () => import("../views/customers/index.vue"),
    },

    {
      path: "/payouts",
      name: "payouts",
      component: () => import("../views/payouts/index.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/settings/index.vue"),
    },
  ],
});

export default router;
