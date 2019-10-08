<template>
  <main class="landing">
    <ul>
      <li class="headline">Model</li>
      <li>
        <button title="open BPMN diagram from local file system" @click="openNew()">
          <font-awesome-icon icon="plus" />
        </button>
      </li>
      <li>
        <button title="open BPMN diagram from local file system" @click="openLocal()">
          <font-awesome-icon icon="folder-open" />
        </button>
        <input id="inpLoadModel" style="display: none" type="file" name="name" accept=".bpmn, .xml" @change="loadModel()" />
      </li>
      <li class="headline">Instance</li>
      <li>
        [get shared instance]
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

import newDiagram from 'raw-loader!@/resources/newDiagram.bpmn';

@Component({
  components: {
  },
})

export default class Landing extends Vue {

  private openLocal() {
    document.getElementById('inpLoadModel')!.click();
  }

  private openNew() {
    this.$definitionsStore.setDefinitionsFromXML(newDiagram).then(() => {
      this.$router.push('model');
    });
  }

  private loadModel() {
    const reader = new FileReader();
    const fileInput = document.getElementById('inpLoadModel') as HTMLInputElement;

    const files = fileInput.files;
    const file = files === null ? undefined : files[0];

    reader.addEventListener('load', () => {
      const newXML = reader.result;
      if (typeof newXML === 'string') {
        this.$definitionsStore.setDefinitionsFromXML(newXML).then(() => {
          this.$router.push('model');
        });
      }
    }, false);

    if (file) {
      reader.readAsText(file);
    }
  }

}
</script>

<style scoped lang="less">
@import "../styles.less";

main.landing {
  ul {
    display: flex;
    flex-direction: column;

    list-style-type: none;
    margin: 30px 0px;
    padding: 0px;

    li {
      padding: 10px 40px;
      margin-bottom: 10px;

      &.headline {
        font-weight: bold;
        background-color: @secondary;
      }

      &.divider {

      }
    }
  }
}

</style>
