import Vue from 'vue';
import { ProjectManagement } from './plugins/ProjectManagement';
import { Model, Instance } from './interfaces/Project';
import { DefinitionStore } from './plugins/DefinitionsStore';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $definitionsStore: DefinitionStore;
    $modelmanagement: ProjectManagement<Model>;
    $instancemanagement: ProjectManagement<Instance>;
  }
}
