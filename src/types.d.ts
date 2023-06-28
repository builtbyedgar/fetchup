type ApiResponse<T = undefined> = {
  /** The promise status. Will be an string or a number (status code) */
  status: string | number
  /** The reason why the promise are rejected */
  reason?: string
  /** The data */
  data?: T | undefined
}

type RequestConfig =
  | string
  | {
      /** The url */
      url: string
      /** The `Request` options */
      options?: Partial<Request>
    }
