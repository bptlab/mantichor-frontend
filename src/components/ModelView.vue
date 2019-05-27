<template>
  <div class="modelview">
    <div id="canvas"></div>
    <h1>{{ message }}</h1>
    <p>Here, the Chor JS needs to be implemented</p>
    <div class="floating-button">
      Deploy
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChoreoModeler from 'chor-js';

const modeler = new ChoreoModeler({
  container: '#canvas',
});

@Component
export default class ModelView extends Vue {
  private data() {
    return {
      message: 'This is the Model View',
    };
  }
}

</script>

<style scoped lang="less">
  #canvas {
    height: 400px;
  }
  .floating-button {
    position: fixed;
    bottom: 40px;
    right: 40px;
    background-color: #75b900;
    padding: 10px;
    border-radius: 40px;
    font-size: 1em;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    box-shadow: -4px 4px 4px #3e3f42;
  }
</style>
