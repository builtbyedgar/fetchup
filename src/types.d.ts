interface ApiResponse<T = undefined> {
  /** The promise status. Will be an string or a number (status code) */
  status: string | number
  /** The reason why the promise are rejected */
  reason?: string
  /** The data */
  data?: T | undefined
}

interface CustomRequest {
  url: string
  options?: Partial<Request>
}

type RequestConfig = CustomRequest | string

interface IFetchup {
  /** Make the request or requests */
  request<T>(
    config: RequestConfig | RequestConfig[],
  ): Promise<ApiResponse<T> | ApiResponse<T>[] | Error>
  /** Abort the request or requests */
  abort(): void
}
