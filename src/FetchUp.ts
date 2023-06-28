/**
 * A TypeScript library that provides a simplified and type-safe way to handle API
 * calls using the native JavaScript Fetch API. It offers a convenient interface for
 * making single or multiple requests, with the ability to cancel ongoing requests.
 */
class Fetchup implements IFetchup {
  private static instance: Fetchup
  private controller: AbortController

  constructor() {
    this.controller = new AbortController()
  }

  /**
   * Create an instance of FetchUp
   *
   * @returns {Fetchup}
   */
  public static getInstance(): Fetchup {
    if (!Fetchup.instance) {
      Fetchup.instance = new Fetchup()
    }

    return Fetchup.instance
  }

  /**
   * Make a request
   *
   * @param {RequestConfig | RequestConfig[]}
   * @returns {Promise<ApiResponse<T> | ApiResponse<T>[] | Error>}
   */
  async request<T>(
    config: RequestConfig | RequestConfig[],
  ): Promise<ApiResponse<T> | ApiResponse<T>[] | Error> {
    const multi = Array.isArray(config)

    const requests = multi
      ? config.map(Fetchup.instance.createRequest)
      : [Fetchup.instance.createRequest(config as RequestConfig)]

    const promises = requests.map((request) =>
      window.fetch(request).then(Fetchup.instance.handleResponse),
    )

    try {
      const responses = await Promise.allSettled(promises)
      const results = responses.map(Fetchup.instance.parseSettledResponse)

      if (multi) {
        return results as ApiResponse<T>[]
      } else {
        return results[0] as ApiResponse<T>
      }
    } catch (error: Error | any | unknown) {
      return new Error(
        error?.map((e: any) => e.message).join('\n') ?? 'unknown',
      )
    }
  }

  /**
   * Normalize the requests
   *
   * @param {RequestConfig}
   * @returns {Request}
   */
  private createRequest(config: RequestConfig): Request {
    const signal = Fetchup.instance.controller.signal
    if (typeof config === 'string') {
      return new Request(config, { signal })
    }

    const { url, options } = config
    return new Request(url, { ...options, signal })
  }

  /**
   * Handle requests response
   *
   * @param {Response}
   * @returns {Promise<ApiResponse<T>>}
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json()
    return {
      status: response.status,
      data: data as T,
    }
  }

  /**
   * Parse settled response
   *
   * @param {PromiseSettledResult<ApiResponse<T>>}
   * @returns {ApiResponse<T>}
   */
  private parseSettledResponse<T>(
    resp: PromiseSettledResult<ApiResponse<T>>,
  ): ApiResponse<T> {
    if (resp.status === 'fulfilled') {
      return resp.value
    } else {
      return {
        status: 'rejected',
        reason: resp.reason || 'failed to fetch',
      }
    }
  }

  /**
   * Cancel request
   */
  abort(): void {
    this.controller.abort()
  }
}

/**
 * @internal
 *
 * The lib API
 */
const fetchup = Fetchup.getInstance()
const abort = fetchup.abort
const request = fetchup.request

export { fetchup as default, abort, request }
