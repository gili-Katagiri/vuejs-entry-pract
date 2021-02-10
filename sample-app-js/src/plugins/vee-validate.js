import Vue from 'vue';
import {
  configure,
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import { required, max, ext, size } from 'vee-validate/dist/rules';

const config = {
  bails: false,
  mode: 'aggressive',
};
configure(config);

extend('required', required);
extend('max', max);
extend('ext', ext);
extend('size', size);
extend('userNameAllowedCharacters', {
  message: 'Only [A-Z, a-z, 0-9, _] are available in {_field_}',
  validate: value => {
    return /^[0-9A-Z_]*$/i.test(value);
  },
});

localize('ja', ja);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
