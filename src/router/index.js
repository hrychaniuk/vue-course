import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { preloader } from "@/plugins/preloader";
/**
 * -----------
 * Route views
 * -----------
 */
import Home from "@/views/index.vue";
import loginRoute from "@/views/login.vue";
import Test2 from "@/views/test2.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: loginRoute,
    meta: { notProtected: true }
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/blog.vue")

    // BlogList -> Local (BlogItem)
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test.vue")

    // BlogList -> Local (BlogItem)
  },
  {
    path: "/test2",
    name: "test",
    component: Test2

    // BlogList -> Local (BlogItem)
  },
  {
    path: "/blog/:slug",
    name: "blogitem",
    component: () => import("@/views/blog-item.vue")

    // local --> app.js min
    // global --> app.js(BlogItem)
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  console.time("XXX");
  await preloader.showWithDelay(300); // (0--------150--------300)
  console.timeEnd("XXX");

  if (
    to.matched.some(record => record.meta.notProtected) ||
    store.getters["auth/isLogin"]
  ) {
    preloader.hideWithDelay(400);
    return next();
  }

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
