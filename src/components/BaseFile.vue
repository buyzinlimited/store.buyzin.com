<script setup>
import { ref, watch } from "vue";
import IconClose from "./icons/IconClose.vue";

const props = defineProps({
  label: { type: String, default: "Upload File" },
  required: { type: Boolean, default: false },
  error: { type: String, default: "" },
  modelValue: File,
  accept: { type: String, default: "image/*" },
  hint: {
    type: String,
    default: "Upload image size 2MB, Format JPG, PNG, SVG",
  },
});

const emit = defineEmits(["update:modelValue"]);

const file = ref(props.modelValue || null);
const preview = ref(null);

// Sync external v-model data
watch(
  () => props.modelValue,
  (val) => {
    file.value = val;

    if (val instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => (preview.value = e.target.result);
      reader.readAsDataURL(val);
    } else if (typeof val === "string") {
      // Support external URL
      preview.value = val;
    } else {
      preview.value = null;
    }
  },
  { immediate: true }
);

function handleFileChange(event) {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  file.value = selectedFile;
  emit("update:modelValue", selectedFile);

  const reader = new FileReader();
  reader.onload = (e) => (preview.value = e.target.result);
  reader.readAsDataURL(selectedFile);
}

function removeFile() {
  file.value = null;
  preview.value = null;
  emit("update:modelValue", null);
}
</script>

<template>
  <div class="space-y-1 w-full">
    <!-- Label -->
    <label class="block text-sm font-medium mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Upload Box -->
    <label
      class="w-full h-40 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-primary hover:text-primary cursor-pointer overflow-hidden relative transition p-1.5"
      :class="error ? 'border-red-500 text-red-500' : ''"
    >
      <!-- Preview -->
      <template v-if="preview">
        <img
          :src="preview"
          alt="Preview"
          class="object-cover w-full h-full rounded-lg"
        />

        <!-- Remove Button -->
        <button
          type="button"
          @click.stop="removeFile"
          class="absolute top-2 right-2 bg-white text-gray-600 hover:text-red-500 rounded-full shadow p-1"
        >
          <IconClose class="size-5" />
        </button>
      </template>

      <!-- Icon (When no preview) -->
      <template v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 mb-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 
               1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 
               1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 
               0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 
               0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <span class="text-sm">Click to upload</span>
      </template>

      <!-- Hidden File Input -->
      <input
        type="file"
        class="hidden"
        :accept="accept"
        @change="handleFileChange"
      />
    </label>

    <p class="text-xs text-gray-500" v-if="hint">{{ hint }}</p>

    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>
