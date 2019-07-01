<template>
  <modal name="project-settings" transition="pop-out" @before-open="beforeOpen">
    <div class="vue-dialog dialog">
      <div class="dialog-content">
        <h1 class="dialog-title">Project Settings</h1>
        <div class="dialog-form">
          <input type="text" placeholder="Project Name" v-model="name">
        </div>
      </div>
      <div class="vue-dialog-buttons">
        <button class="vue-dialog-button" @click="confirm()">Confirm</button>
        <button class="vue-dialog-button" @click="cancel()">Cancel</button>
      </div>
    </div>
  </modal>
</template>

<script lang="js">

export default {
  name: 'ProjectSettingsModal',
  data: () => {
    return {
      name: '',
    };
  },
  methods: {
    beforeOpen() {
      this.name = this.$projectmanagement.activeProject.name;
    },
    confirm() {
      this.$projectmanagement.activeProject.name = this.name;
      this.$modal.hide('project-settings');
    },
    cancel() {
      this.$modal.hide('project-settings');
    },
  },
};

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
