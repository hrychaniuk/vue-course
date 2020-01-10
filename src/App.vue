<template>
  <div id="app">
    <v-header />
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 18px;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  outline: 2px solid red;
}

* {
  box-sizing: inherit;
}

h1 {
  font-size: 28px;
}

button {
  background-color: transparent;
  border: none;
  box-shadow: none;
  cursor: pointer;
}
</style>
