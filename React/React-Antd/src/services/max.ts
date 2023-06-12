import { message, notification } from 'antd';
import type { RequestConfig } from 'umi';

import { history } from 'umi';
// import { APP_ID } from '../constants';
import { getToken } from '@/utils/store';
const loginPath = '/user/login';

const token = getToken() || '';

const headers = {
  // appid: APP_ID[REACT_APP_ENV || 'dev'],
  Accept: '*/*',

  ...(token ? { 'Authorization-Token': token } : {}),
};

interface ResponseStructure {
  success: boolean;
  data: any;
  message?: string;
}

interface ErrorResponse {
  response: any;
}

export const request: RequestConfig = {
  // prefix: APP_REQUEST_URL[REACT_APP_ENV || 'dev'],
  errorConfig: {
    errorHandler: (error) => {
      const { response } = error as unknown as ErrorResponse;
      if (response === null && error !== null) {
        throw error;
      }
      if (response && response.status) {
        const errorText = response.statusText;
        const { status, url } = response;
        notification.error({
          message: `${status}: ${url}`,
          description: errorText,
        });
      }
      return response;
    },
  },
  timeout: 30000,
  headers: {
    'X-Okapi-Tenant': localStorage.getItem('x-Okapi-Tenant') || 'st',
    // appid: APP_ID[REACT_APP_ENV || 'dev'],
  },
  requestInterceptors: [
    (url, options) => {
      options.headers = {
        ...options.headers,
        'Authorization-Token': getToken() || '',
      };
      if (url.includes('/login/loginByPassword') && options?.headers) {
        delete options.headers['Authorization-Token'];
      }
      if (url.indexOf('exportBorrowRank') !== -1) {
        headers.Accept = 'application/vnd.ms-excel';
      }
      if (url.indexOf('exportRetrievalRank') !== -1) {
        headers.Accept = 'application/vnd.ms-excel';
      }
      if (url.indexOf('exportPersons') !== -1) {
        headers.Accept = 'application/vnd.ms-excel';
      }
      if (url.indexOf('downloadAdminTemplate') !== -1) {
        headers.Accept = 'application/vnd.ms-excel';
      }

      return {
        url,
        options: { ...options, interceptors: true },
      };
    },
  ],
  responseInterceptors: [
    (response) => {
      const { data } = response as unknown as ResponseStructure;
      if (data.success === false) {
        message.error(data.msg || data.message || '请求出错!');
        return data;
      }
      if (data.code === 200) {
        return data;
      }
      if (data.code === 400) {
        message.error(data.msg || data.message || '请求出错!');
        return data;
      }
      if (data.code === 401) {
        history.push(loginPath);
        return data;
      }
      if (data.code === 500) {
        message.error(data.msg || data.message || '服务错误!');
        return { data: null, code: 500, msg: '服务错误!' };
      }
      return response;
    },
  ],
};
