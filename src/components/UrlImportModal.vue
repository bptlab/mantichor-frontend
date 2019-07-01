<template>
  <modal name="url-import-modal">
    <div class="vue-dialog">
      <div class="dialog-content">
        <div class="dialog-c-title">Import shared Diagram</div>
        <div class="dialog-c-text">
          <input type="text" placeholder="Share-ID" v-model="shareId">
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
import { Component, Vue, Prop } from 'vue-property-decorator';

export default {
  name: 'UrlImportModal',
  data: function () {
    return {
      shareId: ''
    }
  },
  methods: {
    importFromUrl() {
      console.log(this.shareId);
      this.$projectmanagement.importSharedProject(this.shareId);
      this.$modal.hide('url-import-modal');
    }
  }
}

</script>

<style lang="less">
</style>
