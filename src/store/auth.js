import { http } from '@/plugins/http';

const mutt = {
  SET_TOKEN: 'SET_TOKEN',
  SET_AUTH_ERROR: 'SET_AUTH_ERROR',
};

export default {
  namespaced: true,
  state: {
    token: localStorage.token || null,
    error: null,
  },
  mutations: {
    [mutt.SET_TOKEN](state, token) {
      state.token = token;
    },
    [mutt.SET_AUTH_ERROR](state, error) {
      state.error = error;
    },
  },
  actions: {
    login({ commit }) {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        body.set('grant_type', 'client_credentials');
        body.set('client_id', 'logos:reader');
        body.set('scope', 'squidex-api');
        body.set(
          'client_secret',
          'tb0rmhmrm8cz6lcgel69adsy5fiuxgpxawqm5ovaxdcx',
        );

        http.post('/identity-server/connect/token', body).then(
          r => {
            const token = r.data.access_token;
            localStorage.token = token;
            http.defaults.headers.common['Authorization'] = token;
            commit(mutt.SET_TOKEN, token);
            resolve(r.data);
          },
          ({ response }) => {
            commit(mutt.SET_AUTH_ERROR, response.data);
            reject(response.data);
          },
        );
      });
    },
  },
  getters: {
    isLogin(state) {
      return !!state.token;
    },
  },
};
