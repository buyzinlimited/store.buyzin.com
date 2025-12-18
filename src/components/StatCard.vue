<script setup>

const props = defineProps({
  label: String,
  value: String,
  change: String,
  changeType: {
    type: String,
    validator: (v) => ["positive", "negative"].includes(v),
  },
});
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <div class="text-sm text-gray-600 mb-2">{{ label }}</div>
    <div class="text-3xl font-semibold text-gray-900 mb-2">{{ value }}</div>
    <div class="flex items-center gap-1">
      <span class="text-sm font-medium px-2 py-0.5 rounded" :class="changeType === 'positive'
          ? 'text-green-700 bg-green-50'
          : 'text-red-700 bg-red-50'
        ">
        {{ change }}
      </span>
      <span class="text-sm text-gray-500">from last week</span>
    </div>
  </div>
</template>
