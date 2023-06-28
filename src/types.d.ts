/**
 * This Ftchup API type represents a resource request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request)
 */
type RequestConfig =
  | string
  | {
      /** The url */
      url: string
      /** The `Request` options */
      options?: Partial<Request>
    }

/**
 * This Ftchup API type represents a request response.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#return_value)
 */
type ApiResponse<T = undefined> = {
  /** The promise status. Will be an string or a number (status code) */
  status: string | number
  /** The reason why the promise are rejected */
  reason?: string
  /** The data */
  data?: T | undefined
}
