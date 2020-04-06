<template>
  <main>
    <HomeBaner v-if="false" :tag="tagFirst" />
    <ArticleList v-if="isLoaded" :ignore-first="true" :tag="tagFirst" />

    <!-- ---- -->
    <div>123</div>
    <!-- ---- -->
    <div v-if="isLoaded">
      <ArticleList :key="i.id" :tag="i" v-for="i in tagExceptFirst" />
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import HomeBaner from "@/components/home-baner/home-baner";
import ArticleList from "@/components/article-list/article-list";

export default {
  name: "home",
  data() {
    return {
      isLoaded: false
    };
  },
  components: {
    HomeBaner,
    ArticleList
  },
  computed: mapGetters("blog", ["tagFirst", "tagExceptFirst"]),
  created() {
    this.$store.dispatch("blog/getArticlesForHome").then(() => {
      this.isLoaded = true;
    });
  }
};
</script>
