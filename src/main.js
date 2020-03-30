import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { i18n } from "@/plugins/i18n";
import "@/global-register";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

// Шо робити коли настроїв squidex + insomnia?
// Пошук по тегах
// а щоби на головній вивести все по тегах треба три запити робити?

// token in LocalStorage
