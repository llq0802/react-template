import React, { useRef, useState } from 'react';
import { Input, InputNumber, DatePicker, Alert, message, Cascader, Space } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { ProTableInstance, ItemType, HttpResult } from '@ccs-design/rc-pro';
import {
  useEvent,
  CcsProTable,
  CcsTrigger,
  CcsAuthButton,
  CcsAuthDropdown,
} from '@ccs-design/rc-pro';
import type { ColumnType } from 'antd/lib/table';
import { showConfirm } from '@/utils';
import SysUsersRole from './UserRole';
import SysUsersForm from './UserForm';
import SysUsersMenu from './UserMenu';
import type { SysUserType, SysUserTypePartial } from './type';
import { resetPwd, queryWorker, unlock } from './service';
import CcsStateBadge from '@/components/common/CcsStateBadge';
import { CcsStateSelect } from '@/components/common';
import { CcsOrgSelect, CcsRoleSelect } from '@/components/business';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export type EventType = { type: 'user' | 'role' | 'menu'; record: SysUserTypePartial };

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // table选中行
  const proRef = useRef<ProTableInstance>();
  const event = useEvent<EventType>();
  const userPwdRequest = useRequest<HttpResult>(resetPwd, { manual: true });
  const userUnlockRequest = useRequest<HttpResult>(unlock, { manual: true });

  // 重置
  const onResetPwd = async (user: SysUserType) => {
    const comfirm = await showConfirm(`确定重置账号${user.loginCode}的密码？`);
    if (!comfirm) return;
    const result = await userPwdRequest.run({ loginId: user.loginId });
    if (result.success) message.success('操作成功');
  };

  // 解锁
  const onUnlock = async (user: SysUserType) => {
    const comfirm = await showConfirm(`确定解锁账号${user.loginCode}？`);
    if (!comfirm) return;
    const result = await userUnlockRequest.run({ loginId: user.loginId });
    if (result.success) message.success('操作成功');
  };

  // 选中
  const onRowSelection = (selectedKeys: React.Key[], selectedRows: SysUserType[]) => {
    setSelectedRowKeys(selectedKeys);
    console.log('selectedRows', selectedRows);
  };

  const formItems: ItemType[] = [
    { label: '用户', name: 'workerName', value: <Input placeholder="请输入" allowClear /> },
    { label: '账号', name: 'loginCode', value: <Input placeholder="请输入" /> },
    {
      label: '级联',
      name: 'mobile11',
      value: <Cascader options={options} placeholder="Please select" />,
    },

    {
      label: '电话',
      name: 'mobile',
      value: <InputNumber style={{ width: '100%' }} placeholder="请输入" />,
    },
    { label: '状态', name: 'state', value: <CcsStateSelect /> },
    { label: '角色', name: 'roleId', value: <CcsRoleSelect />, depends: ['state', 'mobile'] },
    {
      label: '组织',
      name: 'orgValue',
      value: (
        <CcsTrigger showField="orgName">
          <CcsOrgSelect />
        </CcsTrigger>
      ),
    },
    // @ts-ignore
    { label: '创建时间', name: 'createTime', value: <DatePicker /> },
  ];

  // 操作栏
  const toolbar = (
    <>
      <CcsAuthButton
        type="primary"
        auth="sys:user:create"
        onClick={() => event.emit({ type: 'user', record: { state: 1 } })}
      />
      <CcsAuthDropdown
        menus={[
          { key: 1, auth: 'sys:user:multi:delete' },
          { key: 2, auth: 'sys:user:multi:other' },
        ]}
        disabled={selectedRowKeys.length === 0}
        onClick={(e) => console.log(`dropdown click`, e)}
      >
        <CcsAuthButton auth="sys:user:multi" />
      </CcsAuthDropdown>
    </>
  );

  const renderTableHeader = (
    <Alert
      message={
        <span>
          已选择<a> {selectedRowKeys.length} </a>条记录。
        </span>
      }
      type="info"
      showIcon
      closable
      onClose={() => {
        onRowSelection([], []);
      }}
    />
  );

  // 更多操作DropDown
  const onDropDown = (key: string, record: SysUserType) => {
    switch (key) {
      case '1':
        event.emit({ type: 'role', record });
        break;
      case '2':
        event.emit({ type: 'menu', record });
        break;
      case '3':
        onResetPwd(record);
        break;
      case '4':
        onUnlock(record);
        break;
      default:
        break;
    }
  };

  const columns: ColumnType<any>[] = [
    {
      title: '用户名',
      dataIndex: 'workerName',
      ellipsis: true,
    },
    { title: '账号', dataIndex: 'loginCode', ellipsis: true, sorter: true },
    { title: '组织', dataIndex: 'orgName', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'state',
      ellipsis: true,
      width: 80,
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
      width: 60,
      render(val: number) {
        return val === 0 ? '女' : '男';
      },
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      ellipsis: true,
      width: 110,
      render(val: string) {
        return val && val.substring(0, 10);
      },
    },
    { title: '创建时间', dataIndex: 'createTime', ellipsis: true },
    {
      title: '操作',
      // fixed: 'right',
      render: (record: SysUserType) => (
        <Space>
          <CcsAuthButton
            type="link"
            auth="sys:user:update"
            onClick={() => event.emit({ type: 'user', record })}
          />
          <CcsAuthDropdown
            auth="sys:user:more"
            menus={[
              { key: '1', name: '关联角色', auth: 'sys:user:role:list' },
              { key: '2', name: '权限查看', auth: 'sys:user:menu:tree' },
              { key: '3', name: '重置', style: { color: '#FF5722' }, auth: 'sys:user:pwd:reset' },
              { key: '4', name: '解锁', auth: 'sys:user:unlock' },
            ]}
            onClick={(item) => onDropDown(item.key, record)}
          >
            {({ name }) => <a className="ant-dropdown-link">{name}</a>}
          </CcsAuthDropdown>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CcsProTable
        auth="sys:user:list"
        proRef={proRef}
        formItems={formItems}
        formInitValues={{ roleId: 10001 }}
        onSearchBefore={(vs: any) => {
          let { createTime } = vs;
          const { orgValue = {} } = vs;
          if (createTime) {
            createTime = createTime.format('YYYY-MM-DD');
          }
          return { ...vs, createTime, orgId: orgValue.orgId };
        }}
        toolbar={toolbar}
        tableHeader={selectedRowKeys.length > 0 ? renderTableHeader : null}
        table={{
          request: queryWorker,
          rowKey: 'loginId',
          columns,
          rowSelection: {
            selectedRowKeys,
            onChange: onRowSelection,
            preserveSelectedRowKeys: true,
          },
          scroll: { x: 1200 },
        }}
        watermark="Elastic Micro"
      />
      <SysUsersForm proRef={proRef} event={event} />
      <SysUsersRole event={event} />
      <SysUsersMenu event={event} />
    </>
  );
};
