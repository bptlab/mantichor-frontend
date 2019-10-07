<template>
  <section class="executor">
    <div class="container">
      <div id="canvas" class="execution"></div>
    </div>
    <ul class="io-control io-project-tools">
      <li>
        <button title="Share" @click="share()">
          <font-awesome-icon icon="cloud-upload-alt" />
        </button>
      </li>
    </ul>
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
          <li>
            <div v-if="true != false">
              <button
                :disabled="deploying"
                title="Execute selected task"
                @click="execute()">
                {{ deploying ? 'Your project is being deployed, this can take a few minutes.' : 'Execute' }}
                <div v-if="deploying" class="loader">Loading...</div>
              </button>
            </div>
            <div v-else>
              <p>This element is not enabled</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Please select an element.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ChoreoModeler from 'chor-js/lib/NavigatedViewer';
import Project from '@/interfaces/Project';
import { ChoreographyInstances } from '../apis/mantichor-blockchain/mantichor-blockchain';

export interface Mapping {
  role: string;
  address: string;
}

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
  private deploying!: boolean;
  private participants!: Mapping[];
  private enabledTasks!: string[][];
  private executingParticipant!: Mapping;
  private interval!: any;
  private eventBusHandler!: any;

  constructor() {
    super();
    this.elementID = 'no selection';
    this.elementTask = 'no selection';
    this.isSelected = false;
    this.deploying = false;
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
      // Get the participants
      this.participants = this.$instancemanagement.activeProject.getParticipants();

      // Initialize request interval
      if ( this.interval ) {
        clearInterval( this.interval );
      }
      this.interval = setInterval( () => {
        this.loadAndDisplayEnabledTasks();
      }, 2000);

      // Initialize Event Handler
      const eventBus = this.modeler.get('eventBus');
      if ( !this.eventBusHandler ) {
        this.eventBusHandler = eventBus.on('selection.changed', () => {
          const selectedElements = this.modeler.get('selection').get();
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
    if (this.deploying) { return; }
    this.deploying = true;
    if (!this.$instancemanagement.activeProject) { return; }
    const accounts = await ChoreographyInstances.getAccounts();
    await ChoreographyInstances.executeTask(this.$instancemanagement.activeProject, accounts[0], [this.elementID]);
    this.deploying = false;
    this.loadAndDisplayEnabledTasks();
  }

  private async loadAndDisplayEnabledTasks() {
    if (!this.$instancemanagement.activeProject) { return; }
    this.enabledTasks = await ChoreographyInstances.getEnabledTasks(this.$instancemanagement.activeProject);

    const canvas = this.modeler.get('canvas');
    const enabledTasksClassList = document.querySelector('.enabled');
    if (enabledTasksClassList) {
      enabledTasksClassList.classList.remove('enabled');
    }
    if (!this.enabledTasks) { return; }
    this.enabledTasks.forEach((tasks) => {
      try {
        if (tasks[0] === 'finished') { return; }
        canvas.addMarker(tasks[0], 'enabled');
      } catch (error) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Could not highlight enabled tasks. Possibly, there are no executable task.',
          duration: 4000,
        });
      }
    });
  }

  private async share() {
    this.$modal.show('share-modal', { projectmanagement: this.$instancemanagement });
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
  }

  private beforeDestroy() {
    clearInterval( this.interval );
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
  left: 0;
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
  background-color: @primary;
  max-height: calc(100% - @element-size);
  overflow-y: scroll;
  scrollbar-width: none;
  // box-shadow: -10px 2px 6px #dddddd;
  p {
    color: #fff;
  }
  ul.overview-list {
    list-style: none;
    padding: 0;
    margin: 0;
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
      button {
        width: 100%;
        background-color: @accent;
        border: none;
        border-radius: 5px;
        color: #fff;
        padding: 10px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
      }
      button:disabled {
        background-color: @primary;
      }
    }
    & > *:last-child {
      border-bottom: none;
    }
  }
}
.loader {
  font-size: 10px;
  display: inline-block;
  text-indent: -9999em;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #8b8c8d;
  background: -moz-linear-gradient(
    left,
    #8b8c8d 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #8b8c8d 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #8b8c8d 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #8b8c8d 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #8b8c8d 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #8b8c8d;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.loader:after {
  width: 75%;
  height: 75%;
  background-color: @primary;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}


ul.io-control {
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
    button {
      background-color: transparent;
    }
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

.io-project-tools {
  position: fixed;
  top: @spacing * 3.5;
  right: @spacing + 300px;
  display: flex;
}

</style>
