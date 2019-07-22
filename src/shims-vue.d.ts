import Vue from 'vue';
import { ProjectManagement } from './plugins/ProjectManagement';
import { Model, Instance } from './interfaces/Project';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $modelmanagement: ProjectManagement<Model>;
    $instancemanagement: ProjectManagement<Instance>;
  }
}
