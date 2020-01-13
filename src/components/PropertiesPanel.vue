<template>
  <aside v-if="selection">
    {{ selection.id }}
    {{ something }}
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BaseElement } from 'bpmn-moddle';
import { is } from '@/utils/ModdleUtils';

@Component
export default class PropertiesPanel extends Vue {
  private modeler: any;
  private selection: BaseElement = null;
  private something: string = '';

  private async mounted() {
    this.$root.$on('selectionChanged', (selection: any) => {
      this.selection = selection;
      if (is('bpmn:ChoreographyTask')(this.selection)) {
        this.something = 'task';
      } else {
        this.something = 'other';
      }
    });
  }
}
</script>

<style scoped lang="less">
@import "../styles.less";

aside {
  background-color: @primary;
  color: @light;
  border-left: 4px solid @secondary;

  flex-grow: 0;
  min-width: 200px;
  max-width: 200px;
  width: 200px;
  overflow: hidden;
}
</style>
