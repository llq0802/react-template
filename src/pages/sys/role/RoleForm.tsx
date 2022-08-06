import type { ProTableInstance, HttpResult, EventInstance } from '@ccs-design/rc-pro';
import { CcsModalForm } from '@ccs-design/rc-pro';
import { useRequest } from 'ahooks';
import { Form, Input, message, Select } from 'antd';
import type { FC, RefObject } from 'react';
import React, { useState } from 'react';
import type { ActionType } from '.';
import type { SysRoleTypePartial } from './type';
import { saveRole } from './service';

interface PropsType {
  proRef: RefObject<ProTableInstance>;
  $event: EventInstance<SysRoleTypePartial, ActionType>;
}

const SysRoleUrl: FC<PropsType> = ({ proRef, $event }) => {
  const [visible, setVisible] = useState(false);
  const record = $event.useSubscription(() => setVisible(!visible), 'role');
  const { run, loading } = useRequest<HttpResult>(saveRole, { manual: true });

  // role save
  const onSubmit = async (values: SysRoleTypePartial) => {
    const result = await run(values);

    if (result.success) {
      setVisible(false);
      proRef.current?.onReload();
      message.success('操作成功');
    }
  };

  return (
    <CcsModalForm
      title={`角色 - ${record.roleId ? '修改' : '新增'}`}
      onSubmit={onSubmit}
      onCancel={() => setVisible(false)}
      loading={loading}
      values={record}
      visible={visible}
    >
      <Form.Item
        label="角色名称"
        name="roleName"
        rules={[{ required: true, message: '请输入角色名称' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="角色说明" name="roleDesc">
        <Input placeholder="请输入" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="在用状态"
        name="state"
        rules={[{ required: true, message: '请选择在用状态' }]}
      >
        <Select placeholder="请选择" style={{ width: '100%' }}>
          <Select.Option value={1}>在用</Select.Option>
          <Select.Option value={0}>禁用</Select.Option>
        </Select>
      </Form.Item>
    </CcsModalForm>
  );
};

export default SysRoleUrl;
