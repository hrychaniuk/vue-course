<template>
  <header>
    <router-link to="/">
      <img src="/svg/logo.svg" alt="" />
    </router-link>

    <div class="nav-wrap">
      <button class="burger" :class="{ active }" @click="toogleActive">
        <img src="/svg/burger.svg" alt="" />
      </button>

      <nav class="nav">
        <button @click="go">Go Blog</button>

        <router-link to="/">Home</router-link> |
        <router-link to="/blog">Blog</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      active: false
    };
  },
  methods: {
    go() {
      // this.$router.replace("/blog");
    },
    toogleActive() {
      this.active = !this.active;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "header.scss";
</style>
