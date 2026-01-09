<script setup>
import Default from "@/layouts/Default.vue";
import { onMounted, reactive, ref } from "vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseTextarea from "@/components/BaseTextarea.vue";
import QuillEditor from "@/components/QuillEditor.vue";
import BaseInput from "@/components/BaseInput.vue";
import IconClose from "@/components/icons/IconClose.vue";
import BaseFile from "@/components/BaseFile.vue";
import BaseMultipleFile from "@/components/BaseMultipleFile.vue";
import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import { useBrandStore } from "@/stores/brand";
import BaseButton from "@/components/BaseButton.vue";
import { useRoute } from "vue-router";


const route = useRoute();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();

const categories = ref([]);

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
    name: "",
    category_id: '',
    brand_id: '',

    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    canonical_url: "",

    overview: "",
    description: "",
    specifications: [],

    base_price: '',
    price: '',
    schedule_start: '',
    schedule_end: '',

    quantity: 10,
    sold_count: 0,
    weight: 0,
    length: "",
    width: "",
    height: "",

    cover: null,
    og_image: null,
    gallery: [],
    video_url: "",

    is_shippable: true,
    cod_available: true,
    estimated_delivery: "3-5 business days",

    warranty: "1 Year Official Warranty",
    is_refundable: true,
    refund_policy: "7 days replacement warranty",
    conditions: "Product must be unused and in original packaging.",

    is_featured: false,
    is_trending: false,
    status: "draft",
});


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


const loadProduct = async () => {
    const { data } = await productStore.show(route.params.id);
    console.log(data.overview)
    form.name = data.name;
    form.category_id = data.category?.id;
    form.brand_id = data.brand?.id;
    form.meta_title = data.meta_title;
    form.meta_description = data.meta_description;
    form.meta_keywords = data.meta_keywords;
    form.canonical_url = data.canonical_url;
    form.overview = data.overview;
    form.description = data.description;
    form.specifications = data.specifications;
    form.base_price = data.base_price;
    form.price = data.price;
    form.schedule_start = data.schedule_start;
    form.schedule_end = data.schedule_end;
    form.quantity = data.quantity;
    form.sold_count = data.sold_count;
    form.weight = data.weight;
    form.length = data.length;
    form.width = data.width;
    form.height = data.height;
    form.cover = data.cover_url;
    form.og_image = data.og_image_url;
    form.gallery = data.gallery;
    form.video_url = data.video_url;
    form.is_shippable = data.is_shippable;
    form.cod_available = data.cod_available;
    form.is_featured = data.is_featured;
    form.is_trending = data.is_trending;
    form.estimated_delivery = data.estimated_delivery;
    form.warranty = data.warranty;
    form.is_refundable = data.is_refundable;
    form.refund_policy = data.refund_policy;
    form.conditions = data.conditions;
    form.status = data.status;
}

const submit = async () => {
    const payload = new FormData();
    payload.append('_method', 'PUT');
    payload.append('name', form.name);
    if (form.category_id) payload.append('category_id', form.category_id);
    if (form.brand_id) payload.append('brand_id', form.brand_id);

    payload.append('meta_title', form.meta_title);
    payload.append('meta_description', form.meta_description);
    payload.append('meta_keywords', form.meta_keywords);
    payload.append('canonical_url', form.canonical_url);

    payload.append('overview', form.overview);
    payload.append('description', form.description);
    payload.append('specifications', JSON.stringify(form.specifications));

    payload.append('base_price', form.base_price);
    payload.append('price', form.price);

    if (form.schedule_start)
        payload.append('schedule_start', form.schedule_start);

    if (form.schedule_end)
        payload.append('schedule_end', form.schedule_end);

    payload.append('quantity', form.quantity);
    payload.append('sold_count', form.sold_count);
    payload.append('weight', form.weight);
    payload.append('length', form.length);
    payload.append('width', form.width);
    payload.append('height', form.height);

    if (form.cover instanceof File) {
        payload.append('cover', form.cover);
    }
    if (form.og_image instanceof File) {
        payload.append('og_image', form.og_image);
    }
    form.gallery.forEach(file => {
        payload.append('gallery[]', file);
    });
    payload.append('video_url', form.video_url);

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
    payload.append('status', form.status);

    await productStore.update(route.params.id, payload);
};

onMounted(() => {
    loadCategories();
    loadBrands();
    loadProduct();
});

</script>

<template>
    <Default>
        <main class="w-full">
            <nav class="flex items-center justify-between mb-4">
                <h4 class="text-xl font-semibold">Edit Product</h4>
                <RouterLink :to="{ name: 'products' }"
                    class="bg-primary text-white px-4 py-2 rounded-lg border text-sm ">
                    All Products
                </RouterLink>
            </nav>

            <div class="py-2.5 space-y-4">
                <form @submit.prevent="submit" enctype="multipart/form-data">
                    <div class="flex flex-wrap items-start gap-4">
                        <div class="flex-1 space-y-4">
                            <section class="bg-white rounded-xl">
                                <h2 class="font-medium border-b border-dashed px-4 py-4">
                                    Product Info
                                </h2>

                                <div class="px-4 py-2.5 space-y-4">
                                    <BaseInput label="Product Name" v-model="form.name" :required="true" />

                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="form__group">
                                            <label class="form__label">Categories</label>
                                            <select v-model="form.category_id" class="form__control">
                                                <option value="" disabled="">Select Categories</option>

                                                <template v-for="category in categories" :key="category.id">
                                                    <!-- Parent -->
                                                    <option :value="category.id">
                                                        {{ category.name }}
                                                    </option>

                                                    <!-- Children -->
                                                    <template v-for="child in category.children" :key="child.id">
                                                        <option :value="child.id">
                                                            -- {{ child.name }}
                                                        </option>

                                                        <!-- child -->
                                                        <option v-for="item in child.children" :key="item.id"
                                                            :value="item.id">
                                                            --- {{ item.name }}
                                                        </option>
                                                    </template>
                                                </template>
                                            </select>
                                        </div>

                                        <div class="form__group">
                                            <label class="form__label">Brands</label>
                                            <select v-model="form.brand_id" class="form__control">
                                                <option value="" disabled="">Select Brands</option>
                                                <template v-for="brand in brands" :key="brand.id">
                                                    <option :value="brand.id">
                                                        {{ brand.name }}
                                                    </option>
                                                </template>
                                            </select>
                                        </div>
                                    </div>

                                    <BaseInput label="Meta Title" v-model="form.meta_title"
                                        placeholder="Enter meta title" />
                                    <BaseTextarea label="Meta Description" v-model="form.meta_description"
                                        placeholder="Enter meta description" />
                                    <BaseTextarea label="Meta keywords" v-model="form.meta_keywords"
                                        placeholder="Enter meta keywords" />

                                    <div>
                                        <BaseInput label="Canonical url" v-model="form.canonical_url"
                                            placeholder="e.g. wireless-bluetooth-headphone" error="" />
                                        <small class="text-muted">https://example.com/{{ form.canonical_url
                                            }}</small>
                                    </div>

                                    <QuillEditor label="Overview" v-model="form.overview"
                                        placeholder="Enter short overviw" />

                                    <QuillEditor label="Description" v-model="form.description"
                                        placeholder="Enter product description..." />
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
                                            <input type="text" v-model="item.value"
                                                placeholder="Value (e.g., 6.67 inches)" class="form__control" />
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

                            <!-- pricing -->
                            <section class="bg-white rounded-xl">
                                <h2 class="font-medium border-b border-dashed px-4 py-4">Pricing</h2>

                                <div class="px-4 py-2.5 space-y-4">
                                    <div class="grid grid-cols-2 gap-3">
                                        <BaseInput label="Base Price" type="number" placeholder="Enter base price"
                                            v-model="form.base_price" />

                                        <BaseInput label="Selling Price" type="number" placeholder="Enter selling price"
                                            v-model="form.price" />

                                        <BaseInput label="Schedule Start" type="date" v-model="form.schedule_start" />
                                        <BaseInput label="Schedule End" type="date" v-model="form.schedule_end" />
                                    </div>
                                </div>
                            </section>

                            <!-- Shipping and Delivery -->
                            <section class="bg-white rounded-xl">
                                <h2 class="font-medium border-b border-dashed px-4 py-4">Shipping and Delivery</h2>

                                <div class="px-4 py-2.5 space-y-4">
                                    <div class="grid grid-cols-2 gap-3">
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
                                </div>
                            </section>

                            <!-- Media -->
                            <section class="bg-white rounded-xl">
                                <h2 class="font-medium border-b border-dashed px-4 py-4">Media</h2>
                                <div class="px-4 py-2.5 space-y-4">
                                    <div class="grid grid-cols-2 gap-2">
                                        <BaseFile label="Cover )" v-model="form.cover" :required="true" error="" />
                                        <BaseFile label="OG Image" v-model="form.og_image" :required="true" error="" />
                                    </div>
                                    <BaseMultipleFile label="Gallery" v-model="form.gallery" :required="true"
                                        error="" />
                                    <BaseInput label="Video URL" type="url" v-model="form.video_url"
                                        placeholder="https://www.youtube.com/watch?v=bTqVqk7FSmY" />
                                </div>
                            </section>

                            <!-- Visibility -->
                            <section class="bg-white rounded-xl">
                                <h2 class="font-medium border-b border-dashed px-4 py-4">
                                    Published
                                </h2>

                                <div class="px-4 py-2.5">

                                    <div class="flex items-center gap-2 mb-2">
                                        <input type="checkbox" v-model="form.is_shippable" id="shippable"
                                            class="h-4 w-4" />
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

                                    <BaseTextarea label="Conditions" v-model="form.conditions"
                                        placeholder="Enter product conditions" />

                                    <BaseSelect label="Status" v-model="form.status" :items="[
                                        { label: 'Public', value: 'public' },
                                        { label: 'Draft', value: 'draft' },
                                    ]" />
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="text-center">
                        <BaseButton :loading="false">Save Change</BaseButton>
                    </div>
                </form>
            </div>
        </main>
    </Default>
</template>

<style scoped></style>
