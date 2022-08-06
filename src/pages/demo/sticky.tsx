import React from 'react';
import { Input } from 'antd';
import { CcsProTable } from '@ccs-design/rc-pro';
import { CcsStateBadge } from '@/components/common';
import { queryPageUrl } from '../sys/url/service';

export default () => {
  const columns = [
    { title: 'URL名', dataIndex: 'urlName', ellipsis: true },
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
    { title: '创建时间', dataIndex: 'createTime', ellipsis: true },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right' as any,
      width: 100,
      render: () => <a>action</a>,
    },
  ];

  // 查询条件
  const formItems = [
    [
      { label: 'URL名称', name: 'urlName', value: <Input placeholder="请输入" allowClear /> },
      { label: 'URL地址', name: 'urlPath', value: <Input placeholder="请输入" allowClear /> },
    ],
  ];

  return (
    <CcsProTable
      formInitValues={{ roleId: 10001 }}
      formItems={formItems}
      fillSpace={false}
      table={{
        // fixedThead: true,
        request: queryPageUrl,
        rowKey: 'urlId',
        columns,
        pagination: { defaultPageSize: 30 },
        scroll: { x: 1300 },
      }}
    />
  );
};
