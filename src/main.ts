import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Notifications from 'vue-notification';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCrosshairs, faPlus, faMinus);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Notifications);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
