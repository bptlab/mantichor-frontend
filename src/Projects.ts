class Projects {
  public projects: Project[];

  constructor() {
    this.projects = this.loadProjects();
  }

  public get allProjects(): Project[] {
    return this.projects;
  }

  /**
   * loadProjects
   */
  public loadProjects(): Project[] {
    if (localStorage.projects) {
      return JSON.parse(localStorage.projects);
    }
    return [];
  }
}

interface Project {
  id: string;
  name: string;
  isActive: boolean;
  bpmnXML: string;
  dateSaved: Date;
}

function loadProjects(): Project[] {
  if (localStorage.projects) {
    return JSON.parse(localStorage.projects);
  }
  return [];
}

// import { Component, Vue, Model } from 'vue-property-decorator';

// interface Project {
//   id: string;
//   name: string;
//   isActive: boolean;
//   bpmnXML: string;
// }

// @Component
// export default class Projects extends Vue {
//   public projects: Project[];

//   public get allProjects(): Project[] {
//     return this.projects;
//   }

//   public get activeProject(): Project {
//     return this.projects.filter((project) => project.isActive)[0];
//   }

//   constructor() {
//     super();
//     this.projects = this.loadProjects();
//   }

//   public loadProjects(): Project[] {
//     if (localStorage.projects) {
//       return JSON.parse(localStorage.projects);
//     }
//     return [];
//   }

//   public saveProjects() {
//     const parsed = JSON.stringify(this.projects);
//     localStorage.setItem('projects', parsed);
//   }

//   public selectProject(project: Project): void {
//     if (project.isActive === true) {
//       this.removeProject(project);
//     }
//     this.resetProjects();
//     project.isActive = true;
//     this.saveProjects();
//   }

//   public addProject(): void {
//     const projectNumber = this.projects.length + 1;
//     const newProject: Project = {
//       id: this.generateRandomID(16),
//       name: String(('0' + projectNumber).slice(-2)),
//       isActive: false,
//       bpmnXML: '',
//     };

//     if (!newProject) {
//       return;
//     }

//     this.$root.$emit('createNewDiagram');

//     this.projects.push(newProject);
//     this.selectProject(newProject);
//     // this.saveModels();
//   }

//   public removeProject(project: Project): void {
//     for (let i = 0; i < this.projects.length; i++) {
//       if (this.projects[i] === project) {
//         this.projects.splice(i, 1);
//         this.saveProjects();
//         break;
//       }
//     }
//   }

//   private resetProjects(): void {
//     for (const project of this.projects) {
//       project.isActive = false;
//     }
//   }

//   private generateRandomID(length: number): string {
//     let result = '#';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     // let charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
//   }
// }
