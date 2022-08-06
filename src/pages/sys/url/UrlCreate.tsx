import React, { useRef } from 'react';
import type { FC } from 'react';
import { Input } from 'antd';
import type { ProTableInstance } from '@ccs-design/rc-pro';
import { CcsProTable, CcsAuthButton, useEvent } from '@ccs-design/rc-pro';
import { CcsStateBadge } from '@/components/common';
import type { SysUrlType, SysUrlTypePartial } from './type';
import { queryPageUrl } from './service';
import UrlsCreateForm from './UrlCreateModel';

const UrlCreate: FC = () => {
  const proRef = useRef<ProTableInstance>(null);
  const $event = useEvent<SysUrlTypePartial>();

  const columns = [
    { title: 'URL名', dataIndex: 'urlName' },
    { title: 'URL地址', dataIndex: 'urlPath', ellipsis: true },
    {
      title: 'URL类型',
      width: 100,
      dataIndex: 'urlType',
      render(val: number) {
        return val === 1 ? '普通url' : 'AntPath';
      },
    },
    {
      title: '日志记录',
      width: 100,
      dataIndex: 'logFlag',
      render(val: number) {
        return val === 1 ? '是' : '否';
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
    {
      title: '操作',
      fixed: 'right' as unknown as 'right',
      width: 100,
      render: (record: SysUrlType) => (
        <CcsAuthButton auth="sys:url:update" type="link" onClick={() => $event.emit(record)} />
      ),
    },
  ];

  // toolbar
  const toolbar = (
    <CcsAuthButton
      auth="sys:url:create"
      type="primary"
      onClick={() => $event.emit({ urlType: 1, state: 1, logFlag: 0 })}
    />
  );

  // 查询条件
  const formItems = [
    { label: 'URL名称', name: 'urlName', value: <Input placeholder="请输入" allowClear /> },
    { label: 'URL地址', name: 'urlPath', value: <Input placeholder="请输入" allowClear /> },
  ];

  return (
    <>
      <CcsProTable
        auth="sys:url:list"
        proRef={proRef}
        formInitValues={{ roleId: 10001 }}
        formItems={formItems}
        toolbar={toolbar}
        table={{
          request: queryPageUrl,
          rowKey: 'urlId',
          columns,
        }}
      />
      <UrlsCreateForm proRef={proRef} $event={$event} />
    </>
  );
};
export default UrlCreate;
