
import _Vue from 'vue';
import Project from '@/interfaces/Project';
import bpmnBlank from 'raw-loader!@/resources/newDiagram.bpmn';

export default function install(Vue: typeof _Vue, options = {}) {
  Vue.prototype.$projectmanagement = new ProjectManagement();
}

// tslint:disable-next-line: max-classes-per-file
export class  ProjectManagement {
  // region public static methods
  // endregion

  // region private static methods
  public static createRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  // endregion

  // region public members
  public storeVM = new _Vue({
    data() {
      return {
        projects: [],
        projectNumber: 0,
      };
    },
  });

  get projects(): Project[] {
    return this.storeVM.$data.projects;
  }

  set projects(projects: Project[]) {
    this.storeVM.$data.projects = projects;
  }

  get activeProject(): Project {
    const activeProject = this.projects.find((project) => project.isActive);
    if (!activeProject) {
      if (this.projects.length <= 0) {
        return this.addBlankProject();
      }
      this.activeProject = this.projects[0];
      return this.projects[0];
    }
    return activeProject;
  }

  set activeProject(project: Project) {
    this.resetActiveProject();
    project.isActive = true;

    this.saveProjects();
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    this.loadProjects();
  }
  // endregion

  // region public methods
  public addBlankProject(): Project {
    const blankProject: Project = {
      id: ProjectManagement.createRandomId(),
      name: ('0' + (this.projects.length + 1)).slice(-2),
      isActive: true,
      bpmnXML: bpmnBlank,
      dateSaved: new Date(),
    };
    this.projects.push(blankProject);
    this.activeProject = blankProject;
    return blankProject;
  }

  public removeProject(projectToRemove: Project): void {
    const projectIndex = this.projects.findIndex((project) => project.id === projectToRemove.id);
    if (projectIndex < 0) {
      return;
    }

    this.projects.splice(projectIndex, 1);
    if (this.projects.length <= 0) {
      this.addBlankProject();
      return;
    }

    this.activeProject = this.projects[0];
  }

  public saveProjects() {
    const parsedProjects = JSON.stringify(this.projects);
    localStorage.setItem('projects', parsedProjects);
  }
  // endregion

  // region private methods
  private loadProjects() {
    if (localStorage.projects) {
      this.projects = JSON.parse(localStorage.projects);
      return;
    }
    this.addBlankProject();
  }

  private resetActiveProject(): void {
    for (const project of this.projects) {
      project.isActive = false;
    }
  }
  // endregion
}
