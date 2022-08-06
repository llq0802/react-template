import type { ProTableInstance, HttpResult, EventInstance } from '@ccs-design/rc-pro';
import { CcsModalForm } from '@ccs-design/rc-pro';
import { useRequest } from 'ahooks';
import { Form, Input, InputNumber, message, Radio } from 'antd';
import type { FC, RefObject } from 'react';
import React, { useState } from 'react';
import type { SysOrgTypePartial } from './type';
import { saveOrg, validateOrg } from './service';

const FormItem = Form.Item;

interface PropsType {
  proRef: RefObject<ProTableInstance>;
  $event: EventInstance<SysOrgTypePartial>;
}

const SysOrgForm: FC<PropsType> = ({ proRef, $event }) => {
  const [visible, setVisible] = useState(false);
  const record = $event.useSubscription(() => setVisible(!visible));

  // 组织保存
  const { run, loading } = useRequest<HttpResult>(saveOrg, { manual: true });
  // 组织编码校验
  const validateRequest = useRequest<HttpResult>(validateOrg, { manual: true });

  // 提交
  const onSubmit = async (values: SysOrgTypePartial) => {
    if (values.orgCode !== record.orgCode) {
      const result = await validateRequest.run({ orgCode: values.orgCode });
      if (result.success && result.data) {
        message.error('组织编码已存在、请修改');
        return;
      }
    }
    const result = await run(values);
    if (result.success) {
      setVisible(false);
      proRef.current?.onPartialReload(record.parentOrgId || 0);
      message.success('操作成功');
    }
  };

  return (
    <CcsModalForm
      title={`${record.orgId ? '修改' : '新增'}`}
      onSubmit={onSubmit}
      onCancel={() => setVisible(false)}
      loading={loading}
      visible={visible}
      values={record}
      width={600}
    >
      <FormItem label="组织编码" name="orgCode">
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        label="组织名称"
        name="orgName"
        rules={[{ required: true, message: '请输入组织名称' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem label="组织描述" name="orgDesc">
        <Input placeholder="请输入" />
      </FormItem>

      <FormItem
        label="在用状态"
        name="state"
        rules={[{ required: true, message: '请选择在用状态' }]}
      >
        <Radio.Group>
          <Radio.Button value={1}>在用</Radio.Button>
          <Radio.Button value={0}>禁用</Radio.Button>
        </Radio.Group>
      </FormItem>
      <FormItem label="序号" name="sortId">
        <InputNumber placeholder="请输入" style={{ width: '100%' }} />
      </FormItem>
    </CcsModalForm>
  );
};

export default SysOrgForm;
