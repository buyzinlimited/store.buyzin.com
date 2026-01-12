<script setup>
import { ref, watch } from "vue";

import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

const FilePond = vueFilePond(FilePondPluginImagePreview);

/* ================= PROPS ================= */
const props = defineProps({
    label: { type: String, default: "" },
    name: { type: String, default: "file" },
    server: { type: String, required: true },
    preview: { type: Array, default: () => [] }, // old URLs
    multiple: { type: Boolean, default: false },
    accept: { type: String, default: "image/webp" },
    headers: { type: Object, default: () => ({}) },
});

/* ================= EMITS ================= */
const emit = defineEmits(["uploaded", "removed"]);

/* ================= STATE ================= */
const files = ref([]);

/* ================= OLD FILE PREVIEW ================= */
watch(
    () => props.preview,
    (urls) => {
        files.value = urls
            .filter(Boolean)
            .map((url) => ({
                source: url,
                options: {
                    type: "local",
                },
            }));
    },
    { immediate: true }
);

/* ================= SERVER CONFIG ================= */
const serverConfig = {
    process: {
        url: props.server,
        method: "POST",
        withCredentials: false,
        headers: {
            ...props.headers,
            Authorization:
                "Bearer 1|4bfLTpKbAgdkYxveEtIRLhEnNUH5hhsmFd6qG3w30981e51e",
        },
        timeout: 7000,

        onload: (response) => {
            emit("uploaded", response);
            return response;
        },

        onerror: (err) => {
            console.error("Upload error:", err);
        },
    },

    revert: (source, load) => {
        emit("removed", source);
        load();
    },
};
</script>

<template>
    <div class="space-y-1">
        <label v-if="label" class="block text-sm font-medium">
            {{ label }}
        </label>

        <FilePond :name="name" :files="files" :allow-multiple="multiple" :accepted-file-types="accept"
            :server="serverConfig" label-idle="Drop files or <span class='filepond--label-action'>Browse</span>" />
    </div>
</template>
