<template>
  <div class="modelview">
    <div class="container">
      <div id="canvas"></div>
    </div>
    <div
      class="floating-button"
      @click="deploy()">
      Deploy
    </div>
    <div
      class="floating-button-2"
      @click="deleteProject()">
      Löschen
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ChoreoModeler from 'chor-js/lib/Modeler';
import bpmnBlank from 'raw-loader!@/resources/newDiagram.bpmn';
import bpmnExample from 'raw-loader!@/resources/testDiagram.bpmn';
// import '@/Projects';
import Sidebar from './Sidebar.vue';
require('diagram-js/assets/diagram-js.css');
require('bpmn-js/dist/assets/bpmn-font/css/bpmn.css');
require('chor-js/assets/font/include/css/choreography.css');

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
export default class ModelView extends Vue {
  private project!: Project;
  private modeler!: any;

  public createNewDiagram() {
      this.renderModel(bpmnBlank);
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

  private saveSVG(done: any) {
    this.modeler.saveSVG(done);
  }

  private saveDiagram(done: any) {
    this.modeler.saveXML({ format: true }, (err: any, xml: any) => {
      done(err, xml);
    });
  }

  private deploy() {
    const self = this;
    // Temporarily save models
    this.saveDiagram((err: any, xml: any) => {
      self.project.bpmnXML = xml;
      self.$root.$emit('saveProjects');
    });
  }

  private deleteProject() {
    this.$root.$emit('removeProject', this.project);
  }

  private mounted() {
    this.modeler = new ChoreoModeler({
      container: '#canvas',
      keyboard: {
        bindTo: document,
      },
    });
    // this.renderModel(bpmnExample);

    this.$root.$on('didSelectProject', (project: Project) => {
      this.project = project;
      if (this.project.bpmnXML !== '') {
        this.renderModel(this.project.bpmnXML);
      } else {
        this.project.bpmnXML = bpmnBlank;
        this.$root.$emit('saveProjects');
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
    ];
    events.forEach(event => {
      eventBus.on(event, (e: any) => {
        if (event == 'element.mouseup') {
          console.log('save now');
          const self = this;
          // Temporarily save models
          this.saveDiagram((err: any, xml: any) => {
            self.project.bpmnXML = xml;
            self.$root.$emit('saveProjects');
          });
        }
      });
    });
  }
}

</script>

<style scoped lang="less">
  .container {
    // position: absolute;
    background-color: #ffffff;
    // width: 94%;
    // height: 86%;
    position: fixed;
    top: 54px;
    right: 0;
    bottom: 0;
    left: 80px;
  }
  #canvas {
    height: 100%;
  }
  .floating-button {
    position: fixed;
    bottom: 26px;
    right: 100px;
    background-color: #75b900;
    padding: 10px;
    border-radius: 40px;
    font-size: 1em;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    box-shadow: -4px 4px 4px #dddddd;
  }
  .floating-button-2 {
    position: fixed;
    bottom: 26px;
    right: 200px;
    background-color: #cc1414;
    padding: 10px;
    border-radius: 40px;
    font-size: 1em;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    box-shadow: -4px 4px 4px #dddddd;
  }
</style>
