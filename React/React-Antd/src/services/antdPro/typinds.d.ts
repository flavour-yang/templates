declare namespace API {
  type PromiseResponse = {
    success: boolean;
    data?: any;
    code?: number;
    message?: string;
  };
  type ParamsData = {
    [key: string]: any;
  };
}
