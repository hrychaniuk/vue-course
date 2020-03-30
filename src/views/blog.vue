<template>
  <section>
    <div>
      <router-link
        :to="{ path: 'blog', query: { tag: tag.data.category } }"
        :key="tag.id"
        @click="setTag(tag.id)"
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
import { mutt } from "@/store/blog";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("blog", ["filteredArticles", "tags"])
  },
  methods: {
    ...mapActions("blog", ["getArticlesByTag"]),
    setTag(tagId) {
      this.getArticlesByTag(tagId);
    }
  },
  created() {
    console.log(mutt);
    this.getArticlesByTag().then(() => {
      /// ----> 1 day
      const el = this.tags.find(i => {
        return i.data.category === this.$route.query.tag;
      });
      const tagId = el && el.id ? el.id : null;
      this.getArticlesByTag(tagId);
    });
  }
  // beforeRouteEnter(to, from, next) {
  //   store.dispatch('blog/getArticlesByTag').then(() => {
  //     /// ----> 1 day
  //     const el = store.state.blog.tags.find(i => {
  //       return i.data.category === to.query.tag;
  //     });
  //     const tagId = el && el.id ? el.id : null;
  //     store.dispatch('blog/getArticlesByTag')(tagId);
  //     next();
  //   });
  // }
};
</script>
