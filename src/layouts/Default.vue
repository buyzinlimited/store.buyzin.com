<script setup>
import { ref } from "vue";
import IconGroup from "@/components/icons/IconGroup.vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconShoppingCart from "@/components/icons/IconShoppingCart.vue";
import IconStore from "@/components/icons/IconStore.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconBars from "@/components/icons/IconBars.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import IconPayouts from "@/components/icons/IconPayouts.vue";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const sidebarOpen = ref(false);
const router = useRouter();


const logout = async () => {
  await authStore.logout();
}
</script>

<template>
  <!-- HEADER -->
  <header class="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b
           flex items-center justify-between px-4">
    <div class="flex items-center gap-3">
      <button class="md:hidden" @click="sidebarOpen = !sidebarOpen">
        <IconClose v-if="sidebarOpen" class="size-5" />
        <IconBars v-else class="size-5" />
      </button>


      <RouterLink to="/" class="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" class="h-10 w-auto" />
      </RouterLink>
    </div>

    <div v-if="user" class="flex items-center gap-3">

      <img :src="user.photo_url" :alt="user.name" class="h-9 w-9 rounded-full object-cover" />

      <div class="hidden md:block leading-tight">
        <h3 class="text-sm font-semibold text-gray-900">
          {{ user.name }}
        </h3>
        <p class="text-xs text-gray-500">
          {{ user.email }}
        </p>
      </div>
    </div>

  </header>

  <!-- Sidebar -->
  <aside class="fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)]
           bg-white border-r overflow-y-auto
           transform transition-transform duration-300
           md:translate-x-0" :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'">

    <nav class="p-3 space-y-1 text-sm font-medium">
      <RouterLink to="/" @click="sidebarOpen = false" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
        <IconHome class="size-5" />
        Dashboard
      </RouterLink>

      <RouterLink to="/products" @click="sidebarOpen = false" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
        <IconStore class="size-5" />
        Products
      </RouterLink>

      <RouterLink to="/orders" @click="sidebarOpen = false" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
        <IconShoppingCart class="size-5" />
        Orders
      </RouterLink>

      <RouterLink to="/customers" @click="sidebarOpen = false" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
        <IconGroup class="size-5" />
        Customers
      </RouterLink>

      <RouterLink to="/payouts" @click="sidebarOpen = false" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
        <IconPayouts class="size-5" />
        Payouts
      </RouterLink>

      <RouterLink to="/settings" @click="sidebarOpen = false" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
        <IconSettings class="size-5" />
        Settings
      </RouterLink>

      <hr class="my-3" />

      <button @click="logout" class="w-full flex items-center gap-3 px-4 py-2 rounded-lg
               text-red-600 hover:bg-red-50">
        <IconLogout class="size-5" />
        Logout
      </button>
    </nav>
  </aside>

  <!-- MAIN -->
  <main class="pt-20 md:ml-64 min-h-screen bg-gray-100 p-4">
    <slot />
  </main>
</template>
