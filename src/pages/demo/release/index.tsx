import type { FC } from 'react';
import React, { useRef } from 'react';
import { Input } from 'antd';
import type { ProTableInstance } from '@ccs-design/rc-pro';
import { CcsProTable, CcsAuthButton, useEvent } from '@ccs-design/rc-pro';
import { CcsStateBadge, CcsStateSelect } from '@/components/common';
import { CcsStaticSelect } from '@/components/business';
import { queryPagePub } from './service';
import BusinessReleaseForm from './form';
import type { BussReleaseType, BussReleaseTypePartial } from './type';

const BusinessRelease: FC = () => {
  const proRef = useRef<ProTableInstance>(null);
  const $event = useEvent<BussReleaseTypePartial>();

  const columns = [
    { title: '名称', dataIndex: 'pubName', ellipsis: true },
    { title: '类型', dataIndex: 'pubTypeName' },
    {
      title: '有效时间',
      dataIndex: 'enableTime',
      ellipsis: true,
    },
    {
      title: '失效时间',
      dataIndex: 'disableTime',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
    { title: '序号', width: 100, dataIndex: 'sortId' },
    {
      title: '操作',
      width: 100,
      render: (record: BussReleaseType) => (
        <CcsAuthButton auth="demo:release:update" type="link" onClick={() => $event.emit(record)} />
      ),
    },
  ];

  const toolbar = (
    <CcsAuthButton
      auth="demo:release:create"
      type="primary"
      onClick={() => $event.emit({ state: 1 })}
    />
  );

  const formItems = [
    { name: 'pubName', label: '名称', value: <Input placeholder="请输入" allowClear /> },
    { name: 'pubType', label: '类型', value: <CcsStaticSelect propCode="ReleaseType" /> },
    { name: 'state', label: '状态', value: <CcsStateSelect /> },
  ];

  return (
    <>
      <CcsProTable
        auth="demo:release:list"
        proRef={proRef}
        formItems={formItems}
        toolbar={toolbar}
        table={{
          request: queryPagePub,
          rowKey: 'pubId',
          columns,
        }}
      />
      <BusinessReleaseForm proRef={proRef} $event={$event} />
    </>
  );
};

export default BusinessRelease;
