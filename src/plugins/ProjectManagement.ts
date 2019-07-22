
import _Vue from 'vue';
import { ProjectObject, Instance, Model } from '@/interfaces/Project';
import { Choreographies } from '@/apis/mantichor-share/mantichor-share';


export default function install(Vue: typeof _Vue, options = {}) {
  Vue.prototype.$modelmanagement = new ProjectManagement<Model>(Model);
  Vue.prototype.$instancemanagement = new ProjectManagement<Instance>(Instance);
}

export class ProjectManagement<T extends ProjectObject> {
  public c: new (p: any) => T;

  public storeVM = new _Vue({
    data() {
      return {
        projects: [],
        activeProject: undefined,
      };
    },
  });

  get projects(): T[] {
    return this.storeVM.$data.projects;
  }

  set projects(projects: T[]) {
    this.storeVM.$data.projects = projects;
    this.saveProjects();
  }

  get activeProject(): T | undefined {
    if (this.projects.length <= 0) {
      return undefined;
    }
    if (!this.storeVM.$data.activeProject) {
      this.activeProject = this.projects[0];
    }
    return this.storeVM.$data.activeProject;
  }

  set activeProject(project: T | undefined) {
    this.storeVM.$data.activeProject = project;
    this.saveProjects();
  }

  constructor(c: new (p: any) => T) {
    this.c = c;
    this.loadProjects();
  }

  public addProject(project: T): void {
    if (this.projects.find((p) => p === project)) { return; }
    this.projects.push(project);
    this.activeProject = project;
  }

  public removeProject(project: T): void {
    const projectIndex = this.projects.findIndex((p) => project.id === p.id);

    if (projectIndex < 0) { return; }

    if (this.activeProject === project) {
      this.activeProject = undefined;
    }
    this.projects.splice(projectIndex, 1);
  }

  public async shareProject(): Promise<string> {
    if (!this.activeProject) { return ''; }
    const shareResponse = await Choreographies.create(this.activeProject);
    return shareResponse.shareId;
  }

  public async importProject(id: string): Promise<void> {
    const sharedProject = await Choreographies.getOne(id);
    const importedProject = new this.c(sharedProject);
    this.addProject(importedProject);
  }

  public saveProjects(): void {
    const parsedProjects = JSON.stringify(this.projects);
    localStorage.setItem(this.constructor.name, parsedProjects);
  }

  private loadProjects() {
    if (!localStorage[this.constructor.name]) { return; }

    this.projects = JSON
      .parse(localStorage[this.constructor.name])
      .map((project: ProjectObject) => new this.c(project));
  }
}
