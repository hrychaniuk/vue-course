<template>
  <div class="acticles">
    <div class="container">
      <ul class="items">
        <ArticleItem
          :key="article.id"
          v-for="article in articles"
          v-bind="article"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item/article-item';
import { /*mapState,*/ mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('blog', {
      articles: 'exceptFirstArtices',
    }),
  },
  components: {
    ArticleItem,
  },
  created() {
    this.$store.dispatch('blog/getArticles');
  },
};
</script>

<style lang="scss" scoped>
@import 'article-list.scss';
</style>
