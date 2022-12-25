import { request } from 'umi';
import type { TableListParams, TableListItem } from './data.d';

export async function queryUser(params?: TableListParams) {
  return request(window.antdprourl + '/api/user', {
    params,
  });
}

export async function removeUser(params: { key: string[] }) {
  return request(window.antdprourl + '/api/user', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addUser(params: TableListItem) {
  return request(window.antdprourl + '/api/user', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateUser(params: TableListParams) {
  return request(window.antdprourl + '/api/user', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
