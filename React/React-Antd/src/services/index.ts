import { parse } from 'querystring';
import { message } from 'antd';
// import { stringify } from 'querystring';
import { history } from 'umi';
import { extend } from 'umi-request';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

message.config({
  duration: 2,
  maxCount: 1,
});

/**
 * 异常处理程序
 */
const errorHandler = async (error) => {
  const { response } = error;
  // console.log('error', error);
  if (error && error.type && error.type === 'Timeout') {
    message.error(`请求超时`);
    return { data: null, code: '', msg: '请求超时', message: '请求超时' };
  }
  // console.log(response);
  if (!response || response.status === 502) {
    // console.log(response);
    message.error('服务端错误');
    return { data: {}, code: '', msg: '服务端错误', message: '服务端错误' };
  }
  const { status, url } = response;
  if (response.status === 401) {
    // 401 认证失败
    const { redirect } = getPageQuery();
    if (window.location.pathname !== '/user/login' && !redirect) {
      await history.replace({
        pathname: '/user/login',
        // search: stringify({
        //   redirect: window.location.href,
        // }),
      });
      message.error('登录失效，请重新登录');
      return response;
    }
  } else if (response.status === 403) {
    message.error(`请求错误 ${status}: ${url}`);
    return { data: null, code: '', msg: '请求 403 错误', message: '请求 403 错误' };
  } else if (response.status === 404) {
    message.error('请求地址不存在');
    return { data: null, code: '', msg: '请求地址不存在', message: '请求地址不存在' };
  } else if (response.status === 504) {
    message.error(`网关超时 ${status}: ${url}`);
    return { data: null, code: '', msg: '网关超时', message: '网关超时' };
  }
  return error?.data ?? response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上 cookie
  timeout: 60000,
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('x-okapi-token') || '';
  const headers = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'X-Okapi-Tenant': localStorage.getItem('x-Okapi-Tenant') || 'st',
  };
  if (!options.noToken) {
    headers['X-Okapi-Token'] = token;
  }
  if (url.indexOf('bl-users/login') !== -1) {
    delete headers['X-Okapi-Token'];
  }
  const basicUrl = localStorage.getItem('okapiUrl')
    ? localStorage.getItem('okapiUrl') + url.replace('/okapi', '')
    : url;
  return {
    url: basicUrl,
    options: { ...options, headers },
  };
});

const folioErrorTranslate = [
  { msg: 'Password does not match', chinese: '登录名或密码错误' }, // 密码不匹配
  { msg: 'User must be flagged as active', chinese: '用户未激活' },
  { msg: 'Error verifying user existence: No user found by username', chinese: '此用户不存在' },
  { msg: 'You must provide a username or userId', chinese: '用户名不能为空' },
  { msg: 'No credentials match that login', chinese: '没有凭据与该登录名匹配' },
  { msg: 'Error verifying user existence', chinese: '登录名或密码错误' }, // Error verifying user existence, 验证用户存在错误
  { msg: 'User could not be verified as active', chinese: '用户无法被核实为活跃用户' },
  { msg: 'Error retrieving stored hash and salt from credentials', chinese: '凭证验证错误' },
];

// response 拦截器, 处理 response
request.interceptors.response.use(async (response) => {
  // 200/201/400/422/500状态码在拦截器处理。其他状态码在errorHandler处理
  if (
    response &&
    response.status &&
    response.status !== 200 &&
    response.status !== 201 &&
    response.status !== 400 &&
    response.status !== 422 && // folio接口返回错误在此处理
    response.status !== 500
  ) {
    return response;
  }
  let data: any;
  // console.log(response);
  if (response.url.indexOf('exportExcel') !== -1) {
    data = await response.clone().blob();
  } else if (response.url.indexOf('export') !== -1) {
    data = await response.clone().blob();
  } else if (response.url.indexOf('downLoadFile') !== -1) {
    data = await response.clone().blob();
  } else if (response.url.indexOf('download') !== -1) {
    data = await response.clone().blob();
  } else if (response.url.indexOf('downloadTemplate') !== -1) {
    data = await response.clone().blob();
  } else if (response.url.indexOf('downloadSerialItemBySearch') !== -1) {
    data = await response.clone().blob();
  } else if (response.url.indexOf('downLoadGeneralSurveyFile') !== -1) {
    data = await response.clone().blob();
  } else if (response.url.indexOf('downExcelFile?exportId=') !== -1) {
    data = await response.clone().blob();
  } else if (response.url.indexOf('getItemsExcelFile') !== -1) {
    data = await response.clone().blob();
  } else if (response.url.indexOf('barcodeChangeTemplate') !== -1) {
    data = await response.clone().blob();
  } else if (response.url.indexOf('downloadCatalogueLogList') !== -1) {
    data = await response.clone().blob();
  } else {
    data = await response.clone().json();
  }
  // console.log(data);
  const token = response.headers.get('x-okapi-token');
  if (token) {
    localStorage.setItem('x-okapi-token', token);
  }
  // 非 folio 接口
  const hasCode = Object.keys(data).findIndex((k) => k === 'code');
  if (data.code) {
    if (data.code === 'COMMON_200') {
      return data.data;
    }
    const noMessageUrls = 'jtlsp/system/userrole/check_password';
    // const currentUrl = response.headers.get('x-real-url');
    const currentUrl = response.url;
    if (currentUrl.indexOf(noMessageUrls) === -1) {
      // message.error(data.msg);
    }
    return data;
  }
  if (hasCode !== -1) {
    // code 存在，但是可能为 null，请求失败
    message.error('请求失败');
    return { data: null, code: '', msg: '请求失败', message: '请求失败' };
  }
  // folio 接口
  if (data.statusCode === 400) {
    let msg = '';
    folioErrorTranslate.forEach((trans) => {
      if (data.errorMessage.indexOf(trans.msg) !== -1) {
        msg = `${trans.chinese} `;
      }
    });
    message.error(msg || data?.errorMessage);
    return {
      data: null,
      code: '',
      msg: msg || data?.errorMessage,
      message: msg || data?.errorMessage,
    };
  }
  if (data && data.errors && data.errors.length > 0) {
    let msg = '';
    data.errors.forEach((error) => {
      folioErrorTranslate.forEach((trans) => {
        if (trans.msg === error.message || error.message.indexOf(trans.msg) !== -1) {
          msg += `${trans.chinese} `;
        }
      });
    });
    message.error(msg);
    return { data: null, code: '', msg: data.errors, message: data.errors };
  }
  if (data && data.errorMessage) {
    let msg = '';
    folioErrorTranslate.forEach((trans) => {
      if (data.errorMessage.indexOf(trans.msg) !== -1) {
        msg = `${trans.chinese} `;
      }
    });
    message.error(msg);
    return { data: null, code: '', msg: data.errorMessage, message: data.errorMessage };
  }
  // 过滤掉 folio 接口的返回 422 或者 500
  if (data.statusCode === 422 || data.statusCode === 500) {
    message.error(`服务器错误 ${data.statusCode}`);
    return { data: null, code: '', msg: '服务端错误', message: '服务端错误' };
  }

  return data;
});

export default request;
