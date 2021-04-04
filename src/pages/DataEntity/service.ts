import { request } from 'umi';
import type { TableListParams, TableListItem } from './data.d';
// 数据实体列表查询
export async function getDataEntityList(params?: TableListParams) {
  return request('/dataModel/getDataEntityList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
// 获取数据实体详情
export async function getDataEntityDetail(params: { id: number[] }) {
  return request('/dataModel/getDataEntityDetail', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
