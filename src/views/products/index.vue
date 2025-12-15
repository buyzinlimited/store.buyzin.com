<script setup>
import Default from "@/layouts/Default.vue";
import { reactive } from "vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseTextarea from "@/components/BaseTextarea.vue";
import QuillEditor from "@/components/QuillEditor.vue";
import BaseInput from "@/components/BaseInput.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconRefresh from "@/components/icons/IconRefresh.vue";
import BaseFile from "@/components/BaseFile.vue";
import BaseMultipleFile from "@/components/BaseMultipleFile.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

const form = reactive({
  name: "Rechargeable Hair Clipper for Men",
  sku: "",
  type: "simple",

  overview: "",
  description: "",

  base_price: 25000,
  price: 22500,

  schedule_start: null,
  schedule_end: null,

  quantity: 0,
  stock: "in_stock",
  low_stock_threshold: 5,
  sold_count: 0,

  weight: 0.5,
  length: "",
  width: "",
  height: "",

  is_shippable: true,
  cod_available: true,
  estimated_delivery: "3-5 business days",

  options: [
    {
      name: "",
      values: []
    },
  ],
  specifications: [],

  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  canonical_url: "",

  categories: [],
  brand_id: null,

  cover: null,
  gallery: [],

  video: {
    provider: "youtube",
    code: ""
  },

  warranty: "",
  refundable: '',
  conditions: "",

  tags: [],

  status: "draft",
  visibility: "private",
});



const generateSku = () => {
  form.sku = Math.floor(100000 + Math.random() * 900000);
}

const addSpec = () => {
  form.specifications.push({ title: "", items: [{ label: "", value: "" }] });
};

const removeSpec = (index) => {
  form.specifications.splice(index, 1);
};

const addItem = (specIndex) => {
  form.specifications[specIndex].items.push({ label: "", value: "" });
};

const removeItem = (specIndex, itemIndex) => {
  form.specifications[specIndex].items.splice(itemIndex, 1);
};


const addOption = () => {
  form.options.push({
    name: "",
    values: [],
  });
};

const removeOption = (index) => {
  form.options.splice(index, 1);
};

const addValue = (optionIndex, event) => {
  const value = event.target.value.trim();
  if (!value) return;

  const values = form.options[optionIndex].values;

  if (!values.includes(value)) {
    values.push(value);
  }

  event.target.value = ""; // clear input
};

const removeValue = (optionIndex, valueIndex) => {
  form.options[optionIndex].values.splice(valueIndex, 1);
};

</script>

<template>
  <Default>
    <main class="w-full">
      <nav class="flex items-center justify-between mb-4">
        <h4 class="text-xl font-semibold">Product List</h4>
        <RouterLink :to="{ name: 'products.create' }" class="base__button">Add new</RouterLink>
      </nav>

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
              <tr class="hover:bg-gray-50 transition">
                <!-- Product Info -->
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <img src="https://via.placeholder.com/40" alt="Product" class="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p class="font-medium text-gray-900">
                        Wireless Earbuds
                      </p>
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
        </div>

      </div>
    </main>
  </Default>
</template>

<style scoped></style>
