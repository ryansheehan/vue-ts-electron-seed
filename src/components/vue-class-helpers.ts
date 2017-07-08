export * from "vue-property-decorator";
export { mapActions, mapGetters, mapState } from "vuex"

import { createDecorator } from "vue-class-component";
import Vue, {ComponentOptions, ComputedOptions} from "vue"

export const NoCache:any = createDecorator((options:ComponentOptions<Vue>, key:string) => {
  // component options should be passed to the callback
  // and update for the options object affect the component

  if(options && options.computed) {
      (<ComputedOptions<Vue>>options.computed[key]).cache = false;
  }
})

// import { mapGetters } from "vuex";

// export function VuexGetter(getterMethod: string) {
//     return createDecorator((options:ComponentOptions<Vue>, key:string)=>{
//         if(!options.computed) options.computed = {};
//         options.computed[key] = function(){
//             return this.$store.getters[getterMethod]
//         }
//     })
// }
