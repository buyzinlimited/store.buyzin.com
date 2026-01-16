<script setup>
import Loading from "@/components/Loading.vue";
import NotFound from "@/components/NotFound.vue";
import Default from "@/layouts/Default.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const loadUsers = async () => {
    await userStore.all();
}

onMounted(() => {
    loadUsers();
});
</script>

<template>
    <Default>
        <div class="card">
            <div class="card__header">
                <h3 class="card__title">Customers</h3>
            </div>

            <template v-if="userStore.loading">
                <Loading />
            </template>
            <template v-else-if="users.data">
                <div class="card__body">
                    <table>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th class="text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="user in users.data">
                                <td>
                                    <img :src="user.photo_url" :alt="user.name" class="size-10 rounded-full" />
                                </td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.phone }}</td>
                                <td>{{ user.email ?? 'N/A' }}</td>
                                <td>
                                    <span v-if="user.disabled" class="badge badge__danger">Disable</span>
                                    <span v-else class="badge badge__success">Enable</span>
                                </td>
                                <td class="text-right ">
                                    <div class="flex items-center justify-end gap-2">
                                        <RouterLink to="#" class="action__info">
                                            View
                                        </RouterLink>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Pagination v-if="users.meta" class="px-4 py-6" :total-items="users.meta.total"
                        :current-page="users.meta.current_page" :items-per-page="users.meta.per_page" :pages-to-show="2"
                        @page-change="loadUsers" visible-always />

                </div>
            </template>
            <template v-else>
                <NotFound />
            </template>
        </div>
    </Default>
</template>

<style scoped></style>
