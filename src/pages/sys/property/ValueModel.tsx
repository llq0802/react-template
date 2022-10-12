import type { FC, RefObject } from 'react';
import React, { useState } from 'react';
import { Form, Input, InputNumber } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { ProTableInstance, HttpResult, EventInstance } from '@ccs-design/rc-pro';
import { CcsModalForm } from '@ccs-design/rc-pro';
import { CcsStateSelect } from '@/components/common';
import { createValue } from './service';
import type { SysPropValueTypePartial } from './types.d';

const { Item } = Form;

interface PropsType {
  proRef: RefObject<ProTableInstance>;
  $event: EventInstance<SysPropValueTypePartial>;
}

const SysStaticsValueForm: FC<PropsType> = ({ proRef, $event }) => {
  const [visible, setVisible] = useState(false);
  const record = $event.useSubscription(() => setVisible(true));
  const { loading, run } = useRequest<HttpResult>(createValue, { manual: true });

  // 属性值、新增编辑保存数据
  const onSubmit = async (fields: SysPropValueTypePartial) => {
    const result = await run(fields);

    if (result.success) {
      setVisible(false);
      proRef.current?.onReload();
    }
  };

  return (
    <CcsModalForm
      title={`属性值 - ${record.valueId ? '修改' : '新增'}`}
      visible={visible}
      onSubmit={onSubmit}
      onCancel={() => setVisible(false)}
      loading={loading}
      values={record}
    >
      <Item label="属性值" name="valueCode" rules={[{ required: true, message: '请输入属性值' }]}>
        <Input placeholder="请输入" />
      </Item>
      <Item
        label="属性值名字"
        name="valueName"
        rules={[{ required: true, message: '请输入属性值名字' }]}
      >
        <Input placeholder="请输入" />
      </Item>
      <Item label="属性值描述" name="valueDesc">
        <Input placeholder="请输入" />
      </Item>
      <Item label="备注" name="valueControl">
        <Input placeholder="请输入" />
      </Item>
      <Item label="序号" name="sortId" rules={[{ required: true, message: '请输入序号' }]}>
        <InputNumber placeholder="请输入" style={{ width: '100%' }} />
      </Item>
      <Item label="在用状态" name="state" rules={[{ required: true, message: '请选择在用状态' }]}>
        <CcsStateSelect />
      </Item>
    </CcsModalForm>
  );
};

export default SysStaticsValueForm;
