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

// production (CI/CD) --> logos.com
// master (CI/CD) --> staging + bugs (heroku.app.1234.com)
// develop

// develop <- feature/header-view
// develop <- feature/auth-module

// Шо робити коли настроїв squidex + insomnia?
// Пошук по тегах
// а щоби на головній вивести все по тегах треба три запити робити?
// На банерах є стаття, виходить вона однакова , тобто глобальний компонент
// А запити на дані треба робити кожен раз?
// а назви компонент з великої букви?)
// а можна динамічно міняти мутації? бо в тому модулі що фільтрує по тегу статично прописана мутація і данні дублюються потім бо зсилаються на один масив.
// token in LocalStorage
