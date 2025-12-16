import apiClient from "@/utils/axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    loading: false,
    errors: {},
    products: [],
  }),

  getters: {},

  actions: {
    async all(page) {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/vendor/products", {
          params: {
            page: page,
          },
        });
        if (response.status === 200) {
          this.products = response.data;
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse.data.errors);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
