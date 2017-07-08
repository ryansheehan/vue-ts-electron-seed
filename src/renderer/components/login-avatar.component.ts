import Vue from "vue";
import { Component, mapActions, mapGetters, mapState } from "./vue-class-helpers";
import { IAuthState } from "../store/auth.store";

@Component({
    methods: {
        ...mapActions("auth", ["logout", "login"])
    },

    computed: {
        ...mapGetters("auth", ["isAuthenticated", "isPending"]),
        ...mapState("auth", {
            avatarImage: (state:IAuthState)=> state.user && state.user.photoURL ? state.user.photoURL : "assets/logo.png"
        })
    },
})
export default class LoginAvatar extends Vue {

}
