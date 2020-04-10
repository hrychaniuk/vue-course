import { http } from "@/plugins/http";

export default {
  namespaced: true,
  state: {
    cars: [],
    models: []
  },
  mutations: {
    mutation_cars(state, car_arrays) {
      state.cars = car_arrays;
    },
    mutation_models(state, model_arrays) {
      state.models = model_arrays;
    }
  },
  actions: {
    getModel({ commit }) {
      return http.get("/api/content/logos/car-types").then(
        r => {
          commit("mutation_models", r.data.items);
        },
        () => {
          throw new Error();
        }
      );
    },
    getCars({ commit }) {
      return http.get("/api/content/logos/cars").then(
        r => {
          commit("mutation_cars", r.data.items);
        },
        () => {
          throw new Error();
        }
      );
    }
    // getCars({ commit, dispatch }) {
    //   return dispatch("getModel").then(() => {
    //     return http.get("/api/content/logos/cars").then(
    //       r => {
    //         commit("mutation_cars", r.data.items);
    //       },
    //       () => {
    //         throw new Error();
    //       }
    //     );
    //   });
    // }
  }
};
