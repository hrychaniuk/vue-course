import { http } from '@/plugins/http';

const mutt = {
  SET_ARTICLES: 'SET_ARTICLES',
  SET_TAGS: 'SET_TAGS',
  SET_LOADED: 'SET_LOADED',
};

export default {
  namespaced: true,
  state: {
    articles: [],
    tags: [],
    loaded: false,
  },
  mutations: {
    [mutt.SET_ARTICLES](state, articles) {
      state.articles = articles;
    },
    [mutt.SET_TAGS](state, tags) {
      state.tags = tags;
    },
    [mutt.SET_LOADED](state) {
      state.loaded = true;
    },
  },
  actions: {
    getTags({ commit }) {
      return new Promise((resolve, reject) => {
        http.get('/api/content/logos/article-categories').then(
          r => {
            commit(mutt.SET_TAGS, r.data.items);
            resolve(r.data);
          },
          ({ response }) => {
            reject(response.data);
          },
        );
      });
    },
    getArticles({ commit, state, dispatch }) {
      if (state.loaded) return;
      
      commit(mutt.SET_LOADED);
      return Promise.all([
        new Promise((resolve, reject) => {
          http.get('/api/content/logos/articles').then(
            r => {
              commit(mutt.SET_ARTICLES, r.data.items);
              resolve(r.data);
            },
            ({ response }) => {
              reject(response.data);
            },
          );
        }),
        dispatch('getTags'),
      ]);
    },
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
    },
  },
};
