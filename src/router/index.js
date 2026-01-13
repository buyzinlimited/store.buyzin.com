import { useAuthStore } from "@/stores/auth";
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
      meta: { auth: true },
    },

    {
      path: "/products",
      name: "products",
      component: () => import("../views/products/index.vue"),
      meta: { auth: true },
    },

    {
      path: "/products/create",
      name: "products.create",
      component: () => import("../views/products/create.vue"),
      meta: { auth: true },
    },

    {
      path: "/products/:id/edit",
      name: "products.edit",
      component: () => import("../views/products/update.vue"),
      meta: { auth: true },
    },

    {
      path: "/orders",
      name: "orders",
      component: () => import("../views/orders/index.vue"),
      meta: { auth: true },
    },

    {
      path: "/customers",
      name: "customers",
      component: () => import("../views/customers/index.vue"),
      meta: { auth: true },
    },

    {
      path: "/payouts",
      name: "payouts",
      component: () => import("../views/payouts/index.vue"),
      meta: { auth: true },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/settings/index.vue"),
      meta: { auth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.auth) {
    await authStore.getProfile();

    if (!authStore.user) {
      return next("/login");
    }
  }

  next();
});

export default router;
