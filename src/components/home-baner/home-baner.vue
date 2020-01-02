<template>
  <div>
    {{ authCount }}
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('auth', {
      authCount: 'count',
    }),
  },
  created() {
    // console.log(this.$store.state);
  },
};
</script>

<style lang="scss">
@import './home-baner.scss';
</style>
