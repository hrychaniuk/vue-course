<template>
  <div>
    <section v-if="article">
      <div class="item img-box">
        <img
          class="img"
          :src="article.data.image ? article.data.image[0] : ''"
          alt=""
        />
      </div>
      <div class="item content-box">
        <div class="info">
          <time :datetime="article.data.date">{{
            article.data.date | formatDate
          }}</time>

          <router-link :to="'/'">
            {{ getTag(article.data.categs) }}
          </router-link>
        </div>
        <h1>{{ article.data.title }}</h1>
        <div class="cms" v-html="article.data.intro"></div>
        <router-link :to="'/blog/' + article.data.slug"
          >Дізнатись більше</router-link
        >
      </div>
    </section>

    <pre v-if="article">{{ getTag(article.data.categs) }}</pre>
  </div>
</template>

<script>
import { /*mapState,*/ mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('blog', {
      getTagById: 'getTagById',
      article: 'firstArtice',
    }),
  },
  methods: {
    getTag(categories) {
      const result = this.getTagById(categories[0]);
      if (!result) return '';

      return result.data.category;
    },
  },
  created() {
    this.$store.dispatch('blog/getArticles');
  },
};
</script>

<style lang="scss">
@import 'home-baner.scss';
</style>
