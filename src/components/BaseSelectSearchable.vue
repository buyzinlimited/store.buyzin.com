<script setup>
import apiClient from "@/utils/axios";
import { ref, watch, onMounted } from "vue";

const props = defineProps({
    label: String,
    modelValue: [String, Number],
    url: String,
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    error: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const search = ref("");
const items = ref([]);
const isOpen = ref(false);

let debounceTimeout = null;

// Fetch items from API
const loadItems = async (query = "") => {
    if (!props.url) return;
    try {
        const response = await apiClient.get(props.url, { params: { query } });
        items.value = response?.data?.data || [];
    } catch (err) {
        console.error("Error loading items:", err);
        items.value = [];
    }
};

// Debounce API call on typing
watch(
    search,
    (val) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            loadItems(val);
        }, 300);
    }
);

// Select an item
const selectItem = (item) => {
    emit("update:modelValue", item.id);
    search.value = item.name;
    isOpen.value = false;
};

// Filter items locally
const filteredItems = () => {
    if (!search.value) return items.value;
    return items.value.filter((i) =>
        i.name.toLowerCase().includes(search.value.toLowerCase())
    );
};

// Sync modelValue with input
watch(
    () => props.modelValue,
    (val) => {
        const selected = items.value.find((i) => i.id === val);
        search.value = selected ? selected.name : "";
    },
    { immediate: true }
);

onMounted(() => {
    loadItems(); // default load
});
</script>

<template>
    <div class="relative mb-3">
        <label v-if="label" class="block text-gray-700 font-medium">{{ label }}</label>

        <input type="text" v-model="search" @focus="isOpen = true" @blur="isOpen = false"
            :placeholder="props.placeholder" class="w-full border rounded-md px-4 py-1.5 focus:outline-none"
            :class="error ? 'border-red-500' : 'border-gray-300'" />

        <ul v-if="isOpen && filteredItems().length"
            class="absolute z-10 w-full bg-white border border-gray-300 rounded max-h-60 overflow-auto mt-1">
            <li v-for="item in filteredItems()" :key="item.id" @mousedown.prevent="selectItem(item)"
                class="px-3 py-1.5 cursor-pointer hover:bg-cyan-100">
                {{ item.name }}
            </li>
        </ul>

        <small v-if="error" class="text-red-500 mt-1 block">{{ error[0] }}</small>
    </div>
</template>
