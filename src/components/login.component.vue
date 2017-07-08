<script src="./login.component.ts" lang="ts"></script>

<template>
  <div class="em-login">
    <div v-if="isUnauthenticated">
        <div class="md-title em-login-title">Sign in with:</div>
        <!--<md-button class="md-raised md-primary" @click.native="login('google')">Sign in with Google</md-button>-->
        <md-button class="md-raised" @click.native="login('google')">Google</md-button>
        <md-button class="md-raised" @click.native="login('facebook')">Facebook</md-button>
        <md-button class="md-raised" @click.native="login('twitter')">Twitter</md-button>
    </div>
    <md-spinner md-indeterminate :md-size="150" v-else-if="isPending"></md-spinner>
    <div v-else>Signed in with {{user.providerId}}</div>
  </div>
</template>

<style scoped>
  .em-login {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
</style>
