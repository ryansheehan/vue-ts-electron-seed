import Vue from "vue";
import Router from "vue-router";
import Counter from "../components/counter.component.vue";


Vue.use(Router);


const router: Router = new Router({
    routes: [
        {
            path: "/",
            component: Counter
        },
    ]
});


export default router;
