<template>
  <aside>
    <div class="sidebar-header">
      <img alt="Mantichor logo" src="../assets/logo.svg">
    </div>
    <nav>
      <ul>
        <li
          v-for="project in projectmanagement.projects"
          :class="{active: projectmanagement.activeProject ? project.id == projectmanagement.activeProject.id : false}"
          :key="project.id"
          @click="projectmanagement.activeProject = project"
        >
          <h1>{{ project.initials }}</h1>
        </li>
        <li v-if="isModeler" class="add" @click="addNewProject()">
          <h1>+</h1>
        </li>
        <li v-if="isModeler" class="download" @click="openUrlImportModal()">
          <h1>
            <font-awesome-icon icon="cloud-download-alt" />
          </h1>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import UrlImportModal from '@/components/UrlImportModal.vue';
import Project, { Model } from '@/interfaces/Project';
import { ProjectManagement } from '../plugins/ProjectManagement';

@Component
export default class Sidebar extends Vue {

  @Prop({ type: Boolean })
  public isModeler!: boolean;

  public projectmanagement: ProjectManagement<Project>;

  constructor() {
    super();
    if (this.isModeler) {
      this.projectmanagement = this.$modelmanagement;
    } else {
      this.projectmanagement = this.$instancemanagement;
    }
  }

  public openUrlImportModal(): void {
    this.$modal.show('url-import-modal');
  }

  public addNewProject(): void {
    this.$modelmanagement.addProject(new Model());
  }

}
</script>

<style lang="less">
@import "../styles.less";

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
    height: @element-size;
    img {
      height: 30px;
      width: auto;
    }
  }
  nav {
    margin: 0;
    max-height: calc(100% - @element-size);
    overflow-y: scroll;
    scrollbar-width: none;
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
      li.download > h1 {
        background-color: #75b900;
        border-color: #75b900;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  nav::-webkit-scrollbar {
    display: none;
  }
}
</style>
