
import { ChoreographyInstances } from '@/apis/mantichor-blockchain/mantichor-blockchain';
import bpmnBlank from 'raw-loader!@/resources/newDiagram.bpmn';
import parser from 'fast-xml-parser';

export interface ProjectObject {
  id: string;
  name: string;
  bpmnXML: string;
  dateSaved: Date;
}

export default class Project implements ProjectObject {
  public static createRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  public id: string;
  public name: string;
  public bpmnXML: string;
  public dateSaved: Date;

  get initials(): string {
    return this.name.slice(0, 2).toUpperCase();
  }

  constructor(project?: ProjectObject) {
    if (!project) {
      this.id = Project.createRandomId();
      this.name = '';
      this.bpmnXML = bpmnBlank;
      this.dateSaved = new Date();
      return this;
    }

    this.id = project.id;
    this.name = project.name;
    this.bpmnXML = project.bpmnXML;
    this.dateSaved = project.dateSaved;
  }

  public getParticipants(): any {
    const parserOptions = {
      attributeNamePrefix: '',
      ignoreAttributes: false,
      ignoreNameSpace: true,
    };
    const jsonObj = parser.parse(this.bpmnXML, parserOptions);
    return jsonObj.definitions.choreography.participant;
  }
}

export interface Mapping {
  role: string;
  address: string;
}

// tslint:disable-next-line: max-classes-per-file
export class Model extends Project {
  public async deploy(mappings: Mapping[]): Promise<Instance> {
    return ChoreographyInstances.create(this, mappings);
  }
}

export interface InstanceObject extends ProjectObject {
  address: string;
  mappings: Mapping[];
}

// tslint:disable-next-line: max-classes-per-file
export class Instance extends Project implements InstanceObject {
  public address: string;
  public mappings: Mapping[];

  constructor(instance?: InstanceObject) {
    super(instance);
    if (!instance) {
      this.address = '';
      this.mappings = [];
      return;
    }

    this.address = instance.address;
    this.mappings = instance.mappings;
  }
}
