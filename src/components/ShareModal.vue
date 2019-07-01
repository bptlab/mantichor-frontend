<template>
  <modal name="share-modal" @before-open="getShareId">
    <div class="vue-dialog dialog">
      <div class="dialog-content">
        <h1 class="dialog-title">Share Project</h1>
        <div class="dialog-form">
          <input
            ref="shareInput"
            type="text"
            placeholder="Share-ID"
            v-model="shareId"
            readonly="readonly"
          >
        </div>
      </div>
      <div class="vue-dialog-buttons">
        <button type="button" class="vue-dialog-button" @click="copyShareId">COPY</button>
      </div>
    </div>
  </modal>
</template>

<script lang="js">

export default {
  name: 'ShareModal',
  data: () => {
    return {
      shareId: '',
    };
  },
  methods: {
    async getShareId() {
      this.shareId = await this.$projectmanagement.shareProject();
      this.$refs.shareInput.select();
    },
    copyShareId() {
      this.$refs.shareInput.select();
      document.execCommand("copy");
      this.$modal.hide('share-modal');
    }
  },
};

</script>
