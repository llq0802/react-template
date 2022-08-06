import type { FC } from 'react';
import React from 'react';
import { Select, Spin } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { HttpPageResult } from '@ccs-design/rc-pro';
import { queryPageValue } from '@/pages/sys/property/service';
import type { SysPropValueType } from '@/pages/sys/property/type.d';
// import type { SysPropValueType } from '@/pages/sys/property/type.d';

const { Option } = Select;

interface CcsStaticSelectProps {
  propCode: string;
  onChange?: Function;
}
interface ParamType {
  query: { propCode: string; state: number };
  pageNo: number;
  pageSize: number;
}

/**
 * 静态值选择组件，适用查询条件，表单中使用，可赋初始值。 传入propCode
 * 数据缓存：每个类型的值只请求一次
 * @param CcsStaticSelectProps
 * @returns
 */
const CcsStaticSelect: FC<CcsStaticSelectProps> = ({ propCode, onChange, ...restProps }) => {
  // 请求数据，并缓存静态值
  const { loading, data } = useRequest<
    HttpPageResult<SysPropValueType>,
    ParamType[],
    SysPropValueType[]
  >(queryPageValue, {
    defaultParams: [{ query: { propCode, state: 1 }, pageNo: 1, pageSize: 999 }],
    cacheKey: `STATIC_${propCode}`,
    staleTime: 300000,
    formatResult: (re) => {
      if (re && re.data) return re.data.result;
      return [];
    },
  });

  const handleChange = (e: any) => {
    if (onChange) onChange(e);
  };

  return (
    <Spin spinning={loading}>
      {data ? (
        <Select
          {...{
            allowClear: true,
            placeholder: '请选择',
            style: { width: '100%' },
            onChange: handleChange,
            showSearch: true,
            filterOption: (input: string, option: any) => option.children.indexOf(input) >= 0,
            ...restProps,
          }}
        >
          {data.map((item: SysPropValueType) => (
            <Option value={item.valueCode || 0} key={item.valueId}>
              {item.valueName}
            </Option>
          ))}
        </Select>
      ) : null}
    </Spin>
  );
};

export default CcsStaticSelect;
