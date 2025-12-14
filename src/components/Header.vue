<template>
  <header
    class="fixed top-0 left-0 lg:left-64 right-0 bg-white z-20 flex items-center px-4 py-2.5 lg:px-6"
  >
    <button class="lg:hidden mr-3 text-xl" @click="$emit('toggleSidebar')">
      ☰
    </button>

    <input
      type="text"
      placeholder="Search"
      class="px-4 py-2 border rounded-lg w-full max-w-sm"
    />

    <div class="ml-auto flex items-center gap-4">
      <span>🔔</span>
      <img src="https://i.pravatar.cc/40" class="rounded-full w-9 h-9" />
    </div>
  </header>
</template>

<script setup></script>
