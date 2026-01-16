import apiClient from "@/utils/axios";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    loading: false,
    errors: {},
    orders: [],
    order: [],
  }),

  getters: {},

  actions: {
    async all() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/v1/orders");
        if (response.status === 200) {
          this.orders = response.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse?.data?.errors);
        }
      } finally {
        this.loading = false;
      }
    },

    async show(order) {
      this.loading = true;
      try {
        const response = await apiClient.get(`/api/v1/orders/${order}`);
        if (response.status === 200) {
          this.order = response.data.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse?.data?.errors);
        }
      } finally {
        this.loading = false;
      }
    },

    async approved(order) {
      this.loading = true;
      try {
        const response = await apiClient.put(`/api/v1/orders/${order}/approve`);
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse?.data?.errors);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
