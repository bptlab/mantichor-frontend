<template>
  <aside>
    <div class="sidebar-header">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <nav>
      <ul>
        <li
          v-for="project in projects"
          :class="{active: project.isActive}"
          :key="project.id"
          @click="selectProject(project)">
          <h1>{{ project.name }}</h1>
        </li>
      </ul>
      <ul>
        <li
          class="add"
          @click="addProject()">
          <h1>+</h1>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator';
// import '@/Projects';

interface Project {
  id: string;
  name: string;
  isActive: boolean;
  bpmnXML: string;
}

@Component
export default class Sidebar extends Vue {
  // @Prop() projects: Projects;

  // constructor() {
  //   super();
  //   this.projects = Projects.loadProjects();
  // }

  // private static defaultProjects(): Project[] {
  //   return [
  //       // { text: 'AA', isActive: true },
  //       // { text: 'BB', isActive: false },
  //       // { text: 'CC', isActive: false },
  //       // { text: 'DD', isActive: false },
  //       // { text: 'EE', isActive: false },
  //       // { text: 'FF', isActive: false },
  //       // { text: 'GG', isActive: false },
  //     ];
  // }


  public projects: Project[];

  public get activeProject(): Project {
    return this.projects.filter((project) => project.isActive)[0];
  }

  constructor() {
    super();
    // this.projects = Projects.prototype.projects;
    this.projects = this.loadProjects();
  }

  public loadProjects(): Project[] {
    if (localStorage.projects) {
      return JSON.parse(localStorage.projects);
    }
    return [];
  }

  public saveProjects() {
    const parsed = JSON.stringify(this.projects);
    localStorage.setItem('projects', parsed);
  }

  public selectProject(project: Project): void {
    if (project.isActive === true) {
      this.removeProject(project);
    }
    this.resetProjects();
    project.isActive = true;
    this.saveProjects();
  }

  public addProject(): void {
    const projectNumber = this.projects.length + 1;
    const newProject: Project = {
      id: this.generateRandomID(16),
      name: String(('0' + projectNumber).slice(-2)),
      isActive: false,
      bpmnXML: '',
    };

    if (!newProject) {
      return;
    }

    this.$root.$emit('createNewDiagram');

    this.projects.push(newProject);
    this.selectProject(newProject);
    // this.saveModels();
  }

  public removeProject(project: Project): void {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i] === project) {
        this.projects.splice(i, 1);
        this.saveProjects();
        break;
      }
    }
  }

  private resetProjects(): void {
    for (const project of this.projects) {
      project.isActive = false;
    }
  }

  private generateRandomID(length: number): string {
    let result = '#';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  private mounted() {
    // this.$root.$on('getActiveDiagram', () => {
    //   return this.activeProject();
    // });
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
      li.add > h1 {
        background-color: #75b900;
        border-color: #75b900;
      }
    }
  }
}
</style>
