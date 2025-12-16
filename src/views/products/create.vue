<script setup>
import Default from "@/layouts/Default.vue";
import { onMounted, reactive, ref } from "vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseTextarea from "@/components/BaseTextarea.vue";
import QuillEditor from "@/components/QuillEditor.vue";
import BaseInput from "@/components/BaseInput.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconRefresh from "@/components/icons/IconRefresh.vue";
import BaseFile from "@/components/BaseFile.vue";
import BaseMultipleFile from "@/components/BaseMultipleFile.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import CategoryCheckbox from "@/components/CategoryCheckbox.vue";
import { useBrandStore } from "@/stores/brand";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();

const categories = ref([]);
const selectedCategories = ref([]);

const loadCategories = async () => {
    const response = await categoryStore.all();
    categories.value = response.data;
}

const brands = ref([]);

const loadBrands = async () => {
    const response = await brandStore.all();
    brands.value = response.data;
}

const form = reactive({
    name: "Samsung Galaxy S24 Ultra",
    sku: "1053394",

    meta_title: "Samsung Galaxy S24 Ultra Price in Bangladesh",
    meta_description: "Buy Samsung Galaxy S24 Ultra with official warranty and fast delivery.",
    meta_keywords: "Samsung, Galaxy S24, Smartphone",
    canonical_url: "https://buyzin.com/products/samsung-galaxy-s24-ultra",

    categories: selectedCategories,
    brand_id: "1",
    store_id: "1",
    collection_id: null,

    overview: "Samsung Galaxy S24 Ultra flagship smartphone with premium features.",
    description: "<p>Experience next-level performance with Samsung Galaxy S24 Ultra.</p>",
    specifications: [
        {
            title: "Display",
            items: [
                { label: "Size", value: "6.8 inch" },
                { label: "Type", value: "Dynamic AMOLED 2X" }
            ]
        },
        {
            title: "Performance",
            items: [
                { label: "Processor", value: "Snapdragon 8 Gen 3" },
                { label: "RAM", value: "12GB" }
            ]
        }
    ],

    base_price: 25000,
    price: 22500,
    schedule_start: '2025-12-20',
    schedule_end: '2025-12-31',
    currency: "BDT",
    currency_symbol: "৳",
    exchange_rate: 1,

    has_attribute: true,
    attributes: [
        {
            "name": "Color",
            "options": ["Black", "Silver"]
        },
        {
            "name": "Storage",
            "options": ["256GB", "512GB"]
        }
    ],


    quantity: 50,
    stock: "in_stock",
    sold_count: 0,
    weight: 0.5,
    length: "165",
    width: "77",
    height: "8.6",

    is_shippable: true,
    cod_available: true,
    estimated_delivery: "3-5 business days",

    warranty: "1 Year Official Warranty",
    is_refundable: true,
    refund_policy: "7 days replacement warranty",
    conditions: "Product must be unused and in original packaging.",

    type: "simple",
    is_featured: true,
    is_trending: true,

    cover: null,
    gallery: [],
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "draft",
});



const generateSku = () => {
    form.sku = String(Math.floor(100000 + Math.random() * 900000));
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


/* === Attributes === */
const addOption = () => {
    form.attributes.push({
        name: "",
        options: [],
    });
};

const removeOption = (index) => {
    form.attributes.splice(index, 1);

    if (form.attributes.length === 0) {
        form.attributes.push({
            name: "",
            options: [],
        });
    }
};

const addValue = (attributeIndex, event) => {
    const value = event.target.value.trim();

    if (!value) return;

    const options = form.attributes[attributeIndex].options;

    if (!options.includes(value)) {
        options.push(value);
    }

    event.target.value = "";
};

const removeValue = (attributeIndex, optionIndex) => {
    form.attributes[attributeIndex].options.splice(optionIndex, 1);
};

const submit = async () => {
    const payload = new FormData();

    payload.append('name', form.name);
    payload.append('sku', String(form.sku));

    payload.append('meta_title', form.meta_title);
    payload.append('meta_description', form.meta_description);
    payload.append('meta_keywords', form.meta_keywords);
    payload.append('canonical_url', form.canonical_url);

    form.categories.forEach(id => {
        payload.append('categories[]', id);
    });

    if (form.brand_id) payload.append('brand_id', form.brand_id);
    if (form.store_id) payload.append('store_id', form.store_id);
    if (form.collection_id) payload.append('collection_id', form.collection_id);

    payload.append('overview', form.overview);
    payload.append('description', form.description);
    payload.append('specifications', JSON.stringify(form.specifications));

    payload.append('base_price', form.base_price);
    payload.append('price', form.price);

    if (form.schedule_start)
        payload.append('schedule_start', form.schedule_start);

    if (form.schedule_end)
        payload.append('schedule_end', form.schedule_end);

    if (form.currency) payload.append('currency', form.currency);
    if (form.currency_symbol) payload.append('currency_symbol', form.currency_symbol);
    if (form.exchange_rate) payload.append('exchange_rate', form.exchange_rate);

    payload.append('has_attribute', form.has_attribute ? 1 : 0);
    payload.append('attributes', JSON.stringify(form.attributes));

    payload.append('quantity', form.quantity);
    payload.append('stock', form.stock);
    payload.append('sold_count', form.sold_count);
    payload.append('weight', form.weight);
    payload.append('length', form.length);
    payload.append('width', form.width);
    payload.append('height', form.height);

    payload.append('is_shippable', form.is_shippable ? 1 : 0);
    payload.append('cod_available', form.cod_available ? 1 : 0);
    payload.append('estimated_delivery', form.estimated_delivery);

    payload.append('warranty', form.warranty);
    payload.append('is_refundable', form.is_refundable ? 1 : 0);

    if (form.is_refundable) {
        payload.append('refund_policy', form.refund_policy);
    }

    payload.append('conditions', form.conditions);

    payload.append('type', form.type);
    payload.append('is_featured', form.is_featured ? 1 : 0);
    payload.append('is_trending', form.is_trending ? 1 : 0);

    if (form.cover instanceof File) {
        payload.append('cover', form.cover);
    }

    form.gallery.forEach(file => {
        payload.append('gallery[]', file);
    });

    payload.append('video_url', form.video_url);
    payload.append('status', form.status);

    await productStore.store(payload);
};





onMounted(() => {
    loadCategories();
    loadBrands();
});

</script>

<template>
    <Default>
        <main class="w-full">
            <nav class="flex items-center justify-between mb-4">
                <h4 class="text-xl font-semibold">Add Product</h4>

                <div class="flex items-center gap-2">
                    <button type="button" @click="submit" :disabled="productStore.loading" class="base__button flex items-center justify-center gap-2
           disabled:opacity-50 disabled:cursor-not-allowed">

                        <svg v-if="productStore.loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>

                        <span>
                            {{ productStore.loading ? 'Saving...' : 'Save Change' }}
                        </span>
                    </button>

                    <RouterLink :to="{ name: 'products' }"
                        class="px-4 py-2 rounded-lg border text-sm hover:bg-gray-100">
                        View All
                    </RouterLink>
                </div>
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
                                        { label: 'Digital', value: 'digital' },
                                        { label: 'Service', value: 'service' },
                                    ]" />
                                    <BaseInput label="Base Price" type="number" placeholder="Enter base price"
                                        v-model="form.base_price" />

                                    <BaseInput label="Price" type="number" placeholder="Enter selling price"
                                        v-model="form.price" />

                                    <BaseInput label="Schedule Start" type="date" v-model="form.schedule_start" />
                                    <BaseInput label="Schedule End" type="date" v-model="form.schedule_end" />

                                    <BaseInput label="Quantity" type="number" v-model="form.quantity"
                                        placeholder="Enter quentity" />

                                    <BaseInput label="Sold Count" type="number" v-model="form.sold_count"
                                        placeholder="Enter sold count" />
                                    <BaseInput label="Weight (kg)" type="number" v-model="form.weight"
                                        placeholder="e.g. 1.25" />

                                    <BaseInput label="Length (cm)" type="number" v-model="form.length"
                                        placeholder="e.g. 30" />

                                    <BaseInput label="Width (cm)" type="number" v-model="form.width"
                                        placeholder="e.g. 20" />

                                    <BaseInput label="Height (cm)" type="number" v-model="form.height"
                                        placeholder="e.g. 10" />

                                </div>

                                <BaseInput label="Meta Title" v-model="form.meta_title"
                                    placeholder="Enter meta title" />
                                <BaseTextarea label="Meta Description" v-model="form.meta_description"
                                    placeholder="Enter meta description" />
                                <BaseTextarea label="Meta keywords" v-model="form.meta_keywords"
                                    placeholder="Enter meta keywords" />
                                <BaseInput label="Canonical url" type="url" v-model="form.canonical_url"
                                    placeholder="Enter Canonical url" />

                                <BaseTextarea label="Overview" v-model="form.overview"
                                    placeholder="Enter short overviw" />

                                <QuillEditor label="Description" v-model="form.description"
                                    placeholder="Enter product description..." />

                            </div>
                        </section>


                        <!-- Attributes -->
                        <section class="bg-white rounded-xl">
                            <div class="flex items-center justify-between px-4 py-4">
                                <h2 class="font-medium">Has Attributes</h2>

                                <label class="flex items-center gap-2 text-sm text-gray-700">
                                    <input v-model="form.has_attribute" type="checkbox" class="h-4 w-4" />
                                    This product has multiple Attributes
                                </label>
                            </div>

                            <div v-if="form.has_attribute" class="px-4 py-4 space-y-6">
                                <div v-for="(attribute, index) in form.attributes" :key="index"
                                    class="border rounded-xl p-4 space-y-4">
                                    <div class="flex items-center gap-3">
                                        <input v-model="attribute.name" placeholder="Name (e.g. Color, Size, Material)"
                                            class="w-48 form__control" />

                                        <input @keydown.enter.prevent="addValue(index, $event)"
                                            placeholder="Add values (press Enter)" class="form__control flex-1" />

                                        <button @click="removeOption(index)"
                                            class="ml-auto text-red-600 text-sm hover:underline">
                                            Remove
                                        </button>
                                    </div>

                                    <div class="flex flex-wrap gap-2">
                                        <span v-for="(option, optionIndex) in attribute.options" :key="optionIndex"
                                            class="flex items-center gap-2 bg-gray-100 px-3 py-1
                 rounded-full text-sm">
                                            {{ option }}
                                            <button @click="removeValue(index, optionIndex)">
                                                <IconClose class="size-4 text-red-600" />
                                            </button>
                                        </span>
                                    </div>
                                </div>

                                <button @click="addOption" class="base__button">
                                    Add option
                                </button>
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
                                        <button @click="removeSpec(specIndex)" type="button"
                                            class="bg-danger text-white p-2 rounded">
                                            <IconClose class="size-5" />
                                        </button>
                                    </div>

                                    <div v-for="(item, itemIndex) in spec.items" :key="itemIndex"
                                        class="flex items-center gap-2 space-y-2">
                                        <input type="text" v-model="item.label" placeholder="Label (e.g., Size)"
                                            class="form__control" />
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
                    </div>

                    <div class="flex-none w-80 space-y-4">
                        <!-- Visibility -->
                        <section class="bg-white rounded-xl">
                            <h2 class="font-medium border-b border-dashed px-4 py-4">
                                Published
                            </h2>

                            <div class="px-4 py-2.5">
                                <BaseSelect label="Status" v-model="form.status" :items="[
                                    { label: 'Public', value: 'public' },
                                    { label: 'Private', value: 'private' },
                                    { label: 'Draft', value: 'draft' },
                                    { label: 'Archived', value: 'archived' },
                                ]" />

                                <div class="flex items-center gap-2 mb-2">
                                    <input type="checkbox" v-model="form.is_shippable" id="shippable" class="h-4 w-4" />
                                    <label for="shippable" class="text-gray-700">Shippable</label>
                                </div>

                                <div class="flex items-center gap-2 mb-2">
                                    <input type="checkbox" v-model="form.cod_available" id="cod" class="h-4 w-4" />
                                    <label for="cod" class="text-gray-700">Cash on Delivery</label>
                                </div>

                                <div class="flex items-center gap-2 mb-2">
                                    <input type="checkbox" v-model="form.is_featured" id="cod" class="h-4 w-4" />
                                    <label for="is_featured" class="text-gray-700">Featured</label>
                                </div>

                                <div class="flex items-center gap-2 mb-2">
                                    <input type="checkbox" v-model="form.is_trending" id="cod" class="h-4 w-4" />
                                    <label for="is_trending" class="text-gray-700">Trending</label>
                                </div>

                                <div>
                                    <label class="block text-gray-700 mb-1">Estimated Delivery</label>
                                    <input type="text" v-model="form.estimated_delivery"
                                        placeholder="e.g. 3-5 business days"
                                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                </div>

                                <BaseInput label="Warranty" v-model="form.warranty"
                                    placeholder="Enter warranty period" />
                                <div class="group">
                                    <div class="flex items-center gap-2 mb-2">
                                        <input type="checkbox" v-model="form.is_refundable" id="is_refundable"
                                            class="h-4 w-4" />
                                        <label for="is_refundable" class="text-gray-700">Is Refundable</label>
                                    </div>
                                    <input type="text" v-if="form.is_refundable" v-model="form.refund_policy"
                                        class="form__control" placeholder="Is the product refundable?" />
                                </div>

                                <BaseInput label="Conditions" v-model="form.conditions"
                                    placeholder="Enter product conditions" />
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

                            <div class="px-4 py-2 space-y-3 max-h-80 overflow-y-auto scrollbar">
                                <div class="space-y-4">
                                    <CategoryCheckbox v-for="category in categories" :key="category.id"
                                        :category="category" v-model="selectedCategories" />
                                </div>
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
                            <div class="px-4 py-2 space-y-3 max-h-80 overflow-y-auto scrollbar">
                                <label v-for="brand in brands" :key="brand.id"
                                    class="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" :value="brand.id" v-model="form.brand_id"
                                        class="size-4 rounded border-gray-300" />
                                    <span>{{ brand.name }}</span>
                                </label>

                            </div>
                        </section>

                        <!-- Media -->
                        <section class="bg-white rounded-xl">
                            <h2 class="font-medium border-b border-dashed px-4 py-4">Media</h2>

                            <div class="px-4 py-2.5 space-y-4">
                                <input type="file" accept="image/*" @change="form.cover = $event.target.files[0]" />

                                <input type="file" accept="image/*" multiple
                                    @change="form.gallery = Array.from($event.target.files)" />
                                <!-- <BaseFile label="Cover" v-model="form.cover" :required="true" error="" />
                                <BaseMultipleFile label="Gallery" v-model="form.gallery" :required="true" error="" /> -->

                                <BaseInput label="Video URL" type="url" v-model="form.video_url"
                                    placeholder="https://www.youtube.com/watch?v=bTqVqk7FSmY" />


                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </main>
    </Default>
</template>

<style scoped></style>
