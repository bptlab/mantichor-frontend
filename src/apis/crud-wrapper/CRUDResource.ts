import Resource from '@/apis/crud-wrapper/Resource';
import ApiUtils from '@/apis/crud-wrapper/ApiUtils';

export default class CRUDResource<T extends Resource> {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceUrl: string;
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor(resourceUrl: string) {
    this.resourceUrl = resourceUrl;
  }
  // endregion

  // region public methods
  public singleResourceUrl(id: string): string {
    return `${this.resourceUrl}/${id}`;
  }

  public async create(resource: T): Promise<any> {
    return ApiUtils.postJsonResource(this.resourceUrl, resource);
  }

  public async get(): Promise<T[]> {
    return ApiUtils.getJsonResource(this.resourceUrl);
  }

  public async getOne(id: string): Promise<T> {
    const singleResourceUrl = this.singleResourceUrl(id);
    return ApiUtils.getJsonResource(singleResourceUrl);
  }

  public async update(id: string, resource: T): Promise<void> {
    const singleResourceUrl = this.singleResourceUrl(id);
    await ApiUtils.patchJsonResource(singleResourceUrl, resource);
  }

  public async delete(id: string): Promise<void> {
    const singleResourceUrl = this.singleResourceUrl(id);
    await ApiUtils.deleteJsonResource(singleResourceUrl);
  }
  // endregion

  // region private methods
  // endregion
}
