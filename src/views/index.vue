<template>
  <main>
    <HomeBaner :tag="categories[0]" />
    <ArticleList :tag="categories[0]" />
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
  data() {
    return {
      categories: ["hot", "news", "pops"]
    };
  }
};
</script>
