import Vue from "vue";
import Vuex from "vuex";
import { CounterModule, ICounterState } from "./counter.store";
//import { AuthModule, IAuthState } from "./auth.store";

Vue.use(Vuex);

interface IRootState {
    counter?: ICounterState
//    auth?: IAuthState;
}

const store:Vuex.Store<IRootState> = new Vuex.Store<IRootState>({
    strict: true,

    modules: {
        counter: new CounterModule<IRootState>(),
//        auth: new AuthModule<IRootState>(),
    }
});


export {store as default, IRootState};
