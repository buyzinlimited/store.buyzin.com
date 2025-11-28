<script setup>
import { ref } from "vue";

import OrdersTable from "./OrdersTable.vue";
import StatCard from "./StatCard.vue";

const selectedPeriod = ref("Last week");

const stats = [
  {
    label: "Total revenue",
    value: "$2.6M",
    change: "+4.5%",
    changeType: "positive",
  },
  {
    label: "Average order value",
    value: "$455",
    change: "-0.5%",
    changeType: "negative",
  },
  {
    label: "Tickets sold",
    value: "5,888",
    change: "+4.5%",
    changeType: "positive",
  },
  {
    label: "Pageviews",
    value: "823,067",
    change: "+21.2%",
    changeType: "positive",
  },
];

const orders = [
  {
    id: "3000",
    date: "May 9, 2024",
    customer: "Leslie Alexander",
    event: "Bear Hug: Live in Concert",
    amount: "US$80.00",
  },
  {
    id: "3001",
    date: "May 5, 2024",
    customer: "Michael Foster",
    event: "Six Fingers — DJ Set",
    amount: "US$299.00",
  },
  {
    id: "3002",
    date: "Apr 28, 2024",
    customer: "Dries Vincent",
    event: "We All Look The Same",
    amount: "US$150.00",
  },
  {
    id: "3003",
    date: "Apr 23, 2024",
    customer: "Lindsay Walton",
    event: "Bear Hug: Live in Concert",
    amount: "US$80.00",
  },
  {
    id: "3004",
    date: "Apr 18, 2024",
    customer: "Courtney Henry",
    event: "Viking People",
    amount: "US$114.99",
  },
  {
    id: "3005",
    date: "Apr 14, 2024",
    customer: "Tom Cook",
    event: "Six Fingers — DJ Set",
    amount: "US$299.00",
  },
  {
    id: "3006",
    date: "Apr 10, 2024",
    customer: "Whitney Francis",
    event: "We All Look The Same",
    amount: "US$150.00",
  },
  {
    id: "3007",
    date: "Apr 6, 2024",
    customer: "Leonard Krasner",
    event: "Bear Hug: Live in Concert",
    amount: "US$80.00",
  },
  {
    id: "3008",
    date: "Apr 3, 2024",
    customer: "Floyd Miles",
    event: "Bear Hug: Live in Concert",
    amount: "US$80.00",
  },
  {
    id: "3009",
    date: "Mar 29, 2024",
    customer: "Emily Selman",
    event: "Viking People",
    amount: "US$114.99",
  },
];
</script>

<template>
  <div class="flex-1 overflow-auto bg-white">
    <div class="max-w-7xl mx-auto p-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-semibold text-gray-900">
          Good afternoon, Erica
        </h1>
      </div>

      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-gray-900">Overview</h2>
        <select
          v-model="selectedPeriod"
          class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Last week</option>
          <option>Last month</option>
          <option>Last year</option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          v-for="stat in stats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :change="stat.change"
          :change-type="stat.changeType"
        />
      </div>

      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent orders</h2>
        <OrdersTable :orders="orders" />
      </div>
    </div>
  </div>
</template>
