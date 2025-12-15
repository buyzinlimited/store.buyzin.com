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

const sidebarOpen = ref(false);
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

    <div class="flex items-center gap-3">
      <!-- AVATAR -->
      <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" alt="avatar"
        class="h-9 w-9 rounded-full object-cover" />

      <!-- USER INFO -->
      <div class="leading-tight">
        <p class="text-sm font-semibold text-gray-900">
          John Doe
        </p>
        <p class="text-xs text-gray-500">
          +880 17 1234 5678
        </p>
      </div>
    </div>

  </header>

  <!-- BACKDROP (MOBILE) -->
  <div v-if="sidebarOpen" class="fixed inset-0 bg-black/40 z-30 md:hidden" @click="sidebarOpen = false" />

  <!-- SIDEBAR -->
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

      <RouterLink to="/settings" @click="sidebarOpen = false" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
        <IconSettings class="size-5" />
        Settings
      </RouterLink>

      <hr class="my-3" />

      <button class="w-full flex items-center gap-3 px-4 py-2 rounded-lg
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
