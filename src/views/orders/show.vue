<script setup>
import Default from '@/layouts/Default.vue';
import { useOrderStore } from '@/stores/order';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const orderStore = useOrderStore();
const route = useRoute();
const { order } = storeToRefs(orderStore);

const loadOrder = async () => {
    await orderStore.show(route.params.id);
}

onMounted(() => {
    loadOrder();
});
</script>

<template>
    <Default>
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-xl font-semibold">
                    Order ID: #{{ order.order_number }}
                </h1>
                <p class="text-sm text-gray-500">
                    Created Date: {{ $date(order.created_at) }}
                </p>
            </div>

            <div class="flex gap-2">
                <span class="badge badge__success">
                    {{ order.status }}
                </span>
                <button type="button" class="base__button">Confirm</button>
            </div>
        </div>


        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
                <!-- Order Item -->
                <div class="bg-white rounded-lg border p-4">
                    <h2 class="font-semibold mb-4">Order Item</h2>

                    <article v-for="item in order?.items">
                        <div class="flex items-center gap-4 py-2">
                            <img :src="item.product?.cover_url" :alt="item.product?.name"
                                class="w-20 h-20 rounded border" />
                            <div class="flex-1">
                                <p class="font-medium">{{ item.product?.name }}</p>
                                <p class="text-sm text-gray-500">SKU: {{ item.sku }} . Options: N/A</p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm">{{ item.quantity }} x {{ item.price }}</p>
                                <p class="font-semibold">{{ item.total }}</p>
                            </div>
                        </div>
                    </article>
                </div>

                <div class="bg-white rounded-lg border p-4">
                    <div class="flex items-center justify-between border-b">
                        <h2 class="font-semibold mb-4">Order Summary</h2>
                        <span class="font-semibold text-green-500">Paid: {{ order.paid_amount_formatted }}</span>
                    </div>

                    <div class="space-y-2 text-sm py-4">
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span>{{ order.subtotal_formatted }}</span>
                        </div>
                        <div class="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>- {{ order.discount_formatted }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Shipping Cost</span>
                            <span>{{ order.shipping_cost_formatted }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Tax</span>
                            <span>{{ order.tax_formatted }}</span>
                        </div>
                        <hr />
                        <div class="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>{{ order.total_formatted }}</span>
                        </div>
                    </div>

                    <div class="flex gap-2 mt-4">
                        <button class="btn-secondary">Send invoice</button>
                        <button class="btn-primary">Collect payment</button>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-white rounded-lg border p-4">
                    <h2 class="font-semibold mb-2">Notes</h2>
                    <p class="text-sm text-gray-500">{{ order?.note }}</p>
                </div>

                <div class="bg-white rounded-lg border p-4">
                    <h2 class="font-semibold mb-2">Contact Information</h2>
                    <p class="text-sm">{{ order.user?.name }}</p>
                    <p class="text-sm">{{ order.user?.email }}</p>
                    <p class="text-xs text-gray-500">{{ order.user?.phone }}</p>
                </div>

                <!-- Shipping -->
                <div class="bg-white rounded-lg border p-4">
                    <h2 class="font-semibold mb-2">Shipping Address</h2>
                    <p v-if="order.address" class="text-sm">
                        {{ order.address?.address }}<br />
                        {{ order.address?.city }}, {{ order.address?.state }}<br />
                        {{ order.address?.country }} - {{ order.address?.postal_code }}
                    </p>
                </div>
            </div>
        </div>


    </Default>
</template>

<style scoped></style>