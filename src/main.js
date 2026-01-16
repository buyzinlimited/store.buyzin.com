import "./assets/main.css";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import { Vueginate } from "vueginate";
import "vueginate/css/vueginate.css";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Toast, {
  timeout: 2000,
  position: POSITION.TOP_CENTER,
});

app.config.globalProperties.$date = (
  dateString,
  options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }
) => {
  if (!dateString) return "";

  const date = new Date(dateString.replace(" ", "T"));

  return new Intl.DateTimeFormat("en-GB", options).format(date);

  // $date(order.created_at, {
  //   year: "numeric",
  //   month: "short",
  //   day: "2-digit",
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });
};
app.component("Pagination", Vueginate);
app.component("QuillEditor", QuillEditor);
app.mount("#app");
