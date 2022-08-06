import type { FC } from 'react';
import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader, Spin } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { CascaderOptionType, CascaderValueType } from 'antd/lib/cascader';

interface CcsCascaderSelectProps extends CascaderProps {
  onChange?: (value: CascaderValueType, selectedOptions?: CascaderOptionType[] | undefined) => void;
  [key: string]: any;
}

// 模拟请求
const getValue = () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve([
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
      ]);
    }, 1000);
  });
};

/**
 * 级联组件
 * @param CcsCascaderSelectProps
 * @returns
 */
const CcsCascaderSelect: FC<CcsCascaderSelectProps> = ({ onChange, ...restProps }) => {
  // 请求数据，并缓存静态值
  const { loading, data } = useRequest<any>(getValue, {
    cacheKey: `_Cascader_data`,
    staleTime: 300000,
  });

  const handleChange = (e: any) => {
    if (onChange) onChange(e);
  };

  return (
    <Spin spinning={loading}>
      {data ? (
        // @ts-ignore
        <Cascader onChange={handleChange} placeholder="请选择" {...restProps} options={data} />
      ) : null}
    </Spin>
  );
};

export default CcsCascaderSelect;
