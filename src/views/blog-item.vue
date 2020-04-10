<template>
  <section v-if="isLoader">
    <h1>{{ singleArticle.title }}</h1>
    <img width="500" :src="singleArticle.image[0]" alt="" />
    <router-link :to="'/'">
      {{ $t(`label.${_getTag(singleArticle.categs)}`) }}
    </router-link>
    <div v-html="singleArticle.intro"></div>
  </section>
</template>

<script>
import { mutt } from "@/store/blog";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("blog", ["singleArticle"]) // < -- null --- waiting <-- data Article
  },
  data() {
    return {
      isLoader: false
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(`blog/${mutt.DEL_SINGLE_ARCTICLE}`);
    next();
  },
  methods: {
    ...mapActions("blog", ["getArticleBySlug"])
  },
  // beforeRouteEnter(/*to, from, next*/) {
  // store.dispatch('articles/getArticleBySlug', route.slug).then(next)
  // called before the route that renders this component is confirmed.
  // does NOT have access to `this` component instance,
  // because it has not been created yet when this guard is called!
  // next(vm => {})
  // },
  created() {
    // now request in creaated
    // make in hook beforeRouteEnter
    this.getArticleBySlug(this.$route.params.slug).then(() => {
      this.isLoader = true;
    });
  }
};
</script>
