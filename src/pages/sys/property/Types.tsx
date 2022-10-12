import type { FC } from 'react';
import React, { useRef } from 'react';
import { Input } from 'antd';
import type { ProTableInstance, ItemType, TabPropType } from '@ccs-design/rc-pro';
import { CcsProTable, CcsAuthButton, useEvent } from '@ccs-design/rc-pro';
import { CcsStateBadge } from '@/components/common';
import type { SysPropType, SysPropTypePartial } from './types';
import { queryPageProperty } from './service';
import SysPropertyTypeForm from './TypeModel';

const SysPropertyType: FC<TabPropType> = ({ onChangeKey, onDisabled }) => {
  const proRef = useRef<ProTableInstance>(null);
  const $event = useEvent<SysPropTypePartial>();

  // 根据Id获取属性值
  const onGetValueById = (propCode: string, propId: number) => {
    if (onChangeKey) onChangeKey('2', { propCode, propId });
  };

  const columns = [
    {
      title: '属性编码',
      dataIndex: 'propCode',
    },
    {
      title: '属性名称',
      dataIndex: 'propName',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
    {
      title: '说明',
      dataIndex: 'propDesc',
    },
    {
      title: '操作',
      fixed: 'right' as unknown as 'right',
      width: 150,
      render: (record: SysPropType) => (
        <span className="buttons">
          <CcsAuthButton
            auth="sys:static:property:update"
            type="link"
            onClick={() => $event.emit(record)}
          />
          <CcsAuthButton
            auth="sys:static:value:list"
            type="link"
            onClick={() => onGetValueById(record.propCode, record.propId)}
          >
            属性值
          </CcsAuthButton>
        </span>
      ),
    },
  ];

  const formItems: ItemType[] = [
    [
      { label: '编码', name: 'propCode', value: <Input placeholder="请输入" allowClear /> },
      { label: '名称', name: 'propName', value: <Input placeholder="请输入" allowClear /> },
    ],
  ];

  const toolbar = (
    <CcsAuthButton
      auth="sys:static:property:list"
      type="primary"
      onClick={() => $event.emit({ state: 1 })}
    />
  );

  return (
    <>
      <CcsProTable
        auth="sys:static:property:list"
        proRef={proRef}
        formItems={formItems}
        searchEvent={() => {
          if (onDisabled) onDisabled('2');
        }}
        toolbar={toolbar}
        table={{
          columns,
          rowKey: 'propId',
          request: queryPageProperty,
        }}
      />
      <SysPropertyTypeForm proRef={proRef} $event={$event} />
    </>
  );
};

export default SysPropertyType;
