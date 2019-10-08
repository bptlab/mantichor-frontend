import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Notifications from 'vue-notification';
import ProjectManagement from '@/plugins/ProjectManagement';
import DefinitionsStore from '@/plugins/DefinitionsStore';
import VModal from 'vue-js-modal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCrosshairs,
  faPlus,
  faMinus,
  faCog,
  faShareAlt,
  faImage,
  faDownload,
  faFolderOpen,
  faCloudDownloadAlt,
  faCloudUploadAlt,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCrosshairs,
  faPlus,
  faMinus,
  faCog,
  faShareAlt,
  faImage,
  faDownload,
  faFolderOpen,
  faCloudDownloadAlt,
  faCloudUploadAlt,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Notifications);
Vue.use(ProjectManagement);
Vue.use(DefinitionsStore);
Vue.use(VModal, { dialog: true });

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
