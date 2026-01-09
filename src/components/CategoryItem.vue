<script setup>
import { computed } from "vue";

const props = defineProps({
    category: {
        type: Object,
        required: true,
    },
    modelValue: {
        type: [Number, String, null],
        default: null,
    },
});

const emit = defineEmits(["update:modelValue"]);

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
        <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" class="accent-primary size-4" :value="category.id" v-model="selected" />
            <span>{{ category.name }}</span>
        </label>

        <!-- Children -->
        <div v-if="category.children?.length" class="pl-6 border-l-2 border-gray-200 space-y-2">
            <CategoryItem v-for="child in category.children" :key="child.id" :category="child" v-model="selected" />
        </div>
    </div>
</template>
