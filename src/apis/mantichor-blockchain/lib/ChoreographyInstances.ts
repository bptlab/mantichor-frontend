import ApiUtils from '@/apis/crud-wrapper/ApiUtils';
import { Mapping, Instance, Model } from '@/interfaces/Project';

// tslint:disable-next-line: max-classes-per-file
export class ChoreographyInstances {
  // region public static methods
  public static baseUrl = 'http://localhost:7320';

  public static async create(model: Model, mappings: Mapping[]): Promise<Instance> {
    const instanceResponse = await ApiUtils.postJsonResource(`${this.baseUrl}/choreographies`, { xml: model.bpmnXML });
    const instance = new Instance(Object.assign({
      address: instanceResponse.address,
      mappings,
    }, model));
    const accounts = await ChoreographyInstances.getAccounts();
    await ChoreographyInstances.executeTask(instance, accounts[0], ['init']);
    return instance;
  }

  public static async getEnabledTasks(instance: Instance): Promise<string[][]> {
    return ApiUtils
      .postJsonResource(`${this.baseUrl}/choreographies/${instance.address}/tasks`, { xml: instance.bpmnXML });
  }

  public static async getAccounts(): Promise<string[]> {
    const accountsResponse = await ApiUtils.getJsonResource(`${this.baseUrl}/accounts`);
    return accountsResponse.accounts;
  }

  public static async executeTask(instance: Instance, account: string, task: string[]): Promise<void> {
    await ApiUtils.postJsonResource(`${this.baseUrl}/choreographies/${instance.address}/tasks/execute`, {
      address: account,
      xml: instance.bpmnXML,
      task,
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
