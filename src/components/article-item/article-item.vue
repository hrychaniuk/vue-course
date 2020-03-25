<template>
  <li class="item">
    <article>
      <div class="img-box">
        <img class="img" :src="data.image ? data.image[0] : ''" alt="" />
      </div>
      <div class="content-box">
        <div class="info">
          <time :datetime="data.date">{{ data.date | formatDate }}</time>

          <router-link :to="'/'">
            {{ $t(`label.${_getTag(data.categs)}`) }}
          </router-link>
        </div>
        <h1>{{ data.title }}</h1>
        <div class="cms" v-html="data.intro"></div>

        <router-link :to="'/blog/' + data.slug">{{
          $t("global.article-more")
        }}</router-link>
      </div>
    </article>
  </li>
</template>

<script>
export default {
  props: ["id", "data"]
};
</script>

<style lang="scss" scoped>
// @import "@/assets/scss/settings.scss";
@import "article-item.scss";
</style>
