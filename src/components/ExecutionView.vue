<template>
  <div class="executionview">
    <div class="container">
      <div id="canvas"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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

  public modeler: any;

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
    this.modeler = new ChoreoModeler({
      container: '#canvas',
      keyboard: {
        bindTo: document,
      },
    });
    this.renderModel(bpmnExample);
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
</style>
