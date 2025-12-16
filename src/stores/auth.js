import apiClient from "@/utils/axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    errors: {},
    user: null,
    token: null,
  }),

  // persist: true,
  persist: {
    pick: ["user", "token"],
  },

  getters: {
    loggedIn: (state) => !!state.token,

    role: (state) => state.user?.role ?? null,
  },

  actions: {
    async login(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/auth/login", formData);
        if (response.status === 200) {
          this.token = response.data.token;
          this.user = response.data.user;
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors;
        }
        return Promise.reject(error.response);
      } finally {
        this.loading = false;
      }
    },

    async register(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/auth/register", formData);
        if (response.status === 201) {
        }
      } catch (error) {
        this.errors = error.response.data.errors;
      } finally {
        this.loading = false;
      }
    },

    async forgot(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/auth/forgot", formData);
        if (response.status === 200) {
        }
      } catch (error) {
        this.errors = error.response.data.errors;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        const response = await apiClient.post("/api/auth/logout");
        if (response.status === 200) {
          this.$reset();
          return navigateTo("/");
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
