<script setup>
import IconClose from "@/components/icons/IconClose.vue";
import { ref } from "vue";

const sidebarOpen = ref(false);
</script>

<template>
  <div class="min-h-screen flex bg-gray-200">
    <!-- SIDEBAR -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-all duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0',
      ]"
    >
      <div class="flex items-center justify-between px-4 py-2">
        <div class="block">
          <img src="/logo.svg" alt="logo" class="h-12 object-contain" />
        </div>
        <button
          @click="sidebarOpen = false"
          class="text-danger md:hidden block"
        >
          <IconClose class="size-6" />
        </button>
      </div>

      <nav class="p-2 space-y-2">
        <a href="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100"
          >Dashboard</a
        >
        <a href="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100"
          >Users</a
        >
        <a href="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100"
          >Settings</a
        >
        <button
          type="button"
          class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          Logout
        </button>
      </nav>
    </aside>

    <!-- MAIN WRAPPER -->
    <div class="flex-1 md:ml-64 min-h-screen">
      <!-- HEADER -->
      <header class="sticky top-0 bg-white px-4 py-4 z-30">
        <div class="flex items-center justify-between">
          <!-- Sidebar Button (mobile) -->
          <button
            class="md:hidden text-2xl"
            @click="sidebarOpen = !sidebarOpen"
          >
            ☰
          </button>

          <h1 class="font-semibold text-xl">Dashboard</h1>
        </div>
      </header>

      <!-- MAIN CONTENT -->
      <div class="p-6">
        <slot />
      </div>
    </div>
  </div>
</template>
