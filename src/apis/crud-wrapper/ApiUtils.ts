export default class ApiUtils {
  // region public static methods
  public static async postJsonResource(url: string, resource: any): Promise<any> {
    const requestOptions = {
      method: 'POST',
      headers: ApiUtils.headers(),
      body: JSON.stringify(resource),
    };
    return ApiUtils.fetchResource(url, requestOptions);
  }

  public static async getJsonResource(url: string): Promise<any> {
    const requestOptions = {
      method: 'GET',
      headers: ApiUtils.headers(),
    };
    return ApiUtils.fetchResource(url, requestOptions);
  }

  public static async patchJsonResource(url: string, resource: any): Promise<void> {
    const requestOptions = {
      method: 'PATCH',
      headers: ApiUtils.headers(),
      body: JSON.stringify(resource),
    };
    await ApiUtils.fetchResource(url, requestOptions);
  }

  public static async deleteJsonResource(url: string): Promise<void> {
    const requestOptions = {
      method: 'DELETE',
      headers: ApiUtils.headers(),
    };
    await ApiUtils.fetchResource(url, requestOptions);
  }
  // endregion

  // region private static methods
  private static headers(): any {
    return { 'Content-Type': 'application/json' };
  }

  private static async fetchResource(url: string, options: RequestInit): Promise<any> {
    let response;
    try {
      response = await fetch(url, options);
    } catch (e) {
      throw new Error('Connection to server failed. Please try again.');
    }

    if (response.statusText === 'No Content') {
      return;
    }

    return response.json();
  }
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
