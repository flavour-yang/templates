export const getToken = () => localStorage.getItem('token');
export const getAccountId = () => localStorage.getItem('accountId');
export const getUserInfo = () => {
  const value = localStorage.getItem('user') || '{}';
  const parse = JSON.parse(value);
  if (Reflect.ownKeys(parse).length === 0) {
    return false;
  }
  return parse;
};

export const setToken = (value: string) => localStorage.setItem('token', value);
export const setAccountId = (num: any) => localStorage.setItem('accountId', num);
export const setUesrInfo = (value: any) => {
  const string = JSON.stringify(value);
  localStorage.setItem('user', string);
};

export const removeUserInfo = () => localStorage.removeItem('user');
export const removeToken = () => localStorage.removeItem('token');
export const clearStore = () => {
  removeToken();
  removeUserInfo();
};

