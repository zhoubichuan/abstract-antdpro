export interface TableListItem {
  username?: string;
  password?: string;
  email?: string;
  avatar?: string;
  access?: string;
  id?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  access?: string;
  id?: string;
  username?: string;
  password?: string;
  email?: string;
  avatar?: string;
  updatedAt: Date;
  createdAt: Date;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}
