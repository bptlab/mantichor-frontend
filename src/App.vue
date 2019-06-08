<template>
  <div id="app">
    <div id="nav">
      <Sidebar />
      <Header />
    </div>
    <router-view/>
    <notifications class="notify"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

@Component({
  components: {
    Sidebar,
    Header,
  },
})
export default class App extends Vue {}
</script>


<style lang="less">
body {
  margin: 0;
  padding: 0;
  background-color: #3e3f42;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fff;
  color: #3e3f42;
  margin-left: 80px;
}
#nav {
  background-color: #252527;
}
.notify {
  margin-right: 20px;
  margin-top: 40px;
}
.selected:not(.djs-connection) .djs-visual > :nth-child(1) {
  // fill: #01a7c2 !important;
  stroke: #01a7c2 !important;
}
</style>
