<script src="./login-avatar.component.ts" lang="ts"></script>


<template>
    <div>
        <md-menu md-align-trigger v-if="isAuthenticated">
            <md-avatar md-menu-trigger>
                <img :src="avatarImage" alt="Avatar">
            </md-avatar>
            <md-menu-content>
                <md-menu-item @selected="logout()">Logout</md-menu-item>
            </md-menu-content>
        </md-menu>
        <md-spinner class="md-accent" :md-size="20" md-indeterminate v-else-if="isPending"></md-spinner>
        <md-menu md-direction="bottom left" v-else>
            <md-button md-menu-trigger>Login</md-button>
            <md-menu-content>
                <md-menu-item @selected="login('google')">Google</md-menu-item>
                <md-menu-item @selected="login('facebook')">Facebook</md-menu-item>
                <md-menu-item @selected="login('twitter')">Twitter</md-menu-item>
            </md-menu-content>
        </md-menu>
    </div>
</template>

<style scoped>

</style>
