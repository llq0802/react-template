import React, { useRef } from 'react';
import { Input } from 'antd';
import type { ProTableInstance } from '@ccs-design/rc-pro';
import { CcsProTable, CcsAuthButton, useEvent } from '@ccs-design/rc-pro';
import { CcsStateBadge } from '@/components/common';
import UrlsGroupForm from './UrlGroupModel';
import UrlsGroupDrawer from './UrlGroupDrawer';
import type { SysUrlGroupType, SysUrlGroupTypePartial } from './type';
import { queryPageUrlGroup } from './service';

export type ActionType = 'group' | 'groupUrl';

export default () => {
  const proRef = useRef<ProTableInstance>(null);
  const $event = useEvent<SysUrlGroupTypePartial, ActionType>();

  const columns = [
    { title: 'URL组名', dataIndex: 'groupName' },
    { title: '组说明', dataIndex: 'groupDesc', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'state',
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
    // { title: '创建时间', dataIndex: 'createTime' },
    {
      title: '操作',
      width: '30%',
      render: (record: SysUrlGroupType) => (
        <span className="buttons">
          <CcsAuthButton
            auth="sys:url:group:update"
            type="link"
            onClick={() => $event.emit(record, 'group')}
          />
          <CcsAuthButton
            auth="sys:url:group:connect:list"
            type="link"
            onClick={() => $event.emit(record, 'groupUrl')}
          />
        </span>
      ),
    },
  ];

  // const toolbar = (
  //   <CcsAuthButton
  //     auth="sys:url:group:create"
  //     type="primary"
  //     onClick={() => $event.emit({ state: 1 }, 'group')}
  //   />
  // );

  // 查询条件
  const formItems = [
    { label: 'URL组名', name: 'groupName', value: <Input placeholder="请输入" allowClear /> },
  ];

  return (
    <>
      <CcsProTable
        auth="sys:url:group:list"
        proRef={proRef}
        formInitValues={{ roleId: 10001 }}
        formItems={formItems}
        // toolbar={toolbar}
        table={{
          request: queryPageUrlGroup,
          rowKey: 'groupId',
          columns,
        }}
      />
      <UrlsGroupForm $event={$event} proRef={proRef} />
      <UrlsGroupDrawer $event={$event} />
    </>
  );
};
