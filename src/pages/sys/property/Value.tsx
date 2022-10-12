import type { FC } from 'react';
import React, { useRef } from 'react';
import { Input } from 'antd';
import type { ItemType, ProTableInstance, TabPropType } from '@ccs-design/rc-pro';
import { CcsProTable, CcsAuthButton, useEvent } from '@ccs-design/rc-pro';
import { CcsStateBadge } from '@/components/common';
import SysPropertysValueForm from './ValueModel';
import type { SysPropValueType, SysPropValueTypePartial } from './types';
import { queryPageValue } from './service';

interface PropsType extends TabPropType {
  params?: { propCode?: string; propId?: number };
}

const SysPropertyValue: FC<PropsType> = ({ params }) => {
  const proRef = useRef<ProTableInstance>(null);
  const $event = useEvent<SysPropValueTypePartial>();

  // 属性值、新增编辑
  const onVisible = (values?: SysPropValueTypePartial) => {
    $event.emit({ ...values, propCode: params?.propCode });
  };

  const columns = [
    {
      title: '属性值',
      dataIndex: 'valueCode',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
    {
      title: '名称',
      dataIndex: 'valueName',
      ellipsis: true,
    },
    {
      title: '属性描述',
      dataIndex: 'valueDesc',
    },
    {
      title: '序号',
      dataIndex: 'sortId',
    },
    {
      title: '操作',
      fixed: 'right' as unknown as 'right',
      width: 100,
      render: (_: any, record: SysPropValueType) => (
        <CcsAuthButton
          auth="sys:static:value:update"
          type="link"
          onClick={() => onVisible(record)}
        />
      ),
    },
  ];

  const toolbar = (
    <CcsAuthButton
      auth="sys:static:value:create"
      type="primary"
      onClick={() =>
        onVisible({
          propId: params?.propId,
          state: 1,
          sortId: 0,
        })
      }
    />
  );

  const formItems: ItemType[] = [
    { label: '属性值', name: 'valueCode', value: <Input placeholder="请输入" allowClear /> },
    { label: '名称', name: 'valueName', value: <Input placeholder="请输入" allowClear /> },
  ];

  return (
    <>
      <CcsProTable
        auth="sys:static:value:list"
        proRef={proRef}
        formItems={formItems}
        toolbar={toolbar}
        table={{
          columns,
          rowKey: 'valueId',
          requestParam: { propCode: params?.propCode },
          request: queryPageValue,
        }}
      />
      <SysPropertysValueForm proRef={proRef} $event={$event} />
    </>
  );
};

export default React.memo(SysPropertyValue);
