<script setup>
import Default from "@/layouts/Default.vue";
</script>

<template>
  <Default>
    <div class="space-y-6">
      <!-- Header + Filter -->
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold">Overview</h3>

        <div class="relative">
          <button
            class="flex items-center justify-between w-40 bg-white border border-gray-300 rounded px-3 py-2 text-sm"
          >
            Last Week
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- dropdown -->
          <ul
            class="absolute hidden bg-white shadow-lg border border-gray-200 rounded mt-1 w-40 text-sm z-20"
          >
            <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer">
              Last Week
            </li>
            <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer">2 Week</li>
            <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer">
              One Month
            </li>
            <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer">6 Month</li>
          </ul>
        </div>
      </div>

      <!-- Filter Buttons -->
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-gray-100 rounded text-sm font-medium">
          All 250
        </button>
        <button class="px-4 py-2 bg-gray-100 rounded text-sm font-medium">
          New Item 150
        </button>
        <button class="px-4 py-2 bg-gray-100 rounded text-sm font-medium">
          Disabled 154
        </button>
      </div>

      <!-- Table -->
      <div class="bg-white shadow rounded overflow-hidden">
        <div class="p-4 flex justify-between items-center">
          <div>
            <label class="text-sm">
              Show
              <select class="border rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              entries
            </label>
          </div>

          <div>
            <label class="text-sm">
              Search:
              <input
                type="text"
                class="border rounded px-2 py-1 text-sm ml-1"
              />
            </label>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-100 text-left">
              <tr>
                <th class="p-3 font-medium">Order No</th>
                <th class="p-3 font-medium">Customer</th>
                <th class="p-3 font-medium">Date</th>
                <th class="p-3 font-medium">Amount</th>
                <th class="p-3 font-medium">Category</th>
                <th class="p-3 font-medium text-right">Status</th>
              </tr>
            </thead>

            <tbody>
              <!-- single row -->
              <tr class="border-b">
                <td class="p-3 flex items-center gap-3">
                  <input type="checkbox" class="h-4 w-4" />
                  <p class="text-blue-600 font-semibold">#87451</p>
                </td>

                <td class="p-3 font-semibold text-gray-800">Esther Howard</td>

                <td class="p-3 font-semibold text-gray-800">02/03/2022</td>

                <td class="p-3 font-semibold text-gray-800">$200</td>

                <td class="p-3 font-semibold text-gray-800">Notebook</td>

                <td class="p-3 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <p class="text-green-600 font-medium">Delivered</p>
                    <img src="#" class="w-5 h-5" />
                    <div
                      class="flex gap-2 text-sm text-blue-500 cursor-pointer"
                    >
                      <span>Edit</span>
                      <span>Delete</span>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Copy more rows as needed... -->
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center p-4 text-sm">
          <p>Showing 1 to 10 of 31 entries</p>

          <div class="flex gap-2">
            <button
              class="px-3 py-1 border rounded text-gray-500 cursor-not-allowed"
            >
              First
            </button>
            <button
              class="px-3 py-1 border rounded text-gray-500 cursor-not-allowed"
            >
              Previous
            </button>

            <button class="px-3 py-1 border rounded bg-gray-200">1</button>
            <button class="px-3 py-1 border rounded">2</button>
            <button class="px-3 py-1 border rounded">3</button>
            <button class="px-3 py-1 border rounded">4</button>

            <button class="px-3 py-1 border rounded">Next</button>
            <button class="px-3 py-1 border rounded">Last</button>
          </div>
        </div>
      </div>
    </div>
  </Default>
</template>

<style scoped></style>
