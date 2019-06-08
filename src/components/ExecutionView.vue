<template>
  <div class="executionview">
    <div class="container">
      <div id="canvas"></div>
    </div>
    <div class="sidebar-right">
      <p>Project ID:<br>{{ projectID }}</p>
      <p>Project Name:<br>{{ projectName }}</p>
      <p>Element ID:<br>{{ elementID }}</p>
      <p>Task:<br>{{ elementTask }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChoreoModeler from 'chor-js';
import bpmnExample from 'raw-loader!@/resources/testDiagram.bpmn';
// require('diagram-js/assets/diagram-js.css');

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
  private project!: Project;
  private modeler: any;
  @Prop() private projectID!: string;
  @Prop() private projectName!: string;
  @Prop() private elementID!: string;
  @Prop() private elementTask!: string;

  constructor() {
    super();
    this.projectID = 'no selection';
    this.projectName = 'no selection';
    this.elementID = 'no selection';
    this.elementTask = 'no selection';
  }

  private renderModel(newXml: any) {
    this.modeler.setXML(newXml).then((result: any) => {
      return this.modeler.displayChoreography({
        // choreoID: '_choreo1'
      });
    }).then((result: any) => {
      this.modeler.get('canvas').zoom('fit-viewport');
    }).catch((error: any) => {
      this.$notify({
        type: 'error',
        title: 'Error',
        text: error.error.message,
        duration: 4000,
      });
    });
  }

  private mounted() {
    const self = this;
    this.modeler = new ChoreoModeler({
      container: '#canvas',
      keyboard: {
        bindTo: document,
      },
    });

    this.$root.$on('didSelectProject', (project: Project) => {
      this.project = project;
      this.projectID = this.project.id;
      this.projectName = this.project.name;
      if (this.project.bpmnXML !== '') {
        this.renderModel(this.project.bpmnXML);
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'The diagram is empty',
          duration: 4000,
        });
      }
    });

    const eventBus = this.modeler.get('eventBus');
    const events = [
      'element.hover',
      'element.out',
      'element.click',
      'element.dbclick',
      'element.mousedown',
      'element.mouseup',
      'selection.changed',
    ];

    events.forEach((event) => {
      eventBus.on(event, (e: any) => {
        if (event === 'selection.changed') {
            const selectedElements = self.modeler.get('selection').get();
            if (selectedElements.length > 0) {
              const selectedElement = selectedElements[0];
              this.elementID = selectedElement.id;
              this.elementTask = selectedElement.type;
            } else {
              this.elementID = 'no selection';
              this.elementTask = 'no selection';
            }
        }
        // if (event === 'element.mouseup') {
        //   // const canvas = self.modeler.get('canvas');
        //   // canvas.addMarker(e.element.id, 'highlight');
        // }
      });
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
    p {
      color: #fff;
    }
  }
</style>
