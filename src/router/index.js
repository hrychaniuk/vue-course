import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
/**
 * -----------
 * Route views
 * -----------
 */
import Home from "@/views/index.vue";
import loginRoute from "@/views/login.vue";

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
  // dispatch("translations/getAll", null, { root: true });

  if (
    to.matched.some(record => record.meta.notProtected) ||
    store.getters["auth/isLogin"]
  ) {
    return next();
  }

  store.dispatch("auth/login").then(
    () => {
      next();
    },
    () => {
      next("/login");
    }
  );
});

export default router;
