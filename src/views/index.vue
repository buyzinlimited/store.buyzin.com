<script setup>
import OrdersTable from "@/components/OrdersTable.vue";
import StatCard from "@/components/StatCard.vue";
import Default from "@/layouts/Default.vue";

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
];
</script>

<template>
  <Default>
    <div class="bg-white rounded-2xl border border-gray-300 m-4 p-6">
      <h1 class="text-4xl font-bold mb-8">Good afternoon, Erica</h1>

      <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6"
      >
        <h2 class="text-xl font-semibold">Overview</h2>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          v-for="stat in stats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :change="stat.change"
          :change-type="stat.changeType"
        />
      </div>

      <!-- Orders -->
      <h2 class="text-xl font-semibold mb-4">Recent Orders</h2>
      <OrdersTable :orders="orders" />
    </div>
  </Default>
</template>

<style scoped></style>
