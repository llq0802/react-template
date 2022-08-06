import type { FC, RefObject } from 'react';
import React, { useState } from 'react';
import { Form, Input } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { ProTableInstance, HttpResult, EventInstance } from '@ccs-design/rc-pro';
import { CcsModalForm } from '@ccs-design/rc-pro';
import { CcsStateSelect } from '@/components/common';
import type { SysEncryptTypePartial } from './type';
import { saveEncrypt } from './service';

const FormItem = Form.Item;

interface PropsType {
  proRef: RefObject<ProTableInstance>;
  $event: EventInstance<SysEncryptTypePartial>;
}

const EncryptForm: FC<PropsType> = ({ $event, proRef }) => {
  const [visible, setVisible] = useState(false);
  const record = $event.useSubscription(() => setVisible(true));
  const { run, loading } = useRequest<HttpResult>(saveEncrypt, { manual: true });

  // 新增编辑保存数据
  const onSubmit = async (user: SysEncryptTypePartial) => {
    const result = await run(user);
    if (result.success) {
      proRef.current?.onReload();
      setVisible(false);
    }
  };

  return (
    <CcsModalForm
      title={`加密字段 - ${record.id ? '修改' : '新增'}`}
      visible={visible}
      onSubmit={onSubmit}
      onCancel={() => setVisible(false)}
      loading={loading}
      values={record}
    >
      <FormItem label="表名" name="tabName" rules={[{ required: true, message: '请输入表名' }]}>
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem label="字段名" name="colName" rules={[{ required: true, message: '请输入字段名' }]}>
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem label="状态" name="state" rules={[{ required: true, message: '请选择状态' }]}>
        <CcsStateSelect />
      </FormItem>
    </CcsModalForm>
  );
};

export default EncryptForm;
