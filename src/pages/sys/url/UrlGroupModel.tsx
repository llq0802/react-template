import type { FC, RefObject } from 'react';
import React, { useState } from 'react';
import { Form, Input } from 'antd';
import type { ProTableInstance, HttpResult, EventInstance } from '@ccs-design/rc-pro';
import { CcsModalForm } from '@ccs-design/rc-pro';
import useRequest from '@ahooksjs/use-request';
import { CcsStateSelect } from '@/components/common';
import type { ActionType } from './UrlGroup';
import type { SysUrlGroupTypePartial } from './type';
import { createGroup } from './service';

const FormItem = Form.Item;

interface PropsType {
  proRef: RefObject<ProTableInstance>;
  $event: EventInstance<SysUrlGroupTypePartial, ActionType>;
}

const UrlsGroupForm: FC<PropsType> = ({ proRef, $event }) => {
  const [visible, setVisible] = useState(false);
  const record = $event.useSubscription(() => setVisible(true), 'group');
  const { run, loading } = useRequest<HttpResult>(createGroup, { manual: true });

  // URL组新增编辑保存数据
  const onSubmit = async (fields: SysUrlGroupTypePartial) => {
    const result = await run(fields);
    if (result.success) {
      setVisible(false);
      proRef.current?.onReload();
    }
  };

  return (
    <CcsModalForm
      title={`URL组 - ${record.groupId ? '修改' : '新增'}`}
      visible={visible}
      onSubmit={onSubmit}
      onCancel={() => setVisible(false)}
      loading={loading}
      values={record}
    >
      <FormItem
        label="URL组名"
        name="groupName"
        rules={[{ required: true, message: '请输入URL组名' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem label="URL组备注" name="groupDesc">
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem label="状态" name="state" rules={[{ required: true, message: '请选择状态' }]}>
        <CcsStateSelect />
      </FormItem>
    </CcsModalForm>
  );
};

export default UrlsGroupForm;
