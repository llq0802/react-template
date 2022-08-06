import type { FC } from 'react';
import React from 'react';
import { Input } from 'antd';
import { CcsProTable } from '@ccs-design/rc-pro';
import { CcsStateBadge } from '@/components/common';
import { queryWorker } from '@/pages/sys/user/service';
import type { SysUserType } from '@/pages/sys/user/type';

interface ValueType {
  loginIds?: React.Key[] | React.Key;
  workerNames?: string;
}

interface PropsType {
  /** 多选 */
  multiple?: boolean;
  value?: ValueType;
  onVisible?: (visible: boolean) => void;
  onChange?: ({ loginIds, workerNames }: ValueType) => void;
}

const CcsWorkerSelect: FC<PropsType> = ({ value, multiple, onChange, onVisible }) => {
  const columns = [
    { title: '员工名称', dataIndex: 'workerName', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'state',
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
  ];

  // 查询条件
  const formItems = [
    { name: 'workerName', value: <Input placeholder="员工名称" style={{ width: 150 }} /> },
  ];

  // 选中
  const onRowSelection = (selectedKeys: React.Key[], selectedRows: SysUserType[]) => {
    if (onChange) {
      // 多选
      if (multiple) {
        onChange({
          loginIds: selectedKeys,
          workerNames: selectedRows.map((r) => r.workerName).toString(),
        });
        return;
      }

      // 单选
      onChange({
        loginIds: selectedKeys[0],
        workerNames: selectedRows[0].workerName,
      });
      if (onVisible) onVisible(false);
    }
  };

  let selectedRowKeys: any = [];
  if (multiple) {
    selectedRowKeys = value?.loginIds || [];
  } else {
    selectedRowKeys = value?.loginIds ? [value?.loginIds] : [];
  }

  return (
    <>
      <CcsProTable
        isSimple
        formInitValues={{ roleId: 10001 }}
        formItems={formItems}
        fillSpace={false}
        table={{
          request: queryWorker,
          rowKey: 'loginId',
          columns,
          rowSelection: {
            type: multiple ? 'checkbox' : 'radio',
            selectedRowKeys,
            onChange: onRowSelection,
          },
        }}
      />
    </>
  );
};

export default CcsWorkerSelect;
