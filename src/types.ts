export interface ApiResponse<T = undefined> {
  /** The promise status. Will be an string or a number (status code) */
  status: string | number
  /** The reason why the promise are rejected */
  reason?: string
  /** The data */
  data?: T | undefined
}

export interface CustomRequest {
  url: string
  options?: Partial<Request>
}

export type RequestConfig = CustomRequest | string

export interface IFetchup {
  /** Make the request or requests */
  request<T>(config: RequestConfig | RequestConfig[]): Promise<ApiResponse<T> | ApiResponse<T>[] | Error>
  /** Abort the request or requests */
  abort(): void
}
