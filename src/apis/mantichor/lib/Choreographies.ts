import Resource from '@/apis/crud-wrapper/Resource';
import CRUDResource from '@/apis/crud-wrapper/CRUDResource';

export interface Choreography extends Resource {
  name: string;
  bpmnXML: string;
  dateSaved: Date;
}

export const Choreographies = new CRUDResource<Choreography>(`http://localhost:3000/choreographies`);
