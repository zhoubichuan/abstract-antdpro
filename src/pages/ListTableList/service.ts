import { request } from 'umi';
import type { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request(window.antdprourl + '/api/rule', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request(window.antdprourl + '/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request(window.antdprourl + '/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request(window.antdprourl + '/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
