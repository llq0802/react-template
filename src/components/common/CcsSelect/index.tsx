import type { ReactText } from 'react';
import React, { useEffect } from 'react';
import { Select } from 'antd';
import _isNil from 'lodash/isNil';

export interface PropsType<T> {
  /** 指定选中项 */
  value?: any;
  /** 可选项数据源 */
  options?: T[];
  /** 选择完成后的回调 */
  onChange?: Function;
  /** 自定义 options 中 label value 的字段 */
  fieldNames?: { label: string; value: ReactText };
}

/**
 * select 组件二次封装、处理未匹配到的值
 */
function CcsSelect<T>({ onChange, options = [], fieldNames, ...restProps }: PropsType<T>) {
  const handleChange = (e: any) => {
    if (onChange) onChange(e);
  };

  useEffect(() => {
    // 判断选中值未匹配到选项，清除选中值
    if (!_isNil(restProps.value) && options?.length) {
      const f = options.find((o) => o[fieldNames?.value || 'value'] === restProps.value);
      if (!f) {
        if (onChange) onChange(undefined);
      }
    }
  }, [options]);

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
      {options.map((o) => (
        <Select.Option
          key={o[fieldNames?.value || 'value']}
          value={o[fieldNames?.value || 'value']}
        >
          {o[fieldNames?.label || 'label']}
        </Select.Option>
      ))}
    </Select>
  );
}

export default CcsSelect;
