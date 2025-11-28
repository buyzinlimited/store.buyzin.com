<script setup>
import { defineProps } from "vue";

const props = defineProps({
  orders: {
    type: Array,
    required: true,
  },
});

const getEventImage = (event) => {
  const images = {
    "Bear Hug: Live in Concert":
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
    "Six Fingers — DJ Set":
      "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
    "We All Look The Same":
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
    "Viking People":
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
  };

  return images[event] || images["Bear Hug: Live in Concert"];
};
</script>

<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Order number
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Purchase date
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Customer
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Event
          </th>
          <th
            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ order.id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
            {{ order.date }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ order.customer }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center gap-3">
              <img
                :src="getEventImage(order.event)"
                :alt="order.event"
                class="w-6 h-6 rounded-full object-cover"
              />
              <span class="text-sm text-gray-900">{{ order.event }}</span>
            </div>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
          >
            {{ order.amount }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
