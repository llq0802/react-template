import React from 'react';
import { Input } from 'antd';
import { CcsProTable } from '@ccs-design/rc-pro';
import { CcsStateBadge } from '@/components/common';
import { queryWorker } from '@/pages/sys/user/service';

export default ({ orgId }: { orgId?: number | null }) => {
  const formItems = [
    { label: '用户名称', name: 'workerName', value: <Input placeholder="请输入" /> },
  ];

  const columns = [
    {
      title: '用户名',
      dataIndex: 'workerName',
      ellipsis: true,
    },
    { title: '账号', dataIndex: 'loginCode', ellipsis: true },
    { title: '组织', dataIndex: 'orgName', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'state',
      ellipsis: true,
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
    { title: '电话', dataIndex: 'mobile', ellipsis: true },
    { title: '邮箱', dataIndex: 'email', ellipsis: true },
    {
      title: '性别',
      dataIndex: 'sex',
      ellipsis: true,
      render(val: number) {
        return val === 0 ? '女' : '男';
      },
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      ellipsis: true,
      render(val: string) {
        return val && val.substring(0, 10);
      },
    },
    { title: '创建时间', dataIndex: 'createTime', ellipsis: true },
  ];

  return (
    <>
      <CcsProTable
        formItems={formItems}
        onSearchBefore={(vs: any) => {
          let { createTime } = vs;
          const { orgValue = {} } = vs;
          if (createTime) {
            createTime = createTime.format('YYYY-MM-DD');
          }
          return { ...vs, createTime, orgId: orgValue.orgId };
        }}
        table={{
          request: queryWorker,
          requestParam: { orgId },
          rowKey: 'loginId',
          columns,
        }}
        watermark="Elastic Micro"
      />
    </>
  );
};
