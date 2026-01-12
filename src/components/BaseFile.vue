<script setup>
import { ref, watch } from "vue";
import IconClose from "./icons/IconClose.vue";
import apiClient from "@/utils/axios";

const props = defineProps({
  label: { type: String, default: "Upload File" },
  required: { type: Boolean, default: false },
  error: { type: String, default: "" },
  modelValue: File,
  accept: { type: String, default: "image/webp" },
  hint: { type: String, default: "Upload image size max 1MB, Format WEBP" },
  name: { type: String, default: "file" },
  server: { type: String, required: true },
  preview: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "uploaded", "error"]);

const file = ref(props.modelValue || null);
const preview = ref(props.preview || null);
const uploading = ref(false);

// Watch for external modelValue changes
watch(
  () => props.modelValue,
  (val) => {
    file.value = val;
    if (val instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => (preview.value = e.target.result);
      reader.readAsDataURL(val);
    } else if (!val && !props.preview) {
      preview.value = null;
    }
  },
  { immediate: true }
);

// Watch for external preview prop (existing image URL)
watch(
  () => props.preview,
  (val) => {
    if (!file.value) {
      preview.value = val || null;
    }
  },
  { immediate: true }
);

async function handleFileChange(event) {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  // Only WEBP allowed
  if (selectedFile.type !== "image/webp") {
    alert("Only WEBP images are allowed!");
    event.target.value = null;
    return;
  }

  file.value = selectedFile;
  preview.value = null;

  const reader = new FileReader();
  reader.onload = (e) => (preview.value = e.target.result);
  reader.readAsDataURL(selectedFile);

  emit("update:modelValue", selectedFile);

  await uploadFile(selectedFile);
}

function removeFile() {
  file.value = null;
  preview.value = null;
  emit("update:modelValue", null);
}

const uploadFile = async (selectedFile) => {
  if (!props.server) return;

  uploading.value = true;
  try {
    const formData = new FormData();
    formData.append(props.name, selectedFile);

    const response = await apiClient.post(props.server, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    emit("uploaded", response.data);
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Upload failed";
    emit("error", message);
    console.error(message);
  } finally {
    uploading.value = false;
  }
};
</script>

<template>
  <div class="space-y-1 w-full">
    <label class="block text-sm font-medium mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <label
      class="w-full h-32 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-primary hover:text-primary cursor-pointer overflow-hidden relative transition p-1.5"
      :class="error ? 'border-red-500 text-red-500' : ''">

      <template v-if="preview">
        <img :src="preview" alt="Preview" class="object-contain w-full h-full rounded-lg" />
      </template>

      <template v-else>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6 mb-1">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 15.75 7.409 10.591a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M2.25 19.5h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5Z" />
        </svg>
        <span class="text-sm">Click to upload</span>
      </template>

      <input type="file" class="hidden" :accept="accept" @change="handleFileChange" />
    </label>

    <p class="text-xs text-gray-500" v-if="hint">{{ hint }}</p>
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>

    <p v-if="uploading" class="text-xs text-blue-500">Uploading...</p>
  </div>
</template>
