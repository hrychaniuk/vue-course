<template>
  <div class="acticles">
    <div class="container">
      <ul class="items">
        <ArticleItem
          :key="article.id"
          v-for="article in articlesByTag"
          v-bind="article"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/article-item/article-item";

export default {
  props: ["tag", "ignoreFirst"],
  computed: {
    articlesByTag() {
      const articles = this.$store.state.blog.articleHome[
        this.tag.data.category
      ];
      if (this.ignoreFirst) return articles.splice(1);
      return articles;
    }
  },
  components: {
    ArticleItem
  }
};
</script>

<style lang="scss" scoped>
@import "article-list.scss";
</style>
