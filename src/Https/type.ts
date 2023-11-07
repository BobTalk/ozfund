type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

interface AxiosRequest {
    baseURL?: string;
    url: string;
    data?: any;
    params?: any;
    method?: Method;
    headers?: any;
    timeout?: number;
    responseType?: ResponseType;
}

interface CustomResponse {
    // readonly status: boolean;
    // readonly message: string;
    data?: any;
    origin?: any;
}
// 定义接口
interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: Function;
}
export type {
  Method,
  ResponseType,
  AxiosRequest,
  CustomResponse,
  PendingType
}