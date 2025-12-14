<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const menu = [
  { label: "Dashboard" },
  { label: "Sales" },
  { label: "Products" },
  { label: "Promotions" },
  { label: "Reports" },
  { label: "Settings" },
];
</script>

<template>
  <aside class="w-64 bg-white h-screen fixed left-0 top-0">
    <div class="border-b">
      <img src="/logo.svg" alt="logo" class="h-16 w-auto p-2" />
    </div>

    <nav class="space-y-1">
      <a
        v-for="item in menu"
        :key="item.label"
        class="text-primary flex items-center gap-3 px-4 py-2 cursor-pointer rounded"
      >
        <span>{{ item.label }}</span>
      </a>
    </nav>
  </aside>
</template>
