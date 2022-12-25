import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>(window.antdprourl + '/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>(window.antdprourl + '/api/user/current', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>(window.antdprourl + '/api/notices');
}
