import Vue from 'vue';
import { ProjectManagement } from './plugins/ProjectManagement';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $projectmanagement: ProjectManagement;
  }
}
