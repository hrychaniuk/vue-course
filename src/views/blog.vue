<template>
  <section>
    <div>
      <router-link
        :to="{ path: 'blog', query: { tag: tag.data.category } }"
        :key="tag.id"
        v-for="tag in tags"
      >
        Set {{ tag.data.category }} tag
      </router-link>
    </div>
    <h1>Tags</h1>
    <pre>{{ tags }}</pre>
    <h1>Articels</h1>
    <pre>{{ filteredArticles }}</pre>
  </section>
</template>

<script>
// import store from "@/store";
import { mutt } from "@/store/blog";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("blog", ["filteredArticles", "tags"])
  },
  // watch: {
  //   $router() {
  //     console.log(123);
  //   }
  // },
  // beforeRouteUpdate (to, from, next) {
  // вызывается когда маршрут, что рендерит этот компонент изменился,
  // но этот компонент будет повторно использован в новом маршруте.
  // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
  // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
  // будет использован повторно, и этот хук будет вызван когда это случится.
  // Также имеется доступ в `this` к экземпляру компонента.
  // },
  methods: {
    ...mapActions("blog", ["getArticlesByTag"]),
    setTag(tagId) {
      this.getArticlesByTag(tagId);
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(mutt);

    this.getArticlesByTag().then(() => {
      /// ----> 1 day
      const el = this.tags.find(i => {
        return i.data.category === this.$route.query.tag;
      });
      const tagId = el && el.id ? el.id : null;
      this.getArticlesByTag(tagId);
    });
  }
};
</script>
