<template>
  <div class="executor">
    <div class="container">
      <div id="canvas" class="execution"></div>
    </div>
    <div class="sidebar-right">
      <div v-if="isSelected && $instancemanagement.activeProject">
        <p>
          Participants:
          <br />
          <select>
            <option
              v-for="participant in participants"
              :value="participant.id"
              :key="participant.id"
            >{{ participant.name }}</option>
          </select>
        </p>
        <p>
          Project ID:
          <br />
          {{ $instancemanagement.activeProject.id }}
        </p>
        <p>
          Project Name:
          <br />
          {{ $instancemanagement.activeProject.name }}
        </p>
        <p>
          Element ID:
          <br />
          {{ elementID }}
        </p>
        <p>
          Task:
          <br />
          {{ elementTask }}
        </p>
        <button title="publish on Blockchain" @click="publish()">Deploy</button>
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

  private async publish() {
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
}
</style>
