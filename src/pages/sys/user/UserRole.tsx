import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { Checkbox, Row, Col, Modal, Spin, message } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { EventInstance, HttpResult } from '@ccs-design/rc-pro';
import { doRole, getRoles } from './service';
import type { SysUserRole } from './type';
import type { EventType } from '.';
import { isNotEmpty } from '@/utils';

interface ParamType {
  loginId?: number;
}

interface PropsType {
  event: EventInstance<EventType>;
}

const SysUsersRole: FC<PropsType> = ({ event }) => {
  const [values, setValues] = useState<EventType['record']>({});
  const { loginId } = values;
  const visible = isNotEmpty(values);

  event.useSubscription((val) => {
    if (val.type === 'role') setValues(val.record);
  });

  // 用户关联角色request
  const updateRequest = useRequest<HttpResult>(doRole, { manual: true });
  // 用户角色关联关系
  const {
    run,
    data = [],
    loading,
    mutate,
  } = useRequest<HttpResult<SysUserRole[]>, ParamType[], SysUserRole[], SysUserRole[]>(getRoles, {
    manual: true,
    formatResult: (res) => {
      return res.data;
    },
  });

  // loginId改变、重新获取数据
  useEffect(() => {
    if (loginId) run({ loginId });
  }, [loginId]);

  // checked change
  const onChange = (e: any, index: number) => {
    data[index].checked = e.target.checked;
    mutate(data);
  };

  // ok
  const okHandle = async () => {
    const roleIds = data.map((d) => (d.checked ? d.roleId : null));
    const result = await updateRequest.run({
      loginId,
      roleIds: roleIds.filter((r) => r),
    });

    if (result.success) {
      setValues({});
      message.success('操作成功');
    }
  };

  return loginId ? (
    <Modal
      title="用户关联角色"
      visible={visible}
      width={400}
      onOk={okHandle}
      onCancel={() => setValues({})}
      confirmLoading={updateRequest.loading}
    >
      <Spin spinning={loading}>
        <Row>
          {data?.map((item, index) => (
            <Col key={item.roleId} span={24} style={{ marginBottom: 5 }}>
              <Checkbox
                value={item.roleId}
                onChange={(e) => onChange(e, index)}
                checked={item.checked}
              >
                {item.roleName}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Spin>
    </Modal>
  ) : null;
};

export default SysUsersRole;
