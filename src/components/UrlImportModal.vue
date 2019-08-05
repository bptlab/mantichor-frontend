<template>
  <modal name="url-import-modal" @before-open="beforeOpen">
    <div class="vue-dialog dialog">
      <div class="dialog-content">
        <h1 class="dialog-title">Import Project</h1>
        <div class="dialog-form">
          <input type="text" placeholder="Share-ID" v-model="shareId" />
        </div>
      </div>
      <div class="vue-dialog-buttons">
        <button
          type="button"
          class="vue-dialog-button"
          style="flex: 1 1 100%;"
          @click="importFromUrl"
        >IMPORT</button>
      </div>
    </div>
  </modal>
</template>

<script lang="js">

export default {
  name: 'UrlImportModal',
  data: () => {
    return {
      shareId: '',
      projectmanagement: undefined,
    };
  },
  methods: {
    beforeOpen(event) {
      this.projectmanagement = event.params.projectmanagement;
    },
    importFromUrl() {
      this.projectmanagement.importProject(this.shareId);
      this.$modal.hide('url-import-modal');
    },
  },
};

</script>

<style lang="less">
.v--modal-overlay .v--modal-box {
  height: unset !important;
}
</style>
