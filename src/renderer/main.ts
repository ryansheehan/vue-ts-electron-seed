import Vue from "vue";
import {sync} from "vuex-router-sync";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.css";

import App from "./components/app.component.vue";

import store from "./store";
import router from "./router";

sync(store, router);

Vue.use(VueMaterial);

new Vue({
  el: "#app",
  store,
  router,
  template: "<App></App>",
  components: { App }
});
