import { http } from "@/plugins/http";
import Vue from "vue";

// Vue.set
// this.$set

const mutt = {
  SET_FILT_ARTICLES: "SET_FILT_ARTICLES",
  SET_SINGLE_ARCTICLE: "SET_SINGLE_ARCTICLE",
  DEL_SINGLE_ARCTICLE: "DEL_SINGLE_ARCTICLE",
  SET_ARTICLES: "SET_ARTICLES",
  SET_TAGS: "SET_TAGS",
  SET_LOADED: "SET_LOADED"
};

export { mutt };

export default {
  namespaced: true,
  state: {
    articles: [],
    filteredArticles: [],
    tags: null,
    singleArticle: null,
    loaded: false,
    ///
    blogs: {
      new: [1, 2, 3],
      hot: [1, 2, 3]
      // popular: [...]
    }
  },
  mutations: {
    SET_BLOG_TAG(state) {
      Vue.set(state.blogs, "popular", [4, 5, 6]);
    },
    [mutt.SET_FILT_ARTICLES](state, articles) {
      state.filteredArticles = articles;
    },
    [mutt.SET_ARTICLES](state, articles) {
      state.articles = articles;
    },
    [mutt.SET_TAGS](state, tags) {
      state.tags = tags;
    },
    [mutt.SET_LOADED](state) {
      state.loaded = true;
    },
    [mutt.DEL_SINGLE_ARCTICLE](state) {
      state.singleArticle = null;
    },
    [mutt.SET_SINGLE_ARCTICLE](state, value) {
      state.singleArticle = value;
    }
  },
  actions: {
    getTags({ commit }) {
      return new Promise((resolve, reject) => {
        http.get("/api/content/logos/article-categories").then(
          r => {
            commit(mutt.SET_TAGS, r.data.items);
            resolve(r.data);
          },
          ({ response }) => {
            reject(response.data);
          }
        );
      });
    },
    getArticles({ commit, state, dispatch }) {
      if (state.loaded) return;

      commit(mutt.SET_LOADED);
      return Promise.all([
        new Promise((resolve, reject) => {
          http.get("/api/content/logos/articles").then(
            r => {
              commit(mutt.SET_ARTICLES, r.data.items);
              resolve(r.data);
            },
            ({ response }) => {
              reject(response.data);
            }
          );
        }),
        dispatch("getTags")
      ]);
    },
    getArticleBySlug({ commit }, slug) {
      return new Promise((resolve, reject) => {
        http
          .get("/api/content/logos/articles", {
            params: {
              $filter: `data/slug/iv eq '${slug}'`
            }
          })
          .then(
            r => {
              commit(
                mutt.SET_SINGLE_ARCTICLE,
                r.data.items[0] ? r.data.items[0].data : null
              );
              resolve(r.data);
            },
            ({ response }) => {
              reject(response.data);
            }
          );
      });
    },
    getArticlesByTag({ commit, dispatch }, tagId) {
      const objectWithSettings = tagId
        ? {
            params: {
              $filter: `data/categs/iv eq '${tagId}'`
            }
          }
        : null;
      return Promise.all([
        (new Promise((resolve, reject) => {
          http.get("/api/content/logos/articles", objectWithSettings).then(
            r => {
              commit(mutt.SET_FILT_ARTICLES, r.data.items);
              resolve(r.data);
            },
            ({ response }) => {
              reject(response.data);
            }
          );
        }),
        dispatch("getTags"))
      ]);
    }
  },
  getters: {
    getTagById(state) {
      return function(id) {
        return state.tags.find(i => i.id === id);
      };
    },
    articlesCount(state) {
      return state.articles.length;
    },
    firstArtice(state) {
      return state.articles[0] || null;
    },
    exceptFirstArtices(state) {
      return state.articles.splice(1) || [];
    }
  }
};
