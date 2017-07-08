import Vue from "vue";
import { Component, mapActions, mapState, Prop } from "./vue-class-helpers";

@Component({
    methods: {
        ...mapActions("counter", ["increment", "decrement"])
    },

    computed: {
        ...mapState("counter", ["count"])
    }
})
export default class Counter extends Vue {

}
