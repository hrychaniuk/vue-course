<template>
  <main>
    <HomeBaner />
    <ArticleList />
  </main>
</template>

<script>
import HomeBaner from '@/components/home-baner/home-baner';
import ArticleList from '@/components/article-list/article-list';

export default {
  name: 'home',
  components: {
    HomeBaner,
    ArticleList,
  },
};
</script>
