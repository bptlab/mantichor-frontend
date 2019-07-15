import ApiUtils from '@/apis/crud-wrapper/ApiUtils';

export interface Mapping {
  role: string;
  address: string;
}

export interface ChoreographyInstance {
  address: string;
  xml: string;
  id?: string;
  mappings?: Mapping[];
}

// tslint:disable-next-line: max-classes-per-file
export class ChoreographyInstances {
  // region public static methods
  public static baseUrl = 'http://localhost:7320';

  public static async create(xml: string, id?: string, mappings?: Mapping[]): Promise<ChoreographyInstance> {
    const instanceResponse = await ApiUtils.postJsonResource(`${this.baseUrl}/choreographies`, { xml });
    const instance: ChoreographyInstance = {
      address: instanceResponse.address,
      xml,
      id,
      mappings,
    };
    const accounts = await ChoreographyInstances.getAccounts();
    await ChoreographyInstances.executeTask(instance, accounts[0], 'init');
    return instance;
  }

  public static async getEnabledTasks(instance: ChoreographyInstance): Promise<string[][]> {
    return ApiUtils.postJsonResource(`${this.baseUrl}/choreographies/${instance.address}/tasks`, { xml: instance.xml });
  }

  public static async getAccounts(): Promise<string[]> {
    const accountsResponse = await ApiUtils.getJsonResource(`${this.baseUrl}/accounts`);
    return accountsResponse.accounts;
  }

  public static async executeTask(instance: ChoreographyInstance, account: string, taskId: string): Promise<void> {
    await ApiUtils.postJsonResource(`${this.baseUrl}/choreographies/${instance.address}/tasks/execute`, {
      address: account,
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
