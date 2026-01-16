<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app';
import Default from '@/layouts/Default.vue';
import OrdersTable from '@/components/OrdersTable.vue';
import NotFound from '@/components/NotFound.vue';

const appStore = useAppStore();
const { dashboard, orders } = storeToRefs(appStore);

const loadDashboard = async () => {
  await appStore.getDashboard();
};

onMounted(() => {
  loadDashboard();
});
</script>


<template>
  <Default>
    <div class="bg-white rounded-2xl space-y-4 p-4">

      <template v-if="appStore.loading">
        <Loading />
      </template>
      <template v-if="dashboard">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
          <h2 class="text-xl font-semibold">Overview</h2>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="text-sm text-gray-600 mb-2">
              Today Orders
            </div>
            <div class="text-3xl font-semibold text-gray-900 mb-2">
              {{ dashboard.stats?.orders_today }}
            </div>
          </div>
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="text-sm text-gray-600 mb-2">
              Pending Orders
            </div>
            <div class="text-3xl font-semibold text-gray-900 mb-2">
              {{ dashboard.stats?.orders_pending }}
            </div>
          </div>
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="text-sm text-gray-600 mb-2">
              Completed Orders
            </div>
            <div class="text-3xl font-semibold text-gray-900 mb-2">
              {{ dashboard.stats?.orders_completed }}
            </div>
          </div>
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="text-sm text-gray-600 mb-2">
              Total Revenue
            </div>
            <div class="text-3xl font-semibold text-gray-900 mb-2">
              {{ dashboard.stats?.total_revenue }}
            </div>
          </div>
        </div>

        <!-- Orders -->
        <h2 class="text-xl font-semibold mb-4">Recent Orders</h2>
        <OrdersTable :orders="dashboard.orders" />


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

      </template>
      <template v-else>
        <NotFound />
      </template>
    </div>
  </Default>
</template>

<style scoped></style>
