<template>
  <div class="w-full">
    <!-- Label -->
    <label class="block text-sm font-medium mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Input + Previews -->
    <div class="flex flex-wrap items-start gap-2">
      <!-- Preview List -->
      <div v-for="(file, index) in previewFiles" :key="index"
        class="relative w-20 h-20 rounded overflow-hidden border border-dashed border-gray-300">
        <img :src="file.url" alt="Preview" class="object-cover w-full h-full" />

        <button @click="removeFile(index)" class="absolute bottom-1 left-1 right-1 bg-black/50 text-white rounded">
          Remove
        </button>
      </div>

      <!-- Upload Button -->
      <label
        class="w-20 h-20 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-primary hover:text-primary cursor-pointer transition p-1.5">
        <input type="file" multiple class="hidden" :accept="accept" @change="onFileChange" />

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6 mb-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5
               1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5
               1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0
               0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375
               0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>

        <span class="text-xs">Upload</span>
      </label>
    </div>

    <!-- Error message -->
    <p v-if="error" class="text-red-500 text-xs mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  label: { type: String, default: "Gallery" },
  required: { type: Boolean, default: false },
  error: { type: String, default: "" },
  modelValue: { type: Array, default: () => [] },
  accept: { type: String, default: "image/*" },
});

const emit = defineEmits(["update:modelValue"]);

const files = ref([...props.modelValue]);

// Preview URLs
const previewFiles = computed(() =>
  files.value.map((file) => ({
    file,
    url: typeof file === "string" ? file : URL.createObjectURL(file),
  }))
);

function onFileChange(event) {
  const selected = Array.from(event.target.files);
  files.value = [...files.value, ...selected];
  emit("update:modelValue", files.value);
}

function removeFile(index) {
  files.value.splice(index, 1);
  emit("update:modelValue", files.value);
}
</script>
