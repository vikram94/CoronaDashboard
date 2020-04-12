export interface BaseResponse {
  type: string;
  baseResponse: Response;
}

interface  Response {
  message: string;
  statusCode: string;
}
