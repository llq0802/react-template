import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { Modal, Spin, Tree } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { EventInstance, HttpResult } from '@ccs-design/rc-pro';
import type { DataNode } from 'antd/lib/tree';
import { getMenus } from './service';
import type { SysRoleMenuType } from '../role/type';
import type { EventType } from '.';
import { isNotEmpty } from '@/utils';

interface PropsType {
  event: EventInstance<EventType>;
}

interface TreeDataType {
  checkedIds: string[];
  halfCheckedIds: string[];
  nodes: DataNode[];
}

const onFormat = (nodes: any[]): DataNode[] => {
  nodes.forEach((n) => {
    n.key = n.nodeId;
    n.title = n.nodeName;
    if (n.children) {
      onFormat(n.children);
    }
  });
  return nodes;
};

const SysUsersMenu: FC<PropsType> = ({ event }) => {
  const [values, setValues] = useState<EventType['record']>({});
  const { loginId } = values;
  const visible = isNotEmpty(values);

  event.useSubscription((val) => {
    if (val.type === 'menu') setValues(val.record);
  });

  const {
    data = { checkedIds: [], halfCheckedIds: [], nodes: [] },
    run,
    loading,
  } = useRequest<HttpResult<SysRoleMenuType>, any, TreeDataType>(getMenus, {
    defaultParams: { loginId },
    manual: true,
    formatResult: (res) => {
      const { data: d } = res;
      // 格式化数据4.17才支持fieldNames属性
      return { ...d, nodes: onFormat(d.nodes) };
    },
  });

  // 每次打开、刷新权限数据
  useEffect(() => {
    if (visible) run({ loginId });
  }, [visible]);

  return (
    <Modal
      title="用户菜单权限"
      visible={visible}
      width={400}
      footer={null}
      onCancel={() => setValues({})}
    >
      <Spin spinning={loading}>
        <Tree
          treeData={data.nodes}
          checkable
          checkedKeys={data.checkedIds}
          autoExpandParent
          checkStrictly
        />
      </Spin>
    </Modal>
  );
};

export default SysUsersMenu;
