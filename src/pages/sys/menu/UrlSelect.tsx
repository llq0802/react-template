import type { FC } from 'react';
import React from 'react';
import { Input } from 'antd';
import { CcsProTable } from '@ccs-design/rc-pro';
import { queryPageUrl } from './service';

interface SysMenuButtonType {
  urlId: number;
  urlName: string;
}

interface PropsType {
  value?: SysMenuButtonType;
  onVisible?: (visible: boolean) => void;
  onChange?: (button: SysMenuButtonType) => void;
}

const ButtonUrlSelect: FC<PropsType> = ({ value, onChange, onVisible }) => {
  const columns = [
    { title: 'URL名称', dataIndex: 'urlName' },
    { title: 'URL地址', dataIndex: 'urlPath', ellipsis: true },
  ];

  // 查询条件
  const formItems = [
    {
      label: '名称',
      name: 'urlName',
      value: <Input style={{ width: 100 }} placeholder="URL名称" allowClear />,
    },
    {
      label: '地址',
      name: 'urlPath',
      value: <Input style={{ width: 100 }} placeholder="URL地址" allowClear />,
    },
  ];

  // 选中
  const onRowSelection = (k: React.Key[], selectedRows: SysMenuButtonType[]) => {
    if (onChange) {
      onChange(selectedRows[0]);
      if (onVisible) onVisible(false);
    }
  };

  return (
    <CcsProTable
      isSimple
      formItems={formItems}
      fillSpace={false}
      table={{
        request: queryPageUrl,
        rowKey: 'urlId',
        columns,
        rowSelection: {
          type: 'radio',
          selectedRowKeys: value?.urlId ? [value.urlId] : [],
          onChange: onRowSelection,
        },
        pagination: { defaultPageSize: 5 },
      }}
    />
  );
};

export default ButtonUrlSelect;
