import type { FC } from 'react';
import React from 'react';
import { Select, Spin } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { HttpPageResult } from '@ccs-design/rc-pro';
import { queryPageRole } from '@/pages/sys/role/service';
import type { SysRoleType } from '@/pages/sys/role/type';

const { Option } = Select;

interface CcsRoleSelectProps {
  onChange?: Function;
}

/**
 * 角色选择组件，适用查询条件，表单中使用，可赋初始值。
 * @param CcsRoleSelectProps
 * @returns
 */
const CcsRoleSelect: FC<CcsRoleSelectProps> = ({ onChange, ...restProps }) => {
  // 请求数据，并缓存值
  const { loading, data } = useRequest<HttpPageResult<SysRoleType>, any, SysRoleType[]>(
    queryPageRole,
    {
      defaultParams: [{ query: {}, pageNo: 1, pageSize: 999 }],
      cacheKey: `ROLES`,
      staleTime: 300000,
      formatResult: (re) => {
        if (re && re.data) return re.data.result;
        return [];
      },
    },
  );

  const handleChange = (e: any) => {
    if (onChange) onChange(e);
  };

  return (
    <Spin spinning={loading}>
      <Select
        {...{
          allowClear: true,
          placeholder: '请选择',
          style: { width: '100%' },
          onChange: handleChange,
          ...restProps,
        }}
      >
        {data &&
          data.map((item: SysRoleType) => (
            <Option value={item.roleId || 0} key={item.roleId}>
              {item.roleName}
            </Option>
          ))}
      </Select>
    </Spin>
  );
};

export default CcsRoleSelect;
