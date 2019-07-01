<template>
  <section class="modeler">
    <div id="canvas"></div>

    <ul class="io-control io-project-tools">
      <li>
        <button title="open BPMN diagram from local file system" @click="openLocal()">
          <font-awesome-icon icon="folder-open"/>
        </button>
      </li>

      <li>
        <button title="download BPMN diagram" @click="saveDiagram()">
          <font-awesome-icon icon="download"/>
        </button>
      </li>
      <li>
        <button title="download as SVG image" @click="saveSVG()">
          <font-awesome-icon icon="image"/>
        </button>
      </li>
      <li class="vr"></li>
      <li>
        <button title="Share" @click="share()">
          <font-awesome-icon icon="cloud-upload-alt"/>
        </button>
      </li>
      <li>
        <button title="settings" @click="settings()">
          <font-awesome-icon icon="cog"/>
        </button>
      </li>
    </ul>

    <ul class="io-control io-zoom">
      <li>
        <button title="reset zoom" @click="resetZoom()">
          <font-awesome-icon icon="crosshairs"/>
        </button>
      </li>
      <li class="hr"></li>
      <li>
        <button title="zoom in" @click="zoomIn()">
          <font-awesome-icon icon="plus"/>
        </button>
      </li>
      <li>
        <button title="zoom out" @click="zoomOut()">
          <font-awesome-icon icon="minus"/>
        </button>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ChoreoModeler from 'chor-js/lib/Modeler';
import Project from '@/interfaces/Project';
import 'diagram-js/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'chor-js/assets/font/include/css/choreography.css';

@Component
export default class Modeler extends Vue {
  private modeler!: any;

  @Watch('$projectmanagement.activeProject')
  private onChangeProject(project: Project) {
    this.renderModel(project.bpmnXML);
  }

  private async renderModel(xml: string) {
    try {
      await this.modeler.setXML(xml);
      this.modeler.displayChoreography({});
      this.resetZoom();
    } catch (error) {
      this.$notify({
        type: 'error',
        title: 'Error',
        text: error.error.message,
        duration: 4000,
      });
    }
  }

  private saveSVG(done: any) {
    // ToDo: Export Diagram as SVG
  }

  private saveDiagram(done: any) {
    // ToDo: Export Diagram as XML
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

  private async getXML(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modeler.saveXML({ format: true }, (err: any, xml: string) => {
        err ? reject(err) : resolve(xml);
      });
    });
  }

  private settings() {
    this.$modal.show('project-settings');
  }

  private async share() {
    this.$modal.show('share-modal');
  }

  private deploy() {
    // ToDo: Deploy Project
  }

  private mounted() {
    this.modeler = new ChoreoModeler({
      container: '#canvas',
      keyboard: {
        bindTo: document,
      },
    });

    this.renderModel(this.$projectmanagement.activeProject.bpmnXML);

    const eventBus = this.modeler.get('eventBus');
    eventBus.on('element.mouseup', () => {
      (async () => {
        this.$projectmanagement.activeProject.bpmnXML = await this.getXML();
        this.$projectmanagement.activeProject.dateSaved = new Date();
        this.$projectmanagement.saveProjects();
      })();
    });
  }
}
</script>

<style scoped lang="less">
@import "../styles.less";

#canvas {
  background-color: @light;
  position: fixed;
  top: 54px;
  right: 0;
  bottom: 0;
  left: 80px;
}

section.modeler {
  ul {
    list-style: none;
    margin: 0;
    padding: 5px;
    font-size: 22px;
    color: @primary-variant;

    li {
      display: flex;
      padding: 6px;
      justify-content: center;
      align-items: center;
    }

    button {
      padding: 0;
      border: 0;
      font-size: inherit;
    }

    .hr {
      width: 100%;
      padding: 0;
      margin: 5px 0;
      border-bottom: solid 1px #cccccc;
    }

    .vr {
      height: 38px;
      padding: 0;
      margin: 0 5px;
      border-right: solid 1px #cccccc;
    }
  }

  .io-zoom {
    position: fixed;
    right: @spacing;
    bottom: @spacing * 5;
  }

  .io-project-tools {
    position: fixed;
    top: @spacing * 3.5;
    right: @spacing;
    display: flex;
  }
}
</style>
