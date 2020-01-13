<template>
  <main class="model">
    <Modeler />
    <PropertiesPanel />
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import PropertiesPanel from '@/components/PropertiesPanel.vue';
import Modeler from '@/components/Modeler.vue';
import { ChoreographyInstances } from '../apis/mantichor-blockchain/mantichor-blockchain';

@Component({
  components: {
    PropertiesPanel,
    Modeler,
  },
})
export default class Model extends Vue {
  private async deploy() {
    this.$modal.show('deploy-modal');
  }

  private mounted() {
  }
}
</script>

<style scoped lang="less">
@import "../styles.less";

main.model {
  display: flex;

  // .floating-buttons {
  //   position: fixed;
  //   bottom: @spacing;
  //   right: @spacing * 5;
  //   margin: 0;
  //   padding: 0;
  //   display: flex;

  //   & > * {
  //     box-shadow: 0 0 0.25em 0.1em @shadow;
  //     border-radius: @border-radius;
  //     padding: 10px;
  //     cursor: pointer;
  //     font-size: 1em;
  //     color: @light;
  //     font-weight: bold;
  //     margin-right: @spacing;
  //   }

  //   & > *:last-child {
  //     margin-right: 0;
  //   }

  //   .green {
  //     background-color: @accent;
  //   }

  //   .red {
  //     background-color: #cc1414;
  //   }
  // }
}
</style>
