import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Avatar } from 'antd';
import React, { useState, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListItem } from './data.d';
import { queryUser, updateUser, addUser, removeUser, detailUser } from './service';
import moment from 'moment';
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (id: string, fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateUser({
      id,
      username: fields.username,
      password: fields.password,
      email: fields.email,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeUser(selectedRows.map((row) => row._id!));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [userFormValues, setUserFormValues] = useState<TableListItem>({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /**
   *  节点详情
   * @param selectedRows
   */
  const handleDetail = async (selectedRows: any) => {
    if (!selectedRows) return true;
    try {
      const msg = await detailUser({ id: selectedRows._id });
      setRow(msg.result);
      return true;
    } catch (error) {
      message.error('查询失败，请重试');
      return false;
    }
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      tip: '用户名',
      render: (dom, entity) => {
        return <a onClick={() => handleDetail(entity)}>{dom}</a>;
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
      hideInTable: true, // 列表页也不要显示
      hideInDescriptions: true, // 在详情页不要显示
    },
    {
      title: '角色',
      dataIndex: 'access',
      search: false,
      filters: [
        { text: '普通用户', value: 'user' },
        { text: '管理员', value: 'admin' },
      ],
      valueEnum: {
        user: { text: '普通用户' },
        admin: { text: '管理员' },
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      search: false, // 在搜索页签隐藏
      hideInForm: true, // 在添加页面隐藏
      render: (dom, entity) => {
        return <Avatar src={entity.avatar} />;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true, // 可以根据此字段排序
      hideInForm: true, // 在添加页面隐藏
      search: false,
      renderText: (val: string) => {
        if (!val) return '';
        return moment(val).fromNow(); // 绝对时间变成相对时间
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      sorter: true, // 可以根据此字段排序
      hideInForm: true, // 在添加页面隐藏
      search: false,
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setUserFormValues(record);
            }}
          >
            修改
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="_id"
        options={false}
        search={{
          labelWidth: 120,
        }}
        pagination={{ defaultPageSize: 5 }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: T & {
            pageSize: number;
            current: number;
          },
          sorter,
          filter,
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const msg = await queryUser({ ...params, sorter, filter });
          return {
            data: msg.result.data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: msg.statusCode === 200,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: msg.result.page.total,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {userFormValues && Object.keys(userFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(userFormValues._id!, value);
            if (success) {
              handleUpdateModalVisible(false);
              setUserFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUserFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={userFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.username && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.username}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.username,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
