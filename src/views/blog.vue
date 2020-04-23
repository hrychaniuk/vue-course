<template>
  <!-- eslint-disable-next-line no-console -->
  <section>
    <div>
      <router-link :to="{ path: 'blog' }">
        Clear
      </router-link>
      <router-link
        :to="{ path: 'blog', query: { tag: tag.data.category } }"
        :key="tag.id"
        v-for="tag in tags"
      >
        Set {{ tag.data.category }} tag
      </router-link>
    </div>

    <h1>Articels</h1>
    <pre>{{
      filteredArticles.map(i => ({
        title: i.data.title,
        tag: _getTag(i.data.categs)
      }))
    }}</pre>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("blog", ["filteredArticles", "tags"])
  },
  beforeRouteUpdate(to, from, next) {
    this.articleRequest(to, next);
  },
  methods: {
    articleRequest(route, callback = () => {}) {
      this.getArtByTag({
        tagName: route.query.tag,
        isTagExist: "tag" in route.query
      }).then(callback);
    },
    ...mapActions("blog", ["getArtByTag"])
  },
  created() {
    // tag - no ----> get all articels
    // tag - yes && tag - valid ----> get articels with filter
    //
    // tag - yes && tag - novalid ----> 404
    // tag - yes && tag = undefined ----> 404

    this.articleRequest(this.$route);
  }
};
</script>
