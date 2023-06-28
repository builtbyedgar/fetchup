/**
 * @license Ftchup
 *
 * Copyright (c) Edgar Bermejo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
class Ftchup {
  private static instance: Ftchup
  private controller: AbortController

  constructor() {
    this.controller = new AbortController()
  }

  /**
   * Create an instance of FetchUp
   *
   * @returns {Ftchup}
   */
  public static getInstance(): Ftchup {
    if (!Ftchup.instance) {
      Ftchup.instance = new Ftchup()
    }

    return Ftchup.instance
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
      ? config.map(Ftchup.instance.createRequest)
      : [Ftchup.instance.createRequest(config as RequestConfig)]

    const promises = requests.map((request) =>
      window.fetch(request).then(Ftchup.instance.handleResponse),
    )

    try {
      const responses = await Promise.allSettled(promises)
      const results = responses.map(Ftchup.instance.parseSettledResponse)

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
    const signal = Ftchup.instance.controller.signal
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
    Ftchup.instance.controller.abort()
  }
}

/**
 * @internal
 *
 * The lib API
 */
const ftchup = Ftchup.getInstance()
const abort = ftchup.abort
const request = ftchup.request

export { ftchup as default, abort, request }
