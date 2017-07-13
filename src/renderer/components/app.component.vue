<script src="./app.component.ts" lang="ts"></script>

<template>
  <div id="app">
    <div class="logo-container">
        <img src="~assets/logo.png"></img>
        <img src="/static/typescript2.jpg"></img>
    </div>
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

.logo-container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    margin: 20px;
}

.logo-container img {
    max-height: 200px;
}
</style>
