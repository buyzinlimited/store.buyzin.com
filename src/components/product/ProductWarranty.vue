<script setup>
import BaseInput from '../BaseInput.vue';


</script>

<template>
    <section class="bg-white rounded-x">
        <h2 class="font-medium border-b border-dashed px-4 py-4">
            Warranty & Refund
        </h2>

        <div class="px-4 py-2.5 space-y-4">
            <BaseInput label="Warranty" v-model="form.warranty" placeholder="Enter warranty period" />

            <BaseInput label="Refundable" v-model="form.refundable" placeholder="Is the product refundable?" />

            <BaseInput label="Conditions" v-model="form.conditions" placeholder="Enter product conditions" />

        </div>
    </section>
</template>


<style scoped></style>