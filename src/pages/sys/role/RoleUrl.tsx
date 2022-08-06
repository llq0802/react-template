import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { Checkbox, Row, Col, Modal, Spin, message } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { EventInstance, HttpResult } from '@ccs-design/rc-pro';
import type { SysRoleTypePartial, SysRoleUrlType } from './type';
import { queryUrl, saveGroups } from './service';
import type { ActionType } from '.';

interface RoleUrlProps {
  $event: EventInstance<SysRoleTypePartial, ActionType>;
}

interface ParamType {
  roleId?: number;
}

const SysRoleUrl: FC<RoleUrlProps> = ({ $event }) => {
  const [visible, setVisible] = useState(false);
  const { roleId } = $event.useSubscription(() => setVisible(true), 'url');
  const groupsRequest = useRequest<HttpResult>(saveGroups, { manual: true });

  // 获取url request
  const {
    data = [],
    loading,
    mutate,
    run,
  } = useRequest<HttpResult<SysRoleUrlType[]>, ParamType[], SysRoleUrlType[]>(queryUrl, {
    manual: true,
    formatResult: (res) => {
      return res.data || [];
    },
  });

  // roleId改变重新请求数据
  useEffect(() => {
    if (roleId) run({ roleId });
  }, [roleId]);

  const onChange = (e: any, index: number) => {
    data[index].checked = e.target.checked;
    mutate(data);
  };

  // URL权限保存
  const onOk = async () => {
    let groupIds: number[] = [];
    data.forEach((e: SysRoleUrlType) => {
      if (e.checked) groupIds = [...groupIds, e.groupId];
    });

    const result = await groupsRequest.run({ roleId: roleId || 0, groupIds });
    if (result.success) {
      setVisible(false);
      message.success('操作成功');
    }
  };

  return (
    <Modal
      title="URL权限"
      visible={visible}
      width={500}
      onOk={onOk}
      onCancel={() => setVisible(false)}
      confirmLoading={groupsRequest.loading}
    >
      <Spin spinning={loading}>
        <Row>
          {data.map((item, index) => (
            <Col key={item.groupId} span={12} style={{ marginBottom: 5 }}>
              <Checkbox
                value={item.groupId}
                onChange={(e) => onChange(e, index)}
                checked={item.checked}
              >
                {item.groupName}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Spin>
    </Modal>
  );
};

export default SysRoleUrl;
