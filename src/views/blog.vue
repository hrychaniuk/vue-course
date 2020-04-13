<template>
  <section>
    <div>
      <router-link
        :to="{ path: 'blog', query: { tag: tag.data.category } }"
        :key="tag.id"
        v-for="tag in tags"
      >
        Set {{ tag.data.category }} tag
      </router-link>
    </div>

    <h1>Tags</h1>
    <pre>{{ tags }}</pre>
    <h1>Articels</h1>
    <pre>{{ filteredArticles }}</pre>
  </section>
</template>

<script>
// import store from "@/store";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("blog", ["filteredArticles", "tags"])
  },
  watch: {
    // $route(to, from) {
    // console.log(from);
    // console.log(to);
    // }
  },
  beforeRouteUpdate(to, from, next) {
    // console.log(from);
    // console.log(to);
    next();
  },
  methods: {
    ...mapActions("blog", ["getArticlesByTag"]),
    setTag(tagId) {
      this.getArticlesByTag(tagId);
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(this.$route.query);

    this.getArticlesByTag().then(() => {
      /// ----> 1 day
      const el = this.tags.find(i => {
        return i.data.category === this.$route.query.tag;
      });
      const tagId = el && el.id ? el.id : null;
      this.getArticlesByTag(tagId);
    });
  }
};
</script>
