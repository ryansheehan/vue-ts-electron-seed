<script src="./counter.component.ts" lang="ts"></script>

<template>
  <div class="counter-container">
    <md-button class="md-raised" @click.native="decrement(1)">-</md-button>
    <span>{{count}}</span>
    <md-button class="md-raised" @click.native="increment(1)">+</md-button>
  </div>
</template>

<style scoped>
.counter-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
}
</style>
