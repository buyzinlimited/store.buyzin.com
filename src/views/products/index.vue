<script setup>
import Default from "@/layouts/Default.vue";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";
import Loading from "@/components/Loading.vue";
import NotFound from "@/components/NotFound.vue";

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
                  <th class="px-4 py-3">Category</th>
                  <th class="px-4 py-3">Brand</th>
                  <th class="px-4 py-3">SKU</th>
                  <th class="px-4 py-3">Price</th>
                  <th class="px-4 py-3">Stock</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody class="divide-y">
                <tr v-for="product in products.data" :key="product.id" class="hover:bg-gray-50 transition">

                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <img :src="product.cover_url" :alt="product.name" class="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <h3 class="font-medium text-gray-900">
                          {{ product.name }}
                        </h3>

                        <div class="flex items-center">
                          <p v-for="category in product.categories" :key="category.id" class="text-xs text-gray-500
         after:content-['•']
         after:mx-1
         last:after:content-none">
                            {{ category.name }}
                          </p>
                        </div>

                      </div>
                    </div>
                  </td>

                  <td class="px-4 py-3 text-gray-600">
                    {{ product.category?.name }}
                  </td>
                  <td class="px-4 py-3 text-gray-600">
                    {{ product.brand?.name }}
                  </td>
                  <td class="px-4 py-3 text-gray-600">
                    {{ product.sku }}
                  </td>

                  <td class="px-4 py-3">
                    <div v-if="product.price" class="font-font-medium">
                      <del class="font-normal ml-2">{{ product.base_price_formatted }}</del>
                      <span class="font-normal ml-2">{{ product.price_formatted }}</span>
                    </div>
                    <p v-else class="font-font-medium">{{ product.base_price_formatted }}</p>
                  </td>

                  <td class="px-4 py-3">
                    <span class="text-green-600 font-medium">
                      {{ product.quantity }}
                    </span>
                  </td>

                  <td class="px-4 py-3">
                    <span class="px-2.5 py-1 capitalize rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {{ product.status }}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="px-4 py-3 text-right">
                    <div class="flex justify-end gap-2">
                      <RouterLink :to="{ name: 'products.edit', params: { id: product.id } }"
                        class="bg-primary text-white px-4 py-1 text-xs rounded">
                        Edit
                      </RouterLink>
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
        <NotFound />
      </template>
    </main>
  </Default>
</template>

<style scoped></style>
