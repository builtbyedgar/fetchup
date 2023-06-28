/**
 *
 */
class FetchUp implements IFetchup {
  private static instance: FetchUp
  private controller: AbortController

  constructor() {
    this.controller = new AbortController()
  }

  public static getInstance(): FetchUp {
    if (!FetchUp.instance) {
      FetchUp.instance = new FetchUp()
    }
    return FetchUp.instance
  }

  async get<T>(
    config: RequestConfig | RequestConfig[],
  ): Promise<ApiResponse<T> | ApiResponse<T>[]> {
    const isMultipleRequests = Array.isArray(config)
    const requests = isMultipleRequests
      ? config.map(this.createRequest)
      : [this.createRequest(config as RequestConfig)]

    const signal = this.controller.signal

    const promises = requests.map((request) =>
      window.fetch(request, { signal }).then(this.handleResponse),
    )

    try {
      const responses = await Promise.all(promises)
      return isMultipleRequests
        ? (responses as ApiResponse<T>[])
        : (responses[0] as ApiResponse<T>)
    } catch (error) {
      throw error
    }
  }

  private createRequest(config: RequestConfig): Request {
    return typeof config === 'string' ? new Request(config) : config
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json()
    return {
      status: response.status,
      data: data as T,
    }
  }

  abort(): void {
    this.controller.abort()
  }
}

const Fetchup = FetchUp.getInstance()
const abort = Fetchup.abort
const get = Fetchup.get

export {Fetchup as default, abort, get }
