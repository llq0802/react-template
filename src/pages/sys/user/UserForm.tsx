import type { FC } from 'react';
import React, { useState } from 'react';
import { Form, Select, Input, DatePicker, message } from 'antd';
import type { HttpResult, ProTableInstanceRef, EventInstance } from '@ccs-design/rc-pro';
import { CcsModalForm, CcsTrigger } from '@ccs-design/rc-pro';
import useRequest from '@ahooksjs/use-request';
import type { Moment } from 'moment';
import { CcsStateSelect } from '@/components/common';
import type { SysUserTypePartial } from './type';
import { saveUser } from './service';
import CcsOrgSelect from '@/components/business/CcsOrgSelect';
import { isNotEmpty, momentDate } from '@/utils';
import type { EventType } from '.';

const FormItem = Form.Item;
const { Option } = Select;

interface PropsType {
  proRef: ProTableInstanceRef;
  event: EventInstance<EventType>;
}

const SysUsersForm: FC<PropsType> = ({ proRef, event }) => {
  const { run, loading } = useRequest<HttpResult>(saveUser, { manual: true });
  const [values, setValues] = useState<EventType['record']>({});

  event.useSubscription((val) => {
    const { type, record } = val;
    if (type !== 'user') return;
    setValues({
      ...record,
      birthday: momentDate(record.birthday),
      orgValue: { orgId: record.orgId, orgName: record.orgName },
    });
  });

  // 新增编辑保存数据
  const onSubmit = async (val: SysUserTypePartial) => {
    const newUser = {
      ...val,
      birthday: (val.birthday as unknown as Moment).format('YYYY-MM-DD'),
      orgId: val.orgValue?.orgId,
    };
    const result = await run(newUser);
    if (result.success) {
      message.success('操作成功');
      proRef.current?.onReload();
      setValues({});
    }
  };

  return (
    <CcsModalForm
      title={`用户 - ${values.loginId ? '修改' : '新增'}`}
      onSubmit={onSubmit}
      onCancel={() => setValues({})}
      loading={loading}
      visible={isNotEmpty(values)}
      values={values}
    >
      <FormItem
        label="登录账号"
        name="loginCode"
        rules={[{ required: true, message: '请输入登录账号,至少5个字符', min: 5 }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        label="用户姓名"
        name="workerName"
        rules={[{ required: true, message: '请输入用户姓名' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        label="用户组织"
        name="orgValue"
        rules={[{ required: true, message: '请输入用户所属组织' }]}
      >
        <CcsTrigger showField="orgName">
          <CcsOrgSelect />
        </CcsTrigger>
      </FormItem>
      <FormItem
        label="联系电话"
        name="phone"
        rules={[{ required: true, message: '请输入联系电话' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        label="移动号码"
        name="mobile"
        rules={[{ required: true, message: '请输入11位移动号码', len: 11 }]}
      >
        <Input placeholder="请输入" style={{ width: '100%' }} />
      </FormItem>
      <FormItem label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱地址' }]}>
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        label="出生日期"
        name="birthday"
        rules={[{ required: true, message: '请选择出生日期' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </FormItem>
      <FormItem label="性别" name="sex" rules={[{ required: true, message: '请选择性别' }]}>
        <Select placeholder="请选择" style={{ width: '100%' }}>
          <Option value={1}>男</Option>
          <Option value={0}>女</Option>
        </Select>
      </FormItem>
      <FormItem label="状态" name="state" rules={[{ required: true, message: '请选择状态' }]}>
        <CcsStateSelect />
      </FormItem>
    </CcsModalForm>
  );
};

export default SysUsersForm;
