import CRUDResource from '@/apis/crud-wrapper/CRUDResource';
import { ProjectObject } from '@/interfaces/Project';

export const Models = new CRUDResource<ProjectObject>(`${process.env.VUE_APP_SHARE_SERVER_BASE_URL}/models`);
