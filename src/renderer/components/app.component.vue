<script src="./app.component.ts" lang="ts"></script>

<template>
  <div id="app">
    <h1>Counter</h1>
    <router-view></router-view>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
