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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChoreoModeler from 'chor-js/lib/Modeler';
import bpmnBlank from 'raw-loader!@/resources/newDiagram.bpmn';
import bpmnExample from 'raw-loader!@/resources/testDiagram.bpmn';
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
    this.modeler.saveXML({ format: true });
  }

  private deploy() {
    // Temporarily save models
  }

  private mounted() {
    this.modeler = new ChoreoModeler({
      container: '#canvas',
      keyboard: {
        bindTo: document,
      },
    });
    this.renderModel(bpmnExample);

    this.$root.$on('createNewDiagram', () => {
      this.createNewDiagram();
    });

    this.$root.$on('loadDiagram', (bpmnXml: any) => {
      this.renderModel(bpmnXml);
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
</style>
