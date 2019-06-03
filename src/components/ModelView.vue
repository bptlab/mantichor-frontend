<template>
  <div class="modelview">
    <div class="container">
      <div id="canvas"></div>
    </div>
    <div class="floating-button">
      Deploy
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import bpmnBlank from 'raw-loader!../resources/newDiagram.bpmn';
import bpmnExample from 'raw-loader!../resources/testDiagram.bpmn';
require('diagram-js/assets/diagram-js.css');

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

import ChoreoModeler from 'chor-js/lib/Modeler';

@Component
export default class ModelView extends Vue {

  public modeler: any;

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
      console.log('something went wrong: ', error);
    });
  }

  private saveSVG(done: any) {
    this.modeler.saveSVG(done);
  }

  private saveDiagram(done: any) {
    this.modeler.saveXML({ format: true });
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
  // @import url('../../node_modules/diagram-js/assets/diagram-js.css');
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

  // Chor Editor CSS
  @font-face {
  font-family: 'chor-editor';
  src: url('../assets/font/chor-editor.eot?2024248');
  src: url('../assets/font/chor-editor.eot?2024248#iefix') format('embedded-opentype'),
       url('../assets/font/chor-editor.woff2?2024248') format('woff2'),
       url('../assets/font/chor-editor.woff?2024248') format('woff'),
       url('../assets/font/chor-editor.ttf?2024248') format('truetype'),
       url('../assets/font/chor-editor.svg?2024248#chor-editor') format('svg');
  font-weight: normal;
  font-style: normal;
}
/* Chrome hack: SVG is rendered more smooth in Windozze. 100% magic, uncomment if you need it. */
/* Note, that will break hinting! In other OS-es font will be not as sharp as it could be */
/*
@media screen and (-webkit-min-device-pixel-ratio:0) {
  @font-face {
    font-family: 'chor-editor';
    src: url('../font/chor-editor.svg?2024248#chor-editor') format('svg');
  }
}
*/

 [class^="icon-"]:before, [class*=" icon-"]:before {
  font-family: "chor-editor";
  font-style: normal;
  font-weight: normal;
  speak: none;

  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  text-align: center;
  /* opacity: .8; */

  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;

  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;

  /* you can be more comfortable with increased icons size */
  /* font-size: 120%; */

  /* Font smoothing. That was taken from TWBS */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Uncomment for 3D effect */
  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
}

.icon-folder:before { content: '\e801'; } /* '' */
.icon-doc-new:before { content: '\e802'; } /* '' */
.icon-github-circled:before { content: '\f09b'; } /* '' */
.icon-file-image:before { content: '\f1c5'; } /* '' */
.icon-file-code:before { content: '\f1c9'; } /* '' */
</style>
