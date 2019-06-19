
import Project from '@/interfaces/Project';

export default class ProjectUtils {
  public projects!: Project[];

  public get activeProject(): Project {
    return this.projects.filter((project) => project.isActive)[0];
    // let activeProject: Project = this.projects[0];
    // this.projects.forEach((project) => {
    //   if (project.isActive) {
    //     activeProject = project;
    //   }
    // });
    // return activeProject;
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
    this.resetProjects();
    project.isActive = true;

    this.saveProjects();
    // this.$root.$emit('didSelectProject', project);
  }

  public resetProjects(): void {
    for (const project of this.projects) {
      project.isActive = false;
    }
  }

  public addProject(): void {
    const projectNumber = this.projects.length + 1;
    const newProject: Project = {
      id: this.generateRandomID(16),
      name: String(('0' + projectNumber).slice(-2)),
      isActive: false,
      bpmnXML: '',
      dateSaved: new Date(),
    };

    if (!newProject) {
      return;
    }

    this.projects.push(newProject);
    this.selectProject(newProject);
  }

  public removeProject(project: Project): void {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i] === project) {
        this.projects.splice(i, 1);
        if (this.projects.length > 0) {
          this.selectProject(this.projects[0]);
        }
        this.saveProjects();
        break;
      }
    }
  }

  private generateRandomID(length: number): string {
    let result = '#';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
