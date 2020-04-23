/* eslint-disable no-unused-vars */
import { http } from "@/plugins/http";
import Vue from "vue";
import router from "@/router";

const mutt = {
  SET_HOME_ARTICLES: "SET_HOME_ARTICLES",
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
    articleHome: {
      // hot: [1,2,3,4],
      // news: [1,2,3]
    },
    //
    articles: [],
    filteredArticles: [],
    tags: [],
    singleArticle: null,
    loaded: false
  },
  mutations: {
    [mutt.SET_HOME_ARTICLES](state, { tag, data }) {
      Vue.set(state.articleHome, tag, data);
    },
    //
    //
    //
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
    getTags({ state, commit }) {
      if (state.tags.length) return Promise.resolve();

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
              const data = r.data.items[0];
              if (data) {
                commit(mutt.SET_SINGLE_ARCTICLE, r.data.items[0].data);
              } else {
                router.replace("/404");
              }
              resolve(r.data);
            },
            ({ response }) => {
              reject(response.data);
            }
          );
      });
    },
    setArticlesWithTag({ state, commit }) {
      const allRequestForTags = state.tags.map((tag, i) => {
        return new Promise((resolve, reject) => {
          // console.log(tag);

          const objectWithSettings = {
            params: {
              $filter: `data/categs/iv eq '${tag.id}'`,
              $top: !i ? 4 : 3
            }
          };
          http.get("/api/content/logos/articles", objectWithSettings).then(
            r => {
              commit(mutt.SET_HOME_ARTICLES, {
                data: r.data.items,
                tag: tag.data.category
              });
              resolve();
            },
            ({ response }) => {
              reject(response.data);
            }
          );
        });
      });

      return Promise.all(allRequestForTags);
    },
    getArticlesForHome({ dispatch }) {
      return dispatch("getTags").then(() => {
        return dispatch("setArticlesWithTag");
      });
    },
    //
    //
    //
    //
    //
    getArtByTag({ state, commit, dispatch }, { tagName, isTagExist }) {
      return dispatch("getTags").then(() => {
        const findTag = state.tags.find(i => i.data.category === tagName);
        if (!findTag && isTagExist) return router.replace("/404");

        // - tag exist and valid || tag is not exist

        const getQueryData = () => {
          return isTagExist
            ? {
                params: {
                  $filter: `data/categs/iv eq '${findTag.id}'`
                }
              }
            : null;
        };

        return new Promise((resolve, reject) => {
          http.get("/api/content/logos/articles", getQueryData()).then(
            r => {
              commit(mutt.SET_FILT_ARTICLES, r.data.items);
              resolve(r.data);
            },
            ({ response }) => {
              reject(response.data);
            }
          );
        });
      });
    }
  },
  //
  //
  //
  //
  //
  //
  //
  getters: {
    tagFirst(state) {
      return state.tags[0] || null;
    },
    tagExceptFirst(state) {
      return /* [1] */ state.tags.slice(1) /* [2, 3] */ || [];
    },
    getTagById(state) {
      return function(id) {
        return state.tags.find(i => {
          // console.log(i.id, id);
          return i.id === id;
        });
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
