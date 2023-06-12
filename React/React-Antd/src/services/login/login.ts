/*
 * @Author: Y
 * @Date: 2023-01-09
 * @Description: 登录
 */
// import request from '@/services';
import { request } from '@umijs/max';
/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(
    '/api/bl-users/login?expandPermissions=true&fullPermissions=true',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
