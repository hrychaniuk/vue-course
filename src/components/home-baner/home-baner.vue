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
            {{ $t(`label.${_getTag(article.data.categs)}`) }}
          </router-link>
        </div>
        <h1>{{ article.data.title }}</h1>
        <div class="cms" v-html="article.data.intro"></div>
        <router-link :to="'/blog/' + article.data.slug"
          >Дізнатись більше</router-link
        >
      </div>
      <pre>{{ totalCountCars }}</pre>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("blog", {
      getTagById: "getTagById",
      article: "firstArtice"
    })
  },
  created() {
    this.$store.dispatch("blog/getArticles");
    // this.$store.dispatch("cars/getCars");
  }
};
</script>

<style lang="scss" scoped>
@import "home-baner.scss";
</style>
