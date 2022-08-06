import React, { useRef } from 'react';
import type { ProTableInstance } from '@ccs-design/rc-pro';
import { CcsProTable, CcsAuthButton, useEvent } from '@ccs-design/rc-pro';
import { Space } from 'antd';
import { CcsStateBadge } from '@/components/common';
import type { SysOrgType, SysOrgTypePartial } from './type';
import { queryOrgs } from './service';
import SysOrgForm from './AddOrEditModel';

export default () => {
  const proRef = useRef<ProTableInstance<SysOrgType>>(null);
  const $event = useEvent<SysOrgTypePartial>();
  // 打开模态框
  const onVisible = (values: SysOrgTypePartial = {}) => {
    $event.emit(values);
  };

  const columns = [
    {
      title: '组织名称',
      dataIndex: 'orgName',
    },
    {
      title: '组织编码',
      dataIndex: 'orgCode',
    },
    {
      title: '组织说明',
      dataIndex: 'orgDesc',
      ellipsis: true,
    },
    {
      title: '序号',
      dataIndex: 'sortId',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
    {
      title: '操作',
      width: 150,
      render: (record: SysOrgType) => (
        <Space>
          <CcsAuthButton type="link" auth="sys:org:update" onClick={() => onVisible(record)} />
          <CcsAuthButton
            type="link"
            auth="sys:org:create"
            onClick={() => onVisible({ parentOrgId: record.orgId, state: 1 })}
          >
            新增下级
          </CcsAuthButton>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CcsProTable
        auth="sys:org:list"
        proRef={proRef}
        toolbar={
          <CcsAuthButton
            type="primary"
            auth="sys:org:create"
            onClick={() => onVisible({ parentOrgId: 0, state: 1 })}
          />
        }
        onSearchAfter={(result) => {
          // 格式化接口数据：数据结构、添加children
          const { data } = result;
          data.forEach((e: SysOrgType) => {
            if (!e.leaf) e.children = [];
          });
          return { ...result, data };
        }}
        table={{
          request: queryOrgs,
          requestParam: { parentOrgId: 0 },
          asyncTree: { parentName: 'parentOrgId' },
          columns,
          rowKey: 'orgId',
          pagination: false,
        }}
      />
      <SysOrgForm proRef={proRef} $event={$event} />
    </>
  );
};
