<template>
  <aside>
    <div class="sidebar-header">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <nav>
      <ul>
        <li
          v-for="project in $projectmanagement.projects"
          :class="{active: project.isActive}"
          :key="project.id"
          @click="$projectmanagement.activeProject = project"
        >
          <h1>{{ project.name }}</h1>
        </li>
        <li class="add" @click="$projectmanagement.addBlankProject()">
          <h1>+</h1>
        </li>
        <li class="add" @click="openUrlImportModal()">
          <h1>L</h1>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UrlImportModal from '@/components/UrlImportModal.vue';

@Component
export default class Sidebar extends Vue {

  public openUrlImportModal(): void {
    this.$modal.show('url-import-modal');
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
        box-shadow: 4px 0 0 #cccccc inset;
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
      li.add > h1 {
        background-color: #75b900;
        border-color: #75b900;
      }
    }
  }
}
</style>
