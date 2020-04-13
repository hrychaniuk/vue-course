<template>
  <div id="app">
    <v-header />
    <!-- <transition name="fade"> -->
    <router-view />
    <!-- </transition> -->
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/global.scss";

// router-vue (comp1 -> 300ms -> dn) -> (comp2 -> 300ms -> db)
</style>
