<template>
  <div class="modelview">
    <!-- <v-dialog/> -->
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
    <div class="io-import-export">
      <ul class="io-import io-control io-control-list io-horizontal">
        <li>
          <button
            title="open BPMN diagram from local file system"
            @click="openLocal()">
            <font-awesome-icon icon="folder-open" />
          </button>
        </li>
        <li class="vr" style="margin-left: 2px"></li>
        <li>
          <button
            title="download BPMN diagram"
            @click="saveDiagram()">
            <font-awesome-icon icon="download" />
          </button>
        </li>
        <li>
          <button
            title="download as SVG image"
            @click="saveSVG()">
            <font-awesome-icon icon="image" />
          </button>
        </li>
      </ul>
    </div>
    <div class="io-project-tools">
      <ul class="io-control io-control-list io-horizontal">
        <li>
          <button
            title="Share"
            @click="settings()">
            <font-awesome-icon icon="share-alt" />
          </button>
        </li>
        <li class="vr" style="margin-left: 2px"></li>
        <li>
          <button
            title="settings"
            @click="settings()">
            <font-awesome-icon icon="cog" />
          </button>
        </li>
      </ul>
    </div>
    <div class="io-zoom-controls">
      <ul class="io-zoom-reset io-control io-control-list">
        <li>
          <button
            title="reset zoom"
            @click="resetZoom()">
            <font-awesome-icon icon="crosshairs" />
          </button>
        </li>
      </ul>
      <ul class="io-zoom io-control io-control-list">
        <li>
          <button
            title="zoom in"
            @click="zoomIn()">
            <font-awesome-icon icon="plus" />
          </button>
        </li>
        <li>
          <hr>
        </li>
        <li>
          <button
            title="zoom out"
            @click="zoomOut()">
            <font-awesome-icon icon="minus" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ChoreoModeler from 'chor-js/lib/Modeler';
import bpmnBlank from 'raw-loader!@/resources/newDiagram.bpmn';
import bpmnExample from 'raw-loader!@/resources/testDiagram.bpmn';
import Sidebar from './Sidebar.vue';
import Project from '@/interfaces/Project';
import 'diagram-js/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'chor-js/assets/font/include/css/choreography.css';

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

  private resetZoom() {
    this.modeler.get('canvas').zoom('fit-viewport');
  }

  private zoomIn() {
    const zoomLevel = this.modeler.get('canvas').zoom();
    this.modeler.get('canvas').zoom(zoomLevel + 0.162);
  }

  private zoomOut() {
    const zoomLevel = this.modeler.get('canvas').zoom();
    this.modeler.get('canvas').zoom(zoomLevel - 0.162);
  }

  private settings() {
    this.$modal.show('project-settings', {
      test: 'Test',
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

  // private debounce(fn: TimerHandler, timeout: number) {
  //   let timer: number;

  //   return function() {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }

  //     timer = setTimeout(fn, timeout);
  //   };
  // }

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
    events.forEach((event) => {
      eventBus.on(event, (e: any) => {
        if (event === 'element.mouseup') {
          // console.log('save now');
          const self = this;
          // Temporarily save models
          this.saveDiagram((err: any, xml: any) => {
            self.project.bpmnXML = xml;
            self.project.dateSaved = new Date();
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
    background-color: #ffffff;
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
  .io-zoom-controls {
    width: auto;
    position: fixed;
    right: 15px;
    bottom: 90px;
  }
  .io-project-tools {
    width: auto;
    position: fixed;
    right: 15px;
    top: 70px;
  }
  .io-import-export {
    position: fixed;
    left: 120px;
    bottom: 25px;
  }
  .io-control-list {
    list-style: none;
    padding: 5px;
    margin: 0;
    a, a:visited, button {
      padding: 0;
      height: 25px;
      outline: none;
      cursor: pointer;
      font-size: 22px;
      line-height: 26px;
      color: #555555;
      background: none;
      border: none;
    }
  }
  .io-control-list.io-horizontal, .io-control-list.io-horizontal li {
    display: inline-block;
  }
  .io-control-list.io-horizontal button {
    margin: 0 5px;
  }
  .io-zoom-reset {
    margin-bottom: 10px !important;
  }
  .vr {
    height: 18px;
    border-right: solid 1px #CCCCCC;
  }
</style>
