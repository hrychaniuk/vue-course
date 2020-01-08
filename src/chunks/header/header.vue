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
      active: false,
    };
  },
  methods: {
    toogleActive() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'header.scss';
</style>
