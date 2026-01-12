<script setup>
import { ref, computed, watch, onBeforeUnmount } from "vue";
import apiClient from "@/utils/axios";

const props = defineProps({
  label: { type: String, default: "Gallery" },
  required: { type: Boolean, default: false },
  error: { type: String, default: "" },
  modelValue: { type: Array, default: () => [] },
  preview: { type: Array, default: () => [] },
  accept: { type: String, default: "image/webp" },
  name: { type: String, default: "gallery" },
  server: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue", "uploaded", "error"]);

const files = ref(
  props.modelValue.length
    ? [...props.modelValue]
    : [...props.preview]
);
const uploading = ref(false);

// Watch for external modelValue changes
watch(
  () => [props.modelValue, props.preview],
  ([modelVal, previewVal]) => {
    if (modelVal?.length) {
      files.value = [...modelVal];
    } else if (previewVal?.length) {
      files.value = [...previewVal];
    }
  },
  { immediate: true }
);


// Computed previews for display
const previewFiles = computed(() =>
  files.value.map((file) => ({
    file,
    url: typeof file === "string" ? file : URL.createObjectURL(file),
  }))
);


// Cleanup local object URLs
const revokeUrls = () => {
  previewFiles.value.forEach((preview) => {
    if (preview.file instanceof File) URL.revokeObjectURL(preview.url);
  });
};

onBeforeUnmount(() => revokeUrls());

// Handle new file selection
async function onFileChange(event) {
  const selected = Array.from(event.target.files);

  // validate mime
  const invalid = selected.filter(
    (f) => !props.accept.split(",").includes(f.type)
  );
  if (invalid.length) {
    alert(`Invalid file type: ${invalid.map(f => f.name).join(", ")}`);
    return;
  }

  files.value = [...files.value, ...selected];
  emit("update:modelValue", files.value);

  // 🔥 upload ALL files in ONE request
  await uploadFiles(selected);
}


// Remove file by index
function removeFile(index) {
  const file = files.value[index];
  if (file instanceof File) URL.revokeObjectURL(file.url);

  files.value.splice(index, 1);
  emit("update:modelValue", files.value);
}

// Upload a single file to server
const uploadFiles = async (selectedFiles) => {
  if (!props.server || !selectedFiles.length) return;

  uploading.value = true;

  try {
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append(`${props.name}[]`, file); // gallery[]
    });

    const response = await apiClient.post(props.server, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    emit("uploaded", response.data);
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Upload failed";
    emit("error", message);
    console.error(message);
  } finally {
    uploading.value = false;
  }
};


</script>

<template>
  <div class="w-full space-y-2">
    <!-- Label -->
    <label class="block text-sm font-medium">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Gallery previews + upload button -->
    <div class="flex flex-wrap items-start gap-2">
      <!-- Previews -->
      <div v-for="(file, index) in previewFiles" :key="index"
        class="relative w-20 h-20 rounded overflow-hidden border border-dashed border-gray-300">
        <img :src="file.url" alt="Preview" class="object-cover w-full h-full" />
      </div>

      <!-- Upload Button -->
      <label
        class="w-20 h-20 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-primary hover:text-primary cursor-pointer transition p-1.5">
        <input type="file" multiple class="hidden" :accept="accept" @change="onFileChange" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 mb-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75 7.409 10.591a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5
               1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5
               1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0
               0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Z" />
        </svg>
        <span class="text-xs">Upload</span>
      </label>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>

    <!-- Uploading state -->
    <p v-if="uploading" class="text-xs text-blue-500">Uploading...</p>
  </div>
</template>
