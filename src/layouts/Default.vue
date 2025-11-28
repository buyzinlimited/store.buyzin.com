<script setup>
import IconBars from "@/components/icons/IconBars.vue";
import Sidebar from "@/components/Sidebar.vue";

import { ref } from "vue";

const sidebarOpen = ref(false);
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/40 md:hidden z-20"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <!-- Mobile Top Bar -->
      <header class="md:hidden px-4 py-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <button
              @click="sidebarOpen = true"
              class="p-2 rounded-lg bg-white cursor-pointer"
            >
              <IconBars class="size-6" />
            </button>
            <img src="/logo.svg" alt="logo" class="h-12 w-auto object-cover" />
          </div>
          <div class="flex items-center gap-3">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              class="w-12 h-12 rounded-2xl object-cover shadow"
            />
            <div>
              <p class="text-sm font-semibold">Erica</p>
              <p class="text-xs text-gray-600">erica@example.com</p>
            </div>
          </div>
        </div>
      </header>

      <slot />
    </main>
  </div>
</template>

<style scoped></style>
