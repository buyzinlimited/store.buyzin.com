<script setup>
import IconStar from "@/components/icons/IconStar.vue";
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
    <div class="bg-white rounded-2xl space-y-4 p-4">

      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
        <h2 class="text-xl font-semibold">Overview</h2>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="text-sm text-gray-600 mb-2">Total Sales</div>
          <div class="text-3xl font-semibold text-gray-900 mb-2">34,945</div>

        </div>
      </div>

      <!-- Orders -->
      <h2 class="text-xl font-semibold mb-4">Recent Orders</h2>
      <OrdersTable :orders="orders" />


      <div class="rounded-xl border bg-white p-5 ">
        <!-- Header -->
        <div class="mb-4 flex items-center justify-between">
          <h5 class="text-base font-semibold text-gray-900">Recent Reviews</h5>
        </div>

        <!-- Comments List -->
        <ul class="space-y-4 max-h-svh overflow-y-auto">
          <!-- Item -->
          <li class="flex gap-3">
            <img
              src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
              class="h-10 w-10 rounded-full object-cover" alt="" />

            <div class="flex-1">
              <a href="#" class="text-sm font-medium text-gray-900">
                Kathryn Murphy
              </a>

              <!-- Rating -->
              <div class="mt-1 flex gap-1">
                <IconStar class="size-4 text-yellow-400" v-for="value in 5" />
              </div>

              <p class="mt-1 text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec dolor vel est interdum
              </p>
            </div>
          </li>

          <!-- Copy same li for other comments -->
        </ul>
      </div>

    </div>
  </Default>
</template>

<style scoped></style>
