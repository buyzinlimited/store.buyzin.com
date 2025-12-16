<script setup>
import { computed } from "vue";

const props = defineProps({
    category: {
        type: Object,
        required: true,
    },
    modelValue: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

// computed proxy for v-model
const selected = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>


<template>
    <div class="space-y-2">
        <label class="flex items-center justify-between cursor-pointer">
            <div class="flex items-center space-x-2">
                <input type="checkbox" class="accent-primary size-4 rounded border-gray-300" :value="category.id"
                    v-model="selected" />
                <span class="font-normal">{{ category.name }}</span>
            </div>
        </label>

        <!-- Children -->
        <div v-if="category.children?.length" class="pl-6 border-l-2 border-gray-200 space-y-2">
            <CategoryCheckbox v-for="child in category.children" :key="child.id" :category="child" v-model="selected" />
        </div>
    </div>
</template>
