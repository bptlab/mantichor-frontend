import CRUDResource from '@/apis/crud-wrapper/CRUDResource';
import { ProjectObject } from '@/interfaces/Project';

export const Models = new CRUDResource<ProjectObject>(`http://localhost:3000/models`);
