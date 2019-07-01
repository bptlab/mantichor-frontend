<template>
  <modal
    name="project-settings"
    transition="pop-out"
    height="auto"
    @before-open="beforeOpen"
    @opened="opened"
    @closed="closed"
    @beforeClose="beforeClose"
  >
    <div class="vue-dialog dialog">
      <div class="dialog-content">
        <h1 class="dialog-title">Project settings</h1>
        <div class="dialog-form">
          <input
            id="n-name"
            type="text"
            placeholder="Project name"
            :value="$projectmanagement.activeProject.name"
          >
        </div>
      </div>
      <div class="vue-dialog-buttons">
        <button class="vue-dialog-button" @click="confirm()">Confirm</button>
        <button class="vue-dialog-button" @click="remove()">Delete</button>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

export default class ProjectSettingsModal extends Vue {
  // public name!: string;
  // public test!: string;

  constructor() {
    super();
    // this.name = '';
    // this.test = '';
  }

  public beforeOpen(event: any) {
    // This method is called to set values!
    // this.test = event.params.test;
    // alert(this);
  }

  public opened(event: any) {
    // this.test = event.params.test;
    // alert(this);
  }

  public closed(event: any) {
    // alert(this);
  }

  public beforeClose(event: any) {
    // alert(this);
  }

  private confirm() {
    alert('Confirm ...');
  }

  private remove() {
    alert('Remove ...');
  }
}

</script>

<style lang="less">
.dialog {
  color: #8b8c8d;
  font-size: 0;
  width: 100%;
  vertical-align: top;
  p {
    font-size: 18px;
  }
  .dialog-title {
    box-sizing: border-box;
    padding: 30px;
    width: 100%;
    text-align: center;
    letter-spacing: 1px;
    font-size: 20px;
    font-weight: 300;
  }
  .dialog-form {
    padding: 0 20px;
    box-sizing: border-box;
  }
  input[type="text"] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
  }

  button {
    flex: 1 1 100%;
  }
  .vue-dialog-buttons {
    margin-top: 20px;
  }
}
</style>
