interface ApiResponse<T> {
  status: number
  data: T
}

type RequestConfig = Request | string

interface IFetchup {
  get<T>(config: RequestConfig | RequestConfig[]): Promise<ApiResponse<T> | ApiResponse<T>[]>
  abort(): void
}
