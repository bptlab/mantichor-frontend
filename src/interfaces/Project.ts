
interface ProjectObject {
  id: string;
  name: string;
  isActive: boolean;
  bpmnXML: string;
  dateSaved: Date;
}

export default class Project {
  public id: string;
  public name: string;
  public isActive: boolean;
  public bpmnXML: string;
  public dateSaved: Date;

  get initials(): string {
    return this.name.slice(0, 2).toUpperCase();
  }

  constructor(project: ProjectObject) {
    this.id = project.id;
    this.name = project.name;
    this.isActive = project.isActive;
    this.bpmnXML = project.bpmnXML;
    this.dateSaved = project.dateSaved;
  }
}
