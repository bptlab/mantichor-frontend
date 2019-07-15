import ApiUtils from '@/apis/crud-wrapper/ApiUtils';

export interface Mapping {
  role: string;
  address: string;
}

export interface ChoreographyInstance {
  address: string;
  id?: string;
  xml: string;
  mappings?: Mapping[];
}

// tslint:disable-next-line: max-classes-per-file
export class ChoreographyInstances {
  // region public static methods
  public static baseUrl = 'http://localhost:7320/choreographies';

  public static async create(xml: string): Promise<ChoreographyInstance> {
    const instanceResponse = await ApiUtils.postJsonResource(ChoreographyInstances.baseUrl, { xml });
    const instance: ChoreographyInstance = {
      address: instanceResponse.address,
      xml,
    };
    await ChoreographyInstances.executeTask(instance, 'init');
    return instance;
  }

  public static async getEnabledTasks(instance: ChoreographyInstance): Promise<string[]> {
    return ApiUtils.getJsonResource(`${this.baseUrl}/${instance.id}/tasks`);
  }

  public static async executeTask(instance: ChoreographyInstance, taskId: string): Promise<void> {
    ApiUtils.postJsonResource(`${this.baseUrl}/${instance.address}/tasks/execute`, {
      address: instance.address,
      xml: instance.xml,
      task: [
        taskId,
      ],
    });
  }
  // endregion

  // region private static methods
  // endregion

  // region public members
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion

}
