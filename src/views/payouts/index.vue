<script setup>
import Default from '@/layouts/Default.vue';


</script>

<template>
    <Default>
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl font-semibold text-gray-900">Payouts</h1>
                <p class="text-sm text-gray-500">Track your earnings and withdrawals</p>
            </div>


            <button
                class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                Request Payout
            </button>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">


            <div class="rounded-xl border bg-white p-5">
                <p class="text-sm text-gray-500">Available Balance</p>
                <h2 class="mt-2 text-2xl font-semibold text-gray-900">৳12,450</h2>
            </div>


            <div class="rounded-xl border bg-white p-5">
                <p class="text-sm text-gray-500">Pending Payout</p>
                <h2 class="mt-2 text-2xl font-semibold text-yellow-600">৳3,200</h2>
            </div>


            <div class="rounded-xl border bg-white p-5">
                <p class="text-sm text-gray-500">Total Paid</p>
                <h2 class="mt-2 text-2xl font-semibold text-green-600">৳45,780</h2>
            </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <input type="text" placeholder="Search by reference..."
                class="w-full md:w-64 rounded-lg border px-3 py-2 text-sm focus:border-primary focus:ring-primary" />

            <select class="rounded-lg border px-3 py-2 text-sm focus:border-primary focus:ring-primary">
                <option>All Status</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>Rejected</option>
            </select>
        </div>

        <template v-if="true">
            <div class="overflow-hidden rounded-xl border bg-white">
                <table class="min-w-full divide-y">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Reference</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Method</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Amount</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                        </tr>
                    </thead>


                    <tbody class="divide-y">
                        <tr>
                            <td class="px-4 py-3 text-sm">12 Dec 2025</td>
                            <td class="px-4 py-3 text-sm">#PO-2391</td>
                            <td class="px-4 py-3 text-sm">Bank Transfer</td>
                            <td class="px-4 py-3 text-sm font-medium">৳2,500</td>
                            <td class="px-4 py-3">
                                <span
                                    class="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">Pending</span>
                            </td>
                        </tr>


                        <tr>
                            <td class="px-4 py-3 text-sm">05 Dec 2025</td>
                            <td class="px-4 py-3 text-sm">#PO-2384</td>
                            <td class="px-4 py-3 text-sm">Bkash</td>
                            <td class="px-4 py-3 text-sm font-medium">৳4,000</td>
                            <td class="px-4 py-3">
                                <span
                                    class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Completed</span>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </template>

        <template v-else>
            <div class="rounded-xl border bg-white p-10 text-center">
                <p class="text-gray-500">No payout history found</p>
            </div>
        </template>

    </Default>
</template>

<style scoped></style>