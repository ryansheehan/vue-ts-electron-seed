import Vue from "vue";
import { Component, mapActions, mapGetters, mapState, Watch } from "./vue-class-helpers";

@Component({
    methods: {
        ...mapActions("auth", ["login"])
    },

    computed: {
        ...mapGetters("auth", ["isUnauthenticated", "isPending", "isAuthenticated"]),
        ...mapState("auth", ["user"])
    }
})
export default class Login extends Vue {
    @Watch("isAuthenticated")
    onIsAuthenticatedChanged(val: boolean, oldValue: boolean) {
        this.$router.replace("/");
    }
}
