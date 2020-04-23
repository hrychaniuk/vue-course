import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { preloader } from "@/plugins/preloader";
import { getGlobalData } from "@/plugins/initial";
/**
 * -----------
 * Route views
 * -----------
 */
import Home from "@/views/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/blog.vue")

    // BlogList -> Local (BlogItem)
  },
  {
    path: "/blog/:slug",
    name: "blogitem",
    component: () => import("@/views/blog-item.vue")

    // local --> app.js min
    // global --> app.js(BlogItem)
  },
  { path: "/404", component: () => import("@/views/404.vue") },
  { path: "*", redirect: "/404" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  // await preloader.showWithDelay(300); // (0--------150--------300)
  if (
    to.matched.some(record => record.meta.notProtected) ||
    store.getters["auth/isLogin"]
  ) {
    preloader.hideWithDelay(400);
    return next();
  }
  await getGlobalData();

  store.dispatch("auth/login").then(
    () => {
      // alert(11);
      preloader.hide();
      next();
    },
    () => {
      preloader.hide();
      next("/login");
    }
  );
});

export default router;
