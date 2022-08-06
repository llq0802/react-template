import type { FC, RefObject } from 'react';
import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useRequest } from 'ahooks';
import type { ProTableInstance, HttpResult, EventInstance } from '@ccs-design/rc-pro';
import { CcsModalForm } from '@ccs-design/rc-pro';
import { CcsStateSelect } from '@/components/common';
import { create } from './service';
import type { SysPropTypePartial } from './Type.d';

const { Item } = Form;

interface PropsType {
  proRef: RefObject<ProTableInstance>;
  $event: EventInstance<SysPropTypePartial>;
}

const SysPropertyTypeForm: FC<PropsType> = ({ proRef, $event }) => {
  const [visible, setVisible] = useState(false);
  const record = $event.useSubscription(() => setVisible(true));
  const { loading, run } = useRequest<HttpResult>(create, { manual: true });

  // 属性、新增编辑保存数据
  const onSubmit = async (fields: SysPropTypePartial) => {
    const result = await run(fields);
    if (result.success) {
      setVisible(false);
      proRef.current?.onReload();
    }
  };

  return (
    <CcsModalForm
      title={`属性 - ${record.propId ? '修改' : '新增'}`}
      visible={visible}
      onSubmit={onSubmit}
      onCancel={() => setVisible(false)}
      loading={loading}
      values={record}
    >
      <Item
        label="属性编码"
        name="propCode"
        rules={[{ required: true, message: '请输入属性编码' }]}
      >
        <Input placeholder="请输入" />
      </Item>
      <Item
        label="属性名称"
        name="propName"
        rules={[{ required: true, message: '请输入属性名称' }]}
      >
        <Input placeholder="请输入" />
      </Item>
      <Item label="属性说明" name="propDesc">
        <Input placeholder="请输入" />
      </Item>
      <Item label="在用状态" name="state" rules={[{ required: true, message: '请选择在用状态' }]}>
        <CcsStateSelect />
      </Item>
      <Item label="扩展" name="propControl">
        <Input placeholder="请输入" />
      </Item>
    </CcsModalForm>
  );
};

export default SysPropertyTypeForm;
