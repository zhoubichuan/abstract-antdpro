import { request } from 'umi';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
  account: string;
}

export async function accountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>(window.antdprourl + '/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(window.antdprourl + `/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request(window.antdprourl + '/api/login/outLogin');
}
