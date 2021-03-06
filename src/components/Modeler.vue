<template>
  <div id="canvas"></div>

    <!-- <ul class="io-control io-project-tools">
      <li>
        <button title="open BPMN diagram from local file system" @click="openLocal()">
          <font-awesome-icon icon="folder-open" />
        </button>
      </li>

      <li>
        <button title="download BPMN diagram" @click="saveDiagram()">
          <font-awesome-icon icon="download" />
        </button>
      </li>
      <li>
        <button title="download as SVG image" @click="saveSVG()">
          <font-awesome-icon icon="image" />
        </button>
      </li>
      <li class="vr"></li>
      <li>
        <button title="Share" @click="share()">
          <font-awesome-icon icon="cloud-upload-alt" />
        </button>
      </li>
      <li>
        <button title="settings" @click="settings()">
          <font-awesome-icon icon="cog" />
        </button>
      </li>
    </ul>

    <ul class="io-control io-zoom">
      <li>
        <button title="reset zoom" @click="resetZoom()">
          <font-awesome-icon icon="crosshairs" />
        </button>
      </li>
      <li class="hr"></li>
      <li>
        <button title="zoom in" @click="zoomIn()">
          <font-awesome-icon icon="plus" />
        </button>
      </li>
      <li>
        <button title="zoom out" @click="zoomOut()">
          <font-awesome-icon icon="minus" />
        </button>
      </li>
    </ul> -->

    <!-- <input id="inpLoadModel" type="file" name="name" accept=".bpmn, .xml" @change="loadModel()" /> -->
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ChoreoModeler from 'chor-js/lib/Modeler';
import Project from '@/interfaces/Project';
import { BaseElement } from 'bpmn-moddle';

import 'diagram-js/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'chor-js/assets/icons/include/css/choreography.css';
import 'chor-js/assets/styles/chor-js.css';

import blank from 'raw-loader!@/resources/testDiagram.bpmn';

@Component
export default class Modeler extends Vue {
  private modeler!: any;
  private selection!: BaseElement;

  private async renderModel() {
    try {
      await this.modeler.importDefinitions(this.$definitionsStore.getDefinitions());
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
    this.modeler.saveSVG({ format: true }, (err: any, svg: string) => {
      if (!err) {
        const encodedData = encodeURIComponent(svg);
        this.downloadDiagram('svg', 'diagram.svg', encodedData);
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: err.message,
          duration: 4000,
        });
      }
    });
  }

  private saveDiagram(done: any) {
    this.modeler.saveXML({ format: true }, (err: any, xml: string) => {
      if (!err) {
        const encodedData = encodeURIComponent(xml);
        this.downloadDiagram('bpmn', 'diagram.bpmn', encodedData);
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: err.message,
          duration: 4000,
        });
      }
    });
  }

  private downloadDiagram(fileType: string, fileName: string, data: string) {
    const a = document.createElement('a');
    a.download = fileName;
    a.href = 'data:application/bpmn20-xml;charset=UTF-8,' + data;
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
    }, 500);
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
    this.$modal.show('share-modal', { projectmanagement: this.$modelmanagement });
  }

  private mounted() {
    this.modeler = new ChoreoModeler({
      container: '#canvas',
      keyboard: {
        bindTo: document,
      },
    });

    this.renderModel();

    const eventBus = this.modeler.get('eventBus');
    const events = [
      'element.out',
      'element.click',
      'element.mouseup',
      'commandStack.changed',
    ];

    events.forEach((event) => {
      eventBus.on(event, () => {
        (async () => {
          this.$modelmanagement.saveProjects();
          if (!this.$modelmanagement.activeProject) { return; }
          this.$modelmanagement.activeProject.bpmnXML = await this.getXML();
          this.$modelmanagement.activeProject.dateSaved = new Date();
        })();
      });
    });

    // Initialize Event Handler
    eventBus.on('selection.changed', (context: any) => {
      let newSelection = context.newSelection || null;
      if (Array.isArray(newSelection)) {
        newSelection = newSelection[0];
      }
      if (this.selection !== newSelection) {
        this.selection = newSelection;
        this.$root.$emit('selectionChanged', this.selection);
      }
    });
  }
}
</script>

<style scoped lang="less">
@import "../styles.less";

#canvas {
  background-color: @light;
  flex-grow: 1;
}
</style>
