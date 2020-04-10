<template>
  <div>
    <h1>{{ Modernizr.touchevents ? "with-touch" : "no-touch" }}</h1>
    <!-- --- -->
    <!-- --- -->
    <!-- --- -->
    <section>
      <b :key="c.id" v-for="c in cars">
        <h2>{{ c.data.name }}</h2>
        {{ models.find(i => i.id === c.data.type[0]).data.type }}
      </b>
      <hr />
      <hr />
      <b :key="c.id" v-for="c in models">
        <h2>{{ c.data.type }}</h2>
        <i>{{ c.id }}</i>
      </b>
    </section>
  </div>
</template>

<script>
import store from "@/store";
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
  },
  beforeRouteEnter(to, from, next) {
    // this;
    Promise.all([
      store.dispatch("cars/getCars"),
      store.dispatch("cars/getModel")
    ]).then(() => {
      next();
    });
  }
};
</script>
