<template>
  <div id="app">
    <div id="nav">
      <Sidebar/>
      <Header/>
      <project-settings-modal/>
      <url-import-modal/>
      <share-modal/>
      <v-dialog/>
    </div>
    <router-view/>
    <notifications class="notify"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import ProjectSettingsModal from '@/components/ProjectSettingsModal.vue';
import UrlImportModal from '@/components/UrlImportModal.vue';
import ShareModal from '@/components/ShareModal.vue';

@Component({
  components: {
    Sidebar,
    Header,
    ProjectSettingsModal,
    UrlImportModal,
    ShareModal,
  },
})
export default class App extends Vue { }
</script>


<style lang="less">
body {
  margin: 0;
  padding: 0;
  background-color: #252527;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fff;
  color: #252527;
  margin-left: 80px;
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
.execution .selected:not(.djs-connection) .djs-visual > :nth-child(1) {
  // fill: #01a7c2 !important;
  stroke: #01a7c2 !important;
}
</style>
