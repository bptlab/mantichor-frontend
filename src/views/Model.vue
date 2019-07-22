<template>
  <main class="model">
    <Sidebar :isModeler="true" />
    <Modeler />
    <ul class="floating-buttons">
      <li @click="deploy()" class="green">Deploy</li>
      <li @click="remove()" class="red">Delete</li>
    </ul>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar.vue';
import Modeler from '@/components/Modeler.vue';
import { ChoreographyInstances } from '../apis/mantichor-blockchain/mantichor-blockchain';

@Component({
  components: {
    Sidebar,
    Modeler,
  },
})
export default class Model extends Vue {
  private async deploy() {
    if (!this.$modelmanagement.activeProject) { return; }
    const instance = await this.$modelmanagement.activeProject.deploy([]);
    console.log(instance);
    const enabledTasks = await ChoreographyInstances.getEnabledTasks(instance);
    console.log(enabledTasks);
  }
  private remove() {
    if (!this.$modelmanagement.activeProject) { return; }
    this.$modelmanagement.removeProject(this.$modelmanagement.activeProject);
  }
}
</script>

<style scoped lang="less">
@import "../styles.less";

main.model {
  .floating-buttons {
    position: fixed;
    bottom: @spacing;
    right: @spacing * 5;
    margin: 0;
    padding: 0;
    display: flex;

    & > * {
      box-shadow: 0 0 0.25em 0.1em @shadow;
      border-radius: @border-radius;
      padding: 10px;
      cursor: pointer;
      font-size: 1em;
      color: @light;
      font-weight: bold;
      margin-right: @spacing;
    }

    & > *:last-child {
      margin-right: 0;
    }

    .green {
      background-color: @accent;
    }

    .red {
      background-color: #cc1414;
    }
  }
}
</style>
