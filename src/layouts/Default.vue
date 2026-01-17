<script setup>
import { ref } from "vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconBars from "@/components/icons/IconBars.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import Sidebar from "./Sidebar.vue";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

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
  <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

  <!-- MAIN -->
  <main class="pt-20 md:ml-64 min-h-screen bg-gray-100 p-4">
    <slot />
  </main>
</template>
