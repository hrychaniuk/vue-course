<template>
  <main>
    <article>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo consectetur
      iusto, a esse voluptatibus necessitatibus incidunt facere? Doloribus
      consectetur itaque fugit distinctio inventore, sequi iste. Illum
      praesentium excepturi dicta enim.t consectetur adipisicing elit. Nemo
      consectetur iusto, a esse voluptatibus necessitatibus incidunt facere?
      Doloribus consectetur itaque fugit distinctio inventore, sequi iste. Illum
      praesentium excepturi dicta enim.t consectetur adipisicing elit. Nemo
      consectetur iusto, a esse voluptatibus necessitatibus incidunt facere?
      Doloribus consectetur itaque fugit distinctio inventore, sequi iste. Illum
      praesentium excepturi dicta enim.t consectetur adipisicing elit. Nemo
      consectetur iusto, a esse voluptatibus necessitatibus incidunt facere?
      Doloribus consectetur itaque fugit distinctio inventore, sequi iste. Illum
      praesentium excepturi dicta enim.
    </article>
  </main>
</template>

<script>
// import store from "@/store";
import { mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions("cars", ["getCars", "getModel"])
  },
  computed: {
    ...mapState("cars", ["cars", "models"]),
    firstCarName() {
      const fe = this.$store.state.cars.cars[0];
      return fe ? fe.data.name : undefined;
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  }
  // beforeRouteEnter(to, from, next) {
  //   // this;
  //   Promise.all([
  //     store.dispatch("cars/getCars"),
  //     store.dispatch("cars/getModel")
  //   ]).then(() => {
  //     next();
  //   });
  // }
};
</script>
