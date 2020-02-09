<template>
  <section v-if="singleArticle">
    <h1>{{ singleArticle.title }}</h1>
    <img width="500" :src="singleArticle.image[0]" alt="" />
    <router-link :to="'/'">
      {{ $t(`label.${_getTag(singleArticle.categs)}`) }}
    </router-link>
    <div v-html="singleArticle.intro"></div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('blog', ['singleArticle']),
  },
  methods: {
    ...mapActions('blog', ['getArticleBySlug']),
  },
  created() {
    this.getArticleBySlug(this.$route.params.slug);
  },
};
</script>
