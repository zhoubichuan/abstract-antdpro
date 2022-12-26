import { message } from 'antd';
import { history } from 'umi';

export const isSuccess = (code: string | number) => {
  return code === 200 || code === 0;
};

export function urlRequestInterceptor(url: string, options: any) {
  let config = {};
  if (url.indexOf('/api-auth/oauth') == -1) {
    const auth: any = localStorage.getItem('auth');
    if (auth) {
      const { access_token, expires_in, refresh_token } = JSON.parse(auth);
      config = {
        Authorization: `Bearer ${access_token}`,
      };
    } else {
      setTimeout(() => {
        history.replace({
          pathname: '/user/login',
        });
      }, 100);
    }
  } else {
    if (process.env.NODE_ENV != 'development') {
      // url = url.slice(url.lastIndexOf('http'));
      console.log(url, '最终的url');
    }
  }

  return {
    url,
    options: {
      ...options,
      interceptors: true,
      headers: {
        ...config,
      },
    },
  };
}

export async function customerResponseInterceptor(response: any) {
  let result = response;
  try {
    const data = await response.clone().json();
    if (data.statusCode !== 200 && data.statusCode !== 0) {
      data.message && message.error(data.message);
    }
    /* 未登录 */
    if (data?.code == 401) {
      !data?.message && message.error('请重新登录');
      setTimeout(() => {
        history.replace({
          pathname: '/user/login',
        });
      }, 1000);
    }
    return result
  } catch {
    return result;
  }
}
