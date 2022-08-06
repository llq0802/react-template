import type { FC } from 'react';
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export interface StateProps {
  onChange?: Function;
}

const data = [
  { key: 1, name: '有效' },
  { key: 0, name: '无效' },
];

/**
 * 状态选择组件，适用查询条件，表单中使用，可赋初始值。
 */
const CcsStateSelect: FC<StateProps> = ({ onChange, ...restProps }) => {
  const handleChange = (e: any) => {
    if (onChange) onChange(e);
  };

  return (
    <Select
      {...{
        allowClear: true,
        placeholder: '请选择',
        style: { width: '100%' },
        onChange: handleChange,
        ...restProps,
      }}
    >
      {data.map((item) => (
        <Option key={item.key} value={item.key}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};

export default CcsStateSelect;
