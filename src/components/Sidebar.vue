<template>
  <aside>
    <div class="sidebar-header">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <nav>
      <ul>
        <li
          v-for="model in models"
          :class="{active: model.isActive}"
          :key="model.text"
          @click="selectModel(model)">
          <h1>{{ model.text }}</h1>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface Model {
  text: string;
  isActive: boolean;
}

@Component
export default class Sidebar extends Vue {
  private static defaultModels(): Model[] {
    return [
        { text: 'AA', isActive: true },
        { text: 'BB', isActive: false },
        { text: 'CC', isActive: false },
        { text: 'DD', isActive: false },
        { text: 'EE', isActive: false },
        { text: 'FF', isActive: false },
        { text: 'GG', isActive: false },
      ];
  }

  public models: Model[];

  public get activeModels(): Model[] {
    return this.models.filter((model) => model.isActive);
  }

  constructor() {
    super();
    this.models = Sidebar.defaultModels();
  }

  public selectModel(model: Model): void {
    this.resetModels();
    model.isActive = true;
  }

  private resetModels(): void {
    for (const model of this.models) {
      model.isActive = false;
    }
  }
}
</script>

<style lang="less">
aside {
  display: block;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: #252527;
  color: #fff;
  text-align: left;
  width: 80px;
  .sidebar-header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    img {
      height: 30px;
      width: auto;
    }
  }
  nav {
    margin: 0;
    max-height: 100%;
    overflow-y: scroll;
    ul {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        width: 100%;
        height: 80px;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      li:hover {
        background-color: #515254;
        box-shadow: 4px 0 0 #CCCCCC inset;
      }
      li > h1 {
        border-radius: 100%;
        border: 2px solid #3e3f42;
        background-color: #9e9fa0;
        text-align: center;
        margin: 14px 0 0 15px;
        font-size: 1.4em;
        line-height: 50px;
        width: 50px;
        height: 50px;
      }
      li.active {
        background-color: #515254;
        box-shadow: 4px 0 0 #75b900 inset;
      }
    }
  }
}
</style>
