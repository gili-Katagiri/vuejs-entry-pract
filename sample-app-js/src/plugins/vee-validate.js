import Vue from 'vue';
import {
  configure,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';

const config = {
  bails: false,
  mode: 'aggressive',
};
configure(config);
localize('ja', ja);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
