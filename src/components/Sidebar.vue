<script setup>
import IconChevronsUpDown from "./icons/IconChevronsUpDown.vue";
import IconClose from "./icons/IconClose.vue";
import IconGroup from "./icons/IconGroup.vue";
import IconHome from "./icons/IconHome.vue";
import IconOrders from "./icons/IconOrders.vue";
import IconPower from "./icons/IconPower.vue";
import IconSettings from "./icons/IconSettings.vue";
import IconStore from "./icons/IconStore.vue";

import { defineProps, defineEmits } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <aside
    class="fixed md:static inset-y-0 left-0 z-30 w-64 bg-white h-full p-4 transform md:transform-none transition-transform duration-300"
    :class="props.open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
  >
    <div class="flex items-center justify-between mb-6">
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
      <IconChevronsUpDown class="size-5 text-gray-600" />
      <button
        type="button"
        class="md:hidden p-2 rounded bg-gray-200"
        @click="emit('close')"
      >
        <IconClose class="size-5" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="space-y-2">
      <a
        href="#"
        class="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 font-medium"
      >
        <IconHome class="size-5" />
        <span>Dashboard</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200"
      >
        <IconStore class="size-5" />
        <span>Products</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200"
      >
        <IconOrders class="size-5" />
        <span>Orders</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200"
      >
        <IconGroup class="size-5" />
        <span>Customers</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200"
      >
        <IconSettings class="size-5" />
        <span>Settings</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200"
      >
        <IconPower class="size-5" />
        <span>Logout</span>
      </a>
    </nav>
  </aside>
</template>
