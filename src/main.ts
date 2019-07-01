import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Notifications from 'vue-notification';
import ProjectManagement from '@/plugins/ProjectManagement';
import VModal from 'vue-js-modal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCrosshairs, faPlus, faMinus, faCog, faShareAlt, faImage, faDownload, faFolderOpen, faCloudDownloadAlt, faCloudUploadAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Notifications);
Vue.use(ProjectManagement);
Vue.use(VModal, { dialog: true });

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
