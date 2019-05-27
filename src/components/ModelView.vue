<template>
  <div class="modelview">
    <div id="canvas"></div>
    <div class="floating-button">
      Deploy
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChoreoModeler from 'chor-js';

@Component
export default class ModelView extends Vue {

  private mounted() {
    const modeler = new ChoreoModeler({
      container: '#canvas',
      keyboard: {
        bindTo: document,
      },
    });
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
    box-shadow: -4px 4px 4px #dddddd;
  }
</style>
