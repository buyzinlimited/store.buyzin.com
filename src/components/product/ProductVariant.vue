<script setup>
import { reactive } from 'vue'
import IconClose from '../icons/IconClose.vue'

const variant = reactive({
  hasVariant: false,
  variants: [], // list of variants
})

// Add blank variant row
const addVariant = () => {
  variant.variants.push({
    name: '',
    price: 0,
    stock: 0,
    sku: '',
    status: true,
    default: variant.variants.length === 0, // first variant is default
    image: '',
  })
}

// Remove a variant by index
const removeVariant = (index) => {
  variant.variants.splice(index, 1)
  // If the default variant was removed, set the first one as default
  if (!variant.variants.some(v => v.default) && variant.variants.length) {
    variant.variants[0].default = true
  }
}

// Set default variant
const setDefault = (index) => {
  variant.variants.forEach((v, i) => (v.default = i === index))
}
</script>

<template>
  <div class="bg-white rounded-xl border p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between border-b pb-3">
      <h2 class="font-semibold text-lg">Product Variants</h2>
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="variant.hasVariant" />
        <label class="font-medium">Enable Variants</label>
      </div>
    </div>

    <!-- Variant Table -->
    <div v-if="variant.hasVariant" class="space-y-4">

      <div v-if="variant.variants.length" class="overflow-x-auto mt-2">
        <table class="w-full text-sm border rounded-lg">
          <thead class="bg-gray-50">
            <tr>
              <th class="p-2">Image</th>
              <th class="p-2">Variant Name</th>
              <th class="p-2">Price</th>
              <th class="p-2">Stock</th>
              <th class="p-2">SKU</th>
              <th class="p-2">Status</th>
              <th class="p-2">Default</th>
              <th class="p-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in variant.variants" :key="row.sku + index" class="border-t">
              <td class="p-2">
                <div class="bg-gray-200 w-10 h-10 border rounded overflow-hidden"></div>
              </td>
              <td class="p-2"><input v-model="row.name" class="form__control" /></td>
              <td class="p-2"><input type="number" v-model="row.price" class="form__control" /></td>
              <td class="p-2"><input type="number" v-model="row.stock" class="form__control" /></td>
              <td class="p-2"><input v-model="row.sku" class="form__control" /></td>
              <td class="p-2"><input type="checkbox" v-model="row.status" /></td>
              <td class="p-2 text-center">
                <input type="radio" name="default" :checked="row.default" @change="setDefault(index)" />
              </td>
              <td class="p-2 text-center">
                <button type="button" @click="removeVariant(index)">
                  <IconClose class="size-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button @click="addVariant" class="px-3 py-1 bg-primary text-white rounded">Add Variant</button>

    </div>

    <!-- Footer -->
    <div class="flex justify-end items-center gap-2">
      <button class="px-4 py-2 border rounded">Cancel</button>
      <button class="px-4 py-2 bg-primary text-white rounded" @click="$emit('save', variant)">Save Variants</button>
    </div>
  </div>
</template>
