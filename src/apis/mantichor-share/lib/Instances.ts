import CRUDResource from '@/apis/crud-wrapper/CRUDResource';
import { InstanceObject } from '@/interfaces/Project';

export const Instances = new CRUDResource<InstanceObject>(`http://localhost:3000/instances`);
