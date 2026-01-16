<script setup>
import Loading from "@/components/Loading.vue";
import NotFound from "@/components/NotFound.vue";
import Default from "@/layouts/Default.vue";
import { useOrderStore } from "@/stores/order";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

const loadOrders = async () => {
  await orderStore.all();
}

const confirmOrder = async (id) => {
  if (confirm('Are you sure you went to approved this order?')) {
    await orderStore.approved(id);
  }
}

onMounted(() => {
  loadOrders();
});
</script>

<template>
  <Default>
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Orders</h3>
        <RouterLink to="/" class="card__link">Add Order</RouterLink>
      </div>

      <template v-if="orderStore.loading">
        <Loading />
      </template>
      <template v-else-if="orders.data">
        <div class="card__body">

          <table>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Delivery</th>
                <th>Items</th>
                <th>Status</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="order in orders.data">
                <td>#{{ order.order_number }}</td>
                <td>{{ $date(order.created_at) }}</td>
                <td>
                  <h4 class="font-semibold">{{ order.user?.name }}</h4>
                  <span class="text-xs">{{ order.user?.phone }}</span>
                </td>
                <td>
                  <span class="badge" :class="{
                    'bg-yellow-100 text-yellow-800': order.payment_status === 'pending',
                    'bg-green-100 text-green-800': order.payment_status === 'completed',
                    'bg-blue-100 text-blue-800': order.payment_status === 'failed',
                    'bg-indigo-100 text-indigo-800': order.payment_status === 'refunded',
                    'bg-red-100 text-red-800': order.payment_status === 'cancelled',
                  }">
                    {{ order.payment_status }}
                  </span>
                </td>
                <td>{{ order.total_formatted }}</td>
                <td>N/A</td>
                <td>{{ order.items?.length }} Items</td>
                <td>
                  <span class="badge" :class="{
                    'bg-yellow-100 text-yellow-800': order.status === 'pending',
                    'bg-green-100 text-green-800': order.status === 'confirmed',
                    'bg-blue-100 text-blue-800': order.status === 'processing',
                    'bg-indigo-100 text-indigo-800': order.status === 'shipped',
                    'bg-emerald-100 text-emerald-800': order.status === 'delivered',
                    'bg-red-100 text-red-800': order.status === 'cancelled',
                    'bg-gray-100 text-gray-800': order.status === 'returned',
                  }">
                    {{ order.status }}
                  </span>
                </td>
                <td class="text-right ">
                  <div class="flex items-center justify-end gap-2">
                    <button @click="confirmOrder(order.id)" class="action__success"
                      :disabled="order.status === 'confirmed'" :class="{
                        'cursor-not-allowed opacity-50 pointer-events-none':
                          order.status === 'confirmed'
                      }">
                      Confirm
                    </button>
                    <RouterLink :to="{ name: 'orders.show', params: { id: order.id } }" class="action__info">
                      View
                    </RouterLink>
                    <button @click="cancelOrder(order.id)" class="action__danger"
                      :disabled="order.status === 'cancelled'" :class="{
                        'cursor-not-allowed opacity-50 pointer-events-none':
                          order.status === 'cancelled'
                      }">
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <Pagination v-if="orders.meta" class="px-4 py-6" :total-items="orders.meta.total"
            :current-page="orders.meta.current_page" :items-per-page="orders.meta.per_page" :pages-to-show="2"
            @page-change="loadOrders" visible-always />

        </div>
      </template>
      <template v-else>
        <NotFound />
      </template>
    </div>
  </Default>
</template>

<style scoped></style>
