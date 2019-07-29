<template>
  <div class="executor">
    <div class="container">
      <div id="canvas" class="execution"></div>
    </div>
    <div class="sidebar-right">
      <div v-if="isSelected && $instancemanagement.activeProject">
        <ul class="overview-list">
          <li>
            <h4>Project ID</h4>
            <p>{{ $instancemanagement.activeProject.id }}</p>
          </li>
          <li>
            <h4>Project name</h4>
            <p>{{ $instancemanagement.activeProject.name }}</p>
          </li>
          <li>
            <h4>Selected element ID</h4>
            <p>{{ elementID }}</p>
          </li>
          <li>
            <h4>Selected task</h4>
            <p>{{ elementTask }}</p>
          </li>
          <li>
            <h4>Participants</h4>
            <ul>
              <li
                v-for="participant in participants"
                :key="participant.id">
                <p>{{ participant.name }}</p>
              </li>
            </ul>
          </li>
        </ul>
        <div class="button-container">
          <button title="Execute selected task" @click="execute()">Execute</button>
        </div>
      </div>
      <div v-else>
        <p>Please select an element.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ChoreoModeler from 'chor-js';
import Project from '@/interfaces/Project';
import { ChoreographyInstances } from '../apis/mantichor-blockchain/mantichor-blockchain';
// import parser from 'fast-xml-parser';

/* bpmn-js includings
 * In this way all existing js files will be included
 */
const requireBpmn = require.context('bpmn-js/dist', true, /\.js$/);
requireBpmn.keys().forEach(requireBpmn);

/* chor-js includings
 * In this way all existing js files will be included
 */
const requireChor = require.context('chor-js/assets', true, /\.js$/);
requireChor.keys().forEach(requireChor);

@Component
export default class ExecutionView extends Vue {
  private modeler: any;
  private elementID!: string;
  private elementTask!: string;
  private isSelected!: boolean;
  private participants!: [];

  constructor() {
    super();
    this.elementID = 'no selection';
    this.elementTask = 'no selection';
    this.isSelected = false;
  }

  @Watch('$instancemanagement.activeProject')
  private onChangeProject(project: Project) {
    this.renderModel(project.bpmnXML);
  }

  private async renderModel(xml: string) {
    try {
      await this.modeler.setXML(xml);
      this.modeler.displayChoreography({});
      this.resetZoom();
      if (!this.$instancemanagement.activeProject) { return; }
      this.participants = this.$instancemanagement.activeProject.getParticipants();
    } catch (error) {
      this.$notify({
        type: 'error',
        title: 'Error',
        text: error.error.message,
        duration: 4000,
      });
    }
  }

  private resetZoom() {
    this.modeler.get('canvas').zoom('fit-viewport');
  }

  private async execute() {
    if (!this.$instancemanagement.activeProject) { return; }
    const accounts = await ChoreographyInstances.getAccounts();
    await ChoreographyInstances.executeTask(this.$instancemanagement.activeProject, accounts[0], [this.elementID]);
    this.loadAndDisplayEnabledTasks();
  }

  private async loadAndDisplayEnabledTasks() {
    if (!this.$instancemanagement.activeProject) { return; }
    const enabledtasks = await ChoreographyInstances.getEnabledTasks(this.$instancemanagement.activeProject);
    this.modeler.importXML(this.$instancemanagement.activeProject.bpmnXML, () => {
      const canvas = this.modeler.get('canvas');
      if (!enabledtasks) { return; }
      enabledtasks.forEach((tasks) => {
        try {
          canvas.addMarker(tasks[0], 'enabled');
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  private async mounted() {
    const self = this;
    this.modeler = new ChoreoModeler({
      container: '#canvas',
      keyboard: {
        bindTo: document,
      },
    });

    if (!this.$instancemanagement.activeProject) { return; }
    this.renderModel(this.$instancemanagement.activeProject.bpmnXML);

    this.loadAndDisplayEnabledTasks();

    const eventBus = this.modeler.get('eventBus');
    eventBus.on('selection.changed', () => {
      const selectedElements = self.modeler.get('selection').get();
      if (selectedElements.length > 0) {
        const selectedElement = selectedElements[0];
        this.elementID = selectedElement.id;
        this.elementTask = selectedElement.type;
        this.isSelected = true;
      } else {
        this.elementID = 'no selection';
        this.elementTask = 'no selection';
        this.isSelected = false;
      }
    });
  }
}
</script>

<style scoped lang="less">
@import "../styles.less";
.container {
  background-color: #ffffff;
  position: fixed;
  top: 54px;
  right: 300px;
  bottom: 0;
  left: 80px;
}
#canvas {
  height: 100%;
}
.sidebar-right {
  position: fixed;
  top: 54px;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: #252527;
  // box-shadow: -10px 2px 6px #dddddd;
  p {
    color: #fff;
  }
  ul.overview-list {
    list-style: none;
    padding: 0;
    margin-top: 0;
    margin-bottom: 12px;
    &>li {
      padding: 12px;
      text-align: left;
      color: #fff;
      border-bottom: 1px solid #fff;
      h4 {
        font-size: 12px;
        margin: 0 0 12px 0;
      }
      p {
        font-size: 12px;
        line-height: 16px;
        margin: 0;
      }
    }
  }
  .button-container {
    width: 100%;
    button {
      background-color: @accent;
      border-radius: 5px;
      font-size: 1em;
      padding: 10px;
      color: #fff;
      font-weight: bold;
      margin: 0 12px;
      border: none;
    }
  }
}
</style>