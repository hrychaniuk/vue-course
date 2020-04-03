<template>
  <main>
    <pre>{{ blogs }}</pre>

    <button @click="$store.commit('blog/SET_BLOG_TAG')">Call mutation</button>

    <hr />
    <hr />
    <home-baner />
    <ArticleList />
    <!-- -- -->
    <!-- <ArticleList :tag="i" v-for="i in categories.slice(1)"/> -->
  </main>
</template>

<script>
import HomeBaner from "@/components/home-baner/home-baner";
import ArticleList from "@/components/article-list/article-list";

export default {
  name: "home",
  components: {
    HomeBaner,
    ArticleList
  },
  computed: {
    blogs() {
      return this.$store.state.blog.blogs;
    }
  },
  data() {
    return {
      categories: ["hot", "news", "pops"]
    };
  }
};
</script>
