import React, { useRef } from 'react';
import * as icons from '@ant-design/icons';
import { Alert, Space, Tag } from 'antd';
import type { ProTableInstance } from '@ccs-design/rc-pro';
import { CcsProTable, CcsAuthButton, useEvent } from '@ccs-design/rc-pro';
import { CcsStateBadge } from '@/components/common';
import type { SysMenuType, SysMenuTypePartial } from './type';
import { queryMenu } from './service';
import AddOrEditModel from './AddOrEditModel';

export default () => {
  const proRef = useRef<ProTableInstance<SysMenuType>>(null);
  const $event = useEvent<SysMenuTypePartial>();

  // 新增 or 关闭模态框
  const onVisible = (values: SysMenuTypePartial = {}) => {
    $event.emit(values);
  };

  const renderIcon = (key: string) => {
    if (key === '' || !key) return '';
    if (icons[key]) {
      const DynamicIcon = icons[key];
      return <DynamicIcon />;
    }
    console.error(`icon key ${key} 不存在。`);
    return '';
  };

  const columns = [
    {
      title: '菜单名称',
      ellipsis: true,
      render: (record: SysMenuType) => {
        const renderTag = () => {
          if (record.menuType === 2) {
            return record.state === 1 ? (
              <Tag color="orange">{record.menuName}</Tag>
            ) : (
              <Tag color="#d9d9d9">{record.menuName}</Tag>
            );
          }
          return <span style={{ opacity: record.state === 1 ? 1 : 0.5 }}>{record.menuName}</span>;
        };
        return renderTag();
      },
    },
    {
      title: '菜单描述',
      dataIndex: 'menuDesc',
      ellipsis: true,
    },
    {
      title: '菜单链接',
      dataIndex: 'menuUrl',
      ellipsis: true,
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      render: (value: string) => renderIcon(value),
    },
    // {
    //   title: '序号',
    //   dataIndex: 'sortId',
    // },
    {
      title: '状态',
      dataIndex: 'state',
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
    {
      title: '操作',
      width: 180,
      render: (record: SysMenuType) => (
        <Space>
          {record.parentMenuCode ? (
            <CcsAuthButton type="link" auth="sys:menu:update" onClick={() => onVisible(record)} />
          ) : null}
          {record.menuType === 0 ? ( // 目录
            <CcsAuthButton
              type="link"
              auth="sys:menu:create"
              onClick={() => onVisible({ parentMenuCode: record.menuCode, state: 1 })}
            >
              新增下级
            </CcsAuthButton>
          ) : null}
          {record.menuType === 1 ? ( // 菜单
            <CcsAuthButton
              type="link"
              auth="sys:menu:create"
              onClick={() =>
                onVisible({
                  parentMenuCode: record.menuCode,
                  state: 1,
                  menuType: 2,
                })
              }
            >
              新增按钮
            </CcsAuthButton>
          ) : null}
          {record.menuType === 2 ? ( // 按钮
            <CcsAuthButton
              type="link"
              auth="sys:menu:create"
              onClick={() =>
                onVisible({
                  ...record,
                  menuName: `${record.menuName} - 复制`,
                  menuCode: undefined,
                })
              }
              style={{ color: 'orange' }}
            >
              复制
            </CcsAuthButton>
          ) : null}
        </Space>
      ),
    },
  ];

  return (
    <>
      <CcsProTable
        proRef={proRef}
        auth="sys:menu:list"
        toolbar={
          <CcsAuthButton
            type="primary"
            auth="sys:menu:create"
            onClick={() => onVisible({ parentMenuCode: '1', state: 1 })}
          />
        }
        onSearchAfter={(e) => {
          // 格式化接口数据：数据结构、添加children
          const { data } = e;
          data.forEach((d: SysMenuType) => {
            if (d.menuType !== 2) d.children = [];
          });
          return { ...e, data };
        }}
        tableHeader={
          <Alert
            message={<span> 演示环境、请勿添加测试菜单。请在自己的环境下做测试。</span>}
            type="warning"
            showIcon
          />
        }
        table={{
          request: queryMenu,
          requestParam: { parentMenuCode: '1' },
          asyncTree: { parentName: 'parentMenuCode' },
          columns,
          rowKey: 'menuCode',
          pagination: false,
        }}
      />
      <AddOrEditModel proRef={proRef} $event={$event} />
    </>
  );
};
