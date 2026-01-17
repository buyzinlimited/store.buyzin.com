<script setup>
import IconGroup from '@/components/icons/IconGroup.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import IconPayouts from '@/components/icons/IconPayouts.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconShoppingCart from '@/components/icons/IconShoppingCart.vue';
import IconStore from '@/components/icons/IconStore.vue';

const props = defineProps({
    open: Boolean,
});

const emit = defineEmits(["close"]);


const logout = async () => {
    await authStore.logout();
}

</script>

<template>
    <aside class="fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)]
           bg-white border-r overflow-y-auto
           transform transition-transform duration-300
           md:translate-x-0" :class="open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'">

        <nav class="p-3 space-y-1 text-sm font-medium">
            <RouterLink to="/" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
                <IconHome class="size-5" />
                Dashboard
            </RouterLink>

            <RouterLink to="/products" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
                <IconStore class="size-5" />
                Products
            </RouterLink>

            <RouterLink to="/orders" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
                <IconShoppingCart class="size-5" />
                Orders
            </RouterLink>

            <RouterLink to="/customers" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
                <IconGroup class="size-5" />
                Customers
            </RouterLink>

            <RouterLink to="/payouts" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
                <IconPayouts class="size-5" />
                Payouts
            </RouterLink>

            <RouterLink to="/settings" class="flex items-center gap-3 px-4 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 hover:text-gray-900" active-class="bg-gray-200 text-gray-900">
                <IconSettings class="size-5" />
                Settings
            </RouterLink>

            <hr class="my-3" />

            <button @click="logout" class="w-full flex items-center gap-3 px-4 py-2 rounded-lg
               text-red-600 hover:bg-red-50">
                <IconLogout class="size-5" />
                Logout
            </button>
        </nav>
    </aside>
</template>

<style scoped></style>
