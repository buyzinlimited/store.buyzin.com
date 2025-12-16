<script setup>
import Default from "@/layouts/Default.vue";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";
import Loading from "@/components/Loading.vue";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const loadProducts = async (page = 1) => {
  await productStore.all(page);
}


onMounted(() => {
  loadProducts();
})
</script>

<template>
  <Default>
    <main class="w-full">
      <nav class="flex items-center justify-between mb-4">
        <h4 class="text-xl font-semibold">Product List</h4>
        <RouterLink :to="{ name: 'products.create' }" class="base__button">Add new</RouterLink>
      </nav>

      <template v-if="productStore.loading">
        <Loading />
      </template>
      <template v-else-if="products.data">
        <div class="bg-white space-y-4 rounded-2xl p-4">
          <div class="relative overflow-x-auto bg-white rounded-xl">
            <table class="min-w-full text-sm">
              <!-- Table Head -->
              <thead class="bg-gray-50 border-b">
                <tr class="text-left text-gray-600 font-medium">
                  <th class="px-4 py-3">Product</th>
                  <th class="px-4 py-3">SKU</th>
                  <th class="px-4 py-3">Price</th>
                  <th class="px-4 py-3">Stock</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <!-- Table Body -->
              <tbody class="divide-y">
                <tr v-for="product in products.data" :key="product.id" class="hover:bg-gray-50 transition">

                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <img :src="product.cover_url" :alt="product.name" class="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <h3 class="font-medium text-gray-900">
                          {{ product.name }}
                        </h3>
                        <p class="text-xs text-gray-500">
                          Electronics
                        </p>
                      </div>
                    </div>
                  </td>

                  <!-- SKU -->
                  <td class="px-4 py-3 text-gray-600">
                    EAR-WL-0001
                  </td>

                  <!-- Price -->
                  <td class="px-4 py-3 font-medium">
                    ৳2,750
                  </td>

                  <!-- Stock -->
                  <td class="px-4 py-3">
                    <span class="text-green-600 font-medium">
                      In Stock
                    </span>
                  </td>

                  <!-- Status -->
                  <td class="px-4 py-3">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="px-4 py-3 text-right">
                    <div class="flex justify-end gap-2">
                      <button class="px-3 py-1.5 text-xs rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                        Edit
                      </button>
                      <button class="px-3 py-1.5 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>


            <Pagination class="px-4 py-6" :total-items="products.meta.total" :current-page="products.meta.current_page"
              :items-per-page="products.meta.per_page" :pages-to-show="2" @page-change="loadProducts" visible-always />
          </div>
        </div>
      </template>
      <template v-else>
        <p>not found</p>

      </template>


    </main>
  </Default>
</template>

<style scoped></style>
