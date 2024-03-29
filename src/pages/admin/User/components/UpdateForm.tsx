import React from 'react';
import { Modal } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

import type { TableListItem } from '../data.d';

export type FormValueType = Partial<TableListItem>;

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      destroyOnClose
      title="更新用户"
      width={420}
      visible={props.updateModalVisible}
      onCancel={() => props.onCancel()}
      footer={null}
    >
      <ProForm
        initialValues={props.values}
        onFinish={async (values: Partial<TableListItem>) => {
          props.onSubmit(values);
        }}
      >
        <ProFormText label="用户名" name="username" />
        <ProFormText label="密码" name="password" />
        <ProFormText label="邮箱" name="email" />
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
