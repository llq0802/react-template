import React, { useRef } from 'react';
import { Input } from 'antd';
import type { ProTableInstance, ItemType } from '@ccs-design/rc-pro';
import { CcsProTable, CcsAuthButton, useEvent } from '@ccs-design/rc-pro';
import { CcsStateBadge, CcsStateSelect } from '@/components/common';
import AddOrEditModel from './AddOrEditModel';
import type { SysEncryptType, SysEncryptTypePartial } from './type';
import { queryPageEncrypt } from './service';

export default () => {
  const proRef = useRef<ProTableInstance>(null);
  const $event = useEvent<SysEncryptTypePartial>();

  const formItems: ItemType[] = [
    { label: '表名', name: 'tabName', value: <Input placeholder="请输入" allowClear /> },
    { label: '字段名', name: 'colName', value: <Input placeholder="请输入" allowClear /> },
    { label: '状态', name: 'state', value: <CcsStateSelect /> },
  ];

  // 操作栏
  const toolbar = (
    <CcsAuthButton
      auth="sys:encrypt:create"
      type="primary"
      onClick={() => $event.emit({ state: 1 })}
    />
  );

  const columns = [
    { title: '表名', dataIndex: 'tabName', ellipsis: true },
    { title: '字段名', dataIndex: 'colName', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'state',
      ellipsis: true,
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
    { title: '创建时间', dataIndex: 'createTime', ellipsis: true },
    {
      title: '操作',
      fixed: 'right' as 'right',
      width: 120,
      render: (record: SysEncryptType) => (
        <span className="buttons">
          <CcsAuthButton
            auth="sys:encrypt:update"
            type="link"
            onClick={() => $event.emit(record)}
          />
        </span>
      ),
    },
  ];

  return (
    <>
      <CcsProTable
        auth="sys:encrypt:list"
        proRef={proRef}
        formItems={formItems}
        formInitValues={{ roleId: 10001 }}
        toolbar={toolbar}
        table={{
          request: queryPageEncrypt,
          rowKey: 'id',
          columns,
        }}
      />
      <AddOrEditModel $event={$event} proRef={proRef} />
    </>
  );
};
