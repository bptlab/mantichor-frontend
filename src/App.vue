<template>
  <div id="app">
    <div id="content">
      <div id="nav">
        <Header/>
        <project-settings-modal/>
        <url-import-modal/>
        <deploy-modal/>
        <share-modal/>
        <v-dialog/>
      </div>
      <router-view/>
    </div>
    <notifications class="notify"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import ProjectSettingsModal from '@/components/ProjectSettingsModal.vue';
import UrlImportModal from '@/components/UrlImportModal.vue';
import DeployModal from '@/components/DeployModal.vue';
import ShareModal from '@/components/ShareModal.vue';

@Component({
  components: {
    Header,
    ProjectSettingsModal,
    UrlImportModal,
    DeployModal,
    ShareModal,
  },
})
export default class App extends Vue { }
</script>


<style lang="less">
@import "styles.less";

div#content {
  display: flex;
  flex-direction: column;

  > :nth-child(2) {
    flex-grow: 1;
  }
}

body {
  margin: 0;
  padding: 0;
  background-color: #252527;
}

#app, #content {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fff;
  color: #252527;

  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  min-width: 600px;
  min-height: 400px;
}

#nav {
  background-color: #252527;
}

.notify {
  margin-right: 20px;
  margin-top: 40px;
}
.bjs-powered-by,
.cjs-powered-by,
.djs-powered-by,
.io-control {
  background: #ffffff;
  border-radius: 2px;
  border: solid 1px #e0e0e0;
  padding: 5px;
  hr {
    border: none;
    border-top: solid 1px #eeeeee;
  }
}
.execution .enabled:not(.djs-connection) .djs-visual > :nth-child(1) {
  // fill: #01a7c2 !important;
  stroke: @accent !important;
}
.execution .deployed:not(.djs-connection) .djs-visual > g > path {
  fill: #cc2222 !important;
  stroke: #cc2222 !important;
}
</style>
