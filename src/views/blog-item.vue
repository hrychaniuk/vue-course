<template>
  <main>
    <div v-if="isLoader">
      <h1>{{ singleArticle.title }}</h1>
      <img width="500" :src="singleArticle.image[0]" alt="" />
      <router-link :to="'/'">
        {{ $t(`label.${_getTag(singleArticle.categs)}`) }}
      </router-link>
      <div v-html="singleArticle.intro"></div>
    </div>
  </main>
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
  created() {
    // now request in creaated
    // make in hook beforeRouteEnter
    setTimeout(() => {
      this.getArticleBySlug(this.$route.params.slug).then(() => {
        this.isLoader = true;
      });
    }, 2000);
  }
};
</script>
