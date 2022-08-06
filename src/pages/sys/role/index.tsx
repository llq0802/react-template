import React, { useRef } from 'react';
import { Input, Space } from 'antd';
import type { ColumnType } from 'antd/lib/table/interface';
import type { ProTableInstance } from '@ccs-design/rc-pro';
import { CcsProTable, CcsAuthButton, useEvent } from '@ccs-design/rc-pro';
import { CcsStateBadge } from '@/components/common';
import { queryPageRole } from './service';
import SysRoleMenu from './RoleMenu';
import SysRoleUrl from './RoleUrl';
import SysRolesForm from './RoleForm';
import type { SysRoleType, SysRoleTypePartial } from './type';

export type ActionType = 'role' | 'menu' | 'url';

export default () => {
  const proRef = useRef<ProTableInstance>(null);
  const $event = useEvent<SysRoleTypePartial, ActionType>();

  const formItems = [
    { label: '角色名称', name: 'roleName', value: <Input placeholder="请输入" allowClear /> },
  ];

  // table columns
  const columns: ColumnType<any>[] = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色说明',
      dataIndex: 'roleDesc',
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
    {
      title: '操作',
      render: (values: SysRoleType) => (
        <Space>
          <CcsAuthButton
            type="link"
            auth="sys:role:update"
            onClick={() => $event.emit(values, 'role')}
          />
          <CcsAuthButton
            type="link"
            auth="sys:role:menu:tree"
            onClick={() => $event.emit(values, 'menu')}
          />
          <CcsAuthButton
            type="link"
            auth="sys:role:url:tree"
            onClick={() => $event.emit(values, 'url')}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <CcsProTable
        auth="sys:role:list"
        formItems={formItems}
        toolbar={
          <CcsAuthButton
            type="primary"
            auth="sys:role:create"
            onClick={() => $event.emit({ state: 1 }, 'role')}
          />
        }
        table={{
          request: queryPageRole,
          rowKey: 'roleId',
          columns,
        }}
        proRef={proRef}
        watermark="Elastic Micro"
      />
      <SysRolesForm proRef={proRef} $event={$event} />
      <SysRoleMenu $event={$event} />
      <SysRoleUrl $event={$event} />
    </>
  );
};
