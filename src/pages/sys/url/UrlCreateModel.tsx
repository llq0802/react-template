import type { FC, RefObject } from 'react';
import React, { useState } from 'react';
import { Form, Select, Input } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { ProTableInstance, HttpResult, EventInstance } from '@ccs-design/rc-pro';
import { CcsModalForm } from '@ccs-design/rc-pro';
import { CcsStateSelect } from '@/components/common';
import type { SysUrlTypePartial } from './type';
import { createUrl } from './service';

const FormItem = Form.Item;
const { Option } = Select;

interface PropsType {
  proRef: RefObject<ProTableInstance>;
  $event: EventInstance<SysUrlTypePartial>;
}

const UrlsCreateForm: FC<PropsType> = ({ $event, proRef }) => {
  const [visible, setVisible] = useState(false);
  const record = $event.useSubscription(() => setVisible(true));
  const { run, loading } = useRequest<HttpResult>(createUrl, { manual: true });

  // 新增编辑保存数据
  const onOK = async (url: SysUrlTypePartial) => {
    const result = await run(url);
    if (result.success) {
      setVisible(false);
      proRef.current?.onReload();
    }
  };

  return (
    <CcsModalForm
      title={`URL - ${record.urlId ? '修改' : '新增'}`}
      visible={visible}
      onSubmit={onOK}
      onCancel={() => setVisible(false)}
      loading={loading}
      values={record}
    >
      <FormItem
        label="URL名称"
        name="urlName"
        rules={[{ required: true, message: '请输入URL名称' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        label="URL地址"
        name="urlPath"
        rules={[{ required: true, message: '请输入URL地址' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem label="URL说明" name="urlDesc">
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        label="URL类型"
        name="urlType"
        rules={[{ required: true, message: '请选择URL类型' }]}
      >
        <Select placeholder="请选择" style={{ width: '100%' }}>
          <Option value={1}>普通url</Option>
          <Option value={2}>AntPath</Option>
        </Select>
      </FormItem>
      <FormItem
        label="记录日志"
        name="logFlag"
        rules={[{ required: true, message: '请选择是否记录日志' }]}
      >
        <Select placeholder="请选择" style={{ width: '100%' }}>
          <Option value={0}>否</Option>
          <Option value={1}>是</Option>
        </Select>
      </FormItem>
      <FormItem label="状态" name="state" rules={[{ required: true, message: '请选择状态' }]}>
        <CcsStateSelect />
      </FormItem>
    </CcsModalForm>
  );
};

export default UrlsCreateForm;
