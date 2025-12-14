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
        <h4 class="text-xl font-semibold">Add Product</h4>
        <button class="base__button">View All</button>
      </nav>

      <div class="py-2.5 space-y-4">
        <div class="flex flex-wrap items-start gap-4">
          <div class="flex-1 space-y-4">
            <section class="bg-white rounded-xl">
              <h2 class="font-medium border-b border-dashed px-4 py-4">
                Product Info
              </h2>

              <div class="px-4 py-2.5 space-y-4">
                <BaseInput label="Product Name" v-model="form.name" :required="true" />

                <div class="grid grid-cols-3 gap-4">
                  <div class="form__group">
                    <label class="form__label">
                      SKU <span class="text-danger">*</span>
                    </label>

                    <div class="relative">
                      <input type="text" v-model="form.sku" class="form__control pr-12" />

                      <button type="button" @click="generateSku" class="bg-primary text-white w-9 h-9 flex items-center justify-center 
           absolute right-0 top-1/2 -translate-y-1/2 
           hover:bg-primary/90">
                        <IconRefresh class="size-5" />
                      </button>
                    </div>
                  </div>

                  <BaseSelect label="Product Type" v-model="form.type" :items="[
                    { label: 'Simple', value: 'simple' },
                    { label: 'Variable', value: 'variable' },
                    { label: 'Digital', value: 'digital' },
                    { label: 'Service', value: 'service' },
                  ]" />
                  <BaseInput label="Base Price" v-model="form.base_price" />

                  <BaseInput label="Price" v-model="form.price" />
                  <BaseInput label="Schedule Start" type="date" v-model="form.schedule_start" />
                  <BaseInput label="Schedule End" type="date" v-model="form.schedule_end" />
                </div>

                <BaseTextarea label="Overview" />

                <QuillEditor label="Description" />

              </div>
            </section>

            <!-- Options -->
            <section v-if="form.type === 'variable'" class="bg-white rounded-xl">
              <h2 class="font-medium border-b px-4 py-4">Options</h2>

              <div class="px-4 py-4 space-y-6">
                <div v-for="(option, i) in form.options" :key="i" class="border rounded-xl p-4 space-y-4">
                  <div class="flex items-center gap-3">
                    <input v-model="option.name" placeholder="Name (e.g. Color)" class="w-40 form__control" />

                    <input @keydown.enter.prevent="addValue(i, $event)" placeholder="Type value & press Enter"
                      class="form__control" />

                    <button @click="removeOption(i)" class="ml-auto text-danger text-sm">
                      Clear
                    </button>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <span v-for="(value, vi) in option.values" :key="vi"
                      class="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {{ value }}
                      <button @click="removeValue(i, vi)">✕</button>
                    </span>
                  </div>
                </div>

                <button @click="addOption" class="base__button">
                  Add Option
                </button>
              </div>
            </section>


            <!-- Inventory section -->
            <section class="bg-white rounded-xl">
              <h2 class="font-medium border-b border-dashed px-4 py-4">
                Inventory
              </h2>

              <div class="px-4 py-2.5 space-y-4">
                <div class="grid grid-cols-4 gap-4">
                  <BaseInput label="Quantity" v-model="form.quantity" />
                  <BaseSelect label="stock" v-model="form.stock" :items="[
                    { label: 'In Stock', value: 'in_stock' },
                    { label: 'Out Of Stock', value: 'out_of_stock' },
                    { label: 'Preorder', value: 'preorder' },
                  ]" />

                  <BaseInput label="Stock Alert" v-model="form.low_stock_threshold" />
                  <BaseInput label="Sold Count" v-model="form.sold_count" />
                  <BaseInput label="Weight" v-model="form.weight" />
                  <BaseInput label="Length" v-model="form.length" />
                  <BaseInput label="Width" v-model="form.width" />
                  <BaseInput label="Height" v-model="form.height" />
                </div>
              </div>
            </section>


            <!-- Specifications -->
            <section class="bg-white rounded-xl">
              <h2 class="font-medium border-b border-dashed px-4 py-4">
                Specifications
              </h2>

              <div class="px-4 py-4">
                <div v-for="(spec, specIndex) in form.specifications" :key="specIndex"
                  class="border p-2 space-y-2 rounded mb-3">
                  <div class="flex items-center justify-between gap-2">
                    <input type="text" v-model="spec.title" placeholder="Title (e.g., Display)"
                      class="form__control flex-1" />
                    <button @click="removeSpec(specIndex)" type="button" class="bg-danger text-white p-2 rounded">
                      <IconClose class="size-5" />
                    </button>
                  </div>

                  <div v-for="(item, itemIndex) in spec.items" :key="itemIndex"
                    class="flex items-center gap-2 space-y-2">
                    <input type="text" v-model="item.label" placeholder="Label (e.g., Size)" class="form__control" />
                    <input type="text" v-model="item.value" placeholder="Value (e.g., 6.67 inches)"
                      class="form__control" />
                    <button @click="removeItem(specIndex, itemIndex)" type="button"
                      class="bg-danger text-white p-2 rounded">
                      <IconClose class="size-5" />
                    </button>
                  </div>

                  <button @click="addItem(specIndex)" type="button" class="base__button">
                    Add Item
                  </button>
                </div>

                <button @click="addSpec" type="button" class="base__button w-full">
                  Add Specification
                </button>
              </div>
            </section>

            <!-- SEO Meta Information -->
            <section class="bg-white rounded-xl">
              <h2 class="font-medium border-b border-dashed px-4 py-4">
                SEO Meta Information
              </h2>

              <div class="px-4 py-2.5 space-y-4">
                <BaseInput label="Meta Title" v-model="form.meta_title" placeholder="Enter meta title" />
                <BaseTextarea label="Meta Description" placeholder="Enter meta description" />
                <BaseTextarea label="Meta keywords" placeholder="Enter meta keywords" />
                <BaseInput label="Canonical url" v-model="form.canonical_url" placeholder="Enter Canonical url" />
              </div>
            </section>

          </div>

          <div class="flex-none w-80 space-y-4">
            <!-- Visibility -->
            <section class="bg-white rounded-xl">
              <h2 class="font-medium border-b border-dashed px-4 py-4">
                Published
              </h2>

              <div class="px-4 py-2.5">
                <div class="grid grid-cols-2 gap-2.5">
                  <BaseSelect label="Status" v-model="form.status" :items="[
                    { label: 'Published', value: 'published' },
                    { label: 'Draft', value: 'draft' },
                  ]" />

                  <BaseSelect label="Visibility" v-model="form.visibility" :items="[
                    { label: 'Public', value: 'public' },
                    { label: 'Private', value: 'private' },
                  ]" />
                </div>

                <div class="flex items-center gap-2 mb-2">
                  <input type="checkbox" v-model="form.is_shippable" id="shippable" class="h-4 w-4" />
                  <label for="shippable" class="text-gray-700">Shippable</label>
                </div>

                <div class="flex items-center gap-2 mb-2">
                  <input type="checkbox" v-model="form.cod_available" id="cod" class="h-4 w-4" />
                  <label for="cod" class="text-gray-700">Cash on Delivery</label>
                </div>

                <div>
                  <label class="block text-gray-700 mb-1">Estimated Delivery</label>
                  <input type="text" v-model="form.estimated_delivery" placeholder="e.g. 3-5 business days"
                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
              </div>
            </section>

            <!-- Categories -->
            <section class="bg-white rounded-xl">
              <h2 class="font-medium border-b border-dashed px-4 py-4">
                Categories
              </h2>

              <div class="px-4 py-2.5">
                <label class="relative block">
                  <IconSearch class="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="search" placeholder="Search..." class="form__control pl-10 pr-3" />
                </label>
              </div>
              <div class="px-4 py-2 space-y-3">
                <div class="space-y-2">
                  <label class="flex items-center justify-between cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" class="accent-primary size-4 rounded border-gray-300" />
                      <span class="font-medium">Finance</span>
                    </div>
                    <i class="fa-light fa-minus text-gray-500"></i>
                  </label>

                  <div class="pl-6 border-l-2 border-primary space-y-2">
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" class="accent-primary size-4 rounded border-gray-300" />
                      <span>Banking</span>
                    </label>

                    <div class="space-y-2">
                      <label class="flex items-center justify-between cursor-pointer">
                        <div class="flex items-center space-x-2">
                          <input type="checkbox" class="accent-primary size-4 rounded border-gray-300" />
                          <span>Accounting</span>
                        </div>
                        <i class="fa-light fa-plus text-gray-500"></i>
                      </label>

                      <div class="pl-6 border-l border-gray-200 space-y-2 hidden">
                        <label class="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" class="accent-primary size-4 rounded border-gray-300" />
                          <span>Bangladesh Bank</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="flex items-center justify-between cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" class="accent-primary size-4 rounded border-gray-300" />
                      <span>Fashion & Clothing</span>
                    </div>
                    <i class="fa-light fa-plus text-gray-500"></i>
                  </label>

                  <div class="pl-6 border-l border-gray-200 space-y-2 hidden">
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" class="accent-primary size-4 rounded border-gray-300" />
                      <span>T-Shirt</span>
                    </label>

                    <div class="space-y-2">
                      <label class="flex items-center justify-between cursor-pointer">
                        <div class="flex items-center space-x-2">
                          <input type="checkbox" class="accent-primary size-4 rounded border-gray-300" />
                          <span>Shirt</span>
                        </div>
                        <i class="fa-light fa-plus text-gray-500"></i>
                      </label>

                      <div class="pl-6 border-l border-gray-200 space-y-2 hidden">
                        <label class="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" class="size-4 rounded border-gray-300" />
                          <span>Casual Shirt</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="size-4 rounded border-gray-300" />
                  <span>Bag</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="size-4 rounded border-gray-300" />
                  <span>Monitor</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="size-4 rounded border-gray-300" />
                  <span>Keyboard</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="size-4 rounded border-gray-300" />
                  <span>Mouse</span>
                </label>
              </div>
            </section>

            <!-- Brands -->
            <section class="bg-white rounded-xl">
              <h2 class="font-medium border-b border-dashed px-4 py-2">Brands</h2>

              <div class="px-4 py-2.5">
                <label class="relative block">
                  <IconSearch class="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="search" placeholder="Search..." class="form__control pl-10 pr-3" />
                </label>
              </div>
              <div class="px-4 py-2 space-y-3">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" class="size-4 rounded border-gray-300" />
                  <span>Walton</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" class="size-4 rounded border-gray-300" />
                  <span>LG</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" class="size-4 rounded border-gray-300" />
                  <span>Gigabyte</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" class="size-4 rounded border-gray-300" />
                  <span>Samsung</span>
                </label>
              </div>
            </section>

            <!-- Media -->
            <section class="bg-white rounded-xl">
              <h2 class="font-medium border-b border-dashed px-4 py-4">Media</h2>

              <div class="px-4 py-2.5 space-y-4">
                <BaseFile label="Cover" v-model="form.cover" :required="true" error="" />
                <BaseMultipleFile label="Gallery" v-model="form.gallery" :required="true" error="" />

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">
                    Video URL
                  </label>

                  <div class="relative">
                    <input type="text" placeholder="(e.g. dQw4w9WgXcQ)" class="w-full rounded-lg border border-gray-300 pl-3 pr-28 py-2 text-sm
             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none" />

                    <select class="-translate-y-1/2 absolute outline-none right-0 top-1/2 appearance-none px-2.5">
                      <option value="youtube">YouTube</option>
                      <option value="vimeo">Vimeo</option>
                    </select>
                  </div>
                </div>

              </div>
            </section>

            <!-- Warranty & Refund -->
            <section class="bg-white rounded-x">
              <h2 class="font-medium border-b border-dashed px-4 py-4">
                Warranty & Refund
              </h2>

              <div class="px-4 py-2.5 space-y-4">
                <BaseInput label="Warranty" v-model="form.warranty" placeholder="Enter warranty period" />
                <BaseInput label="Refundable" v-model="form.refundable" placeholder="Is the product refundable?" />
                <BaseInput label="Conditions" v-model="form.conditions" placeholder="Enter product conditions" />
              </div>
            </section>

            <!-- Tags -->
            <section class="bg-white rounded-xl">
              <h2 class="font-medium border-b border-dashed px-4 py-4">Tags</h2>

              <div class="px-4 py-2.5">
                <BaseTextarea label="Tags" placeholder="Enter product tags" />
                <span class="text-xs">Use commas to separate tags</span>
              </div>
            </section>


          </div>
        </div>
      </div>


    </main>
  </Default>
</template>

<style scoped></style>
