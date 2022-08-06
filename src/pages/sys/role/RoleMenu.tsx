import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { message, Spin, Tag, Tree } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { EventInstance, HttpResult } from '@ccs-design/rc-pro';
import { CcsDrawer } from '@ccs-design/rc-pro';
import type { DataNode } from 'antd/lib/tree';
import { queryMenu, saveMenu } from './service';
import type { SysRoleMenuType, SysRoleTypePartial } from './type';
import type { ActionType } from '.';
import styles from './index.less';

interface PropsType {
  $event: EventInstance<SysRoleTypePartial, ActionType>;
}

interface ParamsType {
  roleId: number;
}

interface TreeDataType {
  checkedIds: string[];
  halfCheckedIds: string[];
  nodes: DataNode[];
}

const onFormat = (nodes: any[]): DataNode[] => {
  nodes.forEach((res) => {
    res.key = res.nodeId;
    res.title = res.nodeName;
    if (res.children) {
      onFormat(res.children);
    }
  });
  return nodes;
};

const SysRoleMenu: FC<PropsType> = ({ $event }) => {
  const [visible, setVisible] = useState(false);
  const isChange = useRef<boolean>(false); // 是否发生选中改变
  const { roleId } = $event.useSubscription(() => setVisible(!visible), 'menu');
  const menuRequest = useRequest<HttpResult>(saveMenu, { manual: true });

  // 查询菜单树
  const {
    data = { nodes: [], checkedIds: [], halfCheckedIds: [] },
    loading,
    run,
    mutate,
  } = useRequest<HttpResult<SysRoleMenuType>, ParamsType[], TreeDataType>(queryMenu, {
    manual: true,
    formatResult: (res) => {
      const { data: d } = res;
      // 格式化数据4.17才支持fieldNames属性
      return { ...d, nodes: onFormat(d.nodes) };
    },
  });

  // role改变重新请求数据
  useEffect(() => {
    if (roleId) run({ roleId });
  }, [roleId]);

  // 选中事件
  const onCheck = (keys: any, e: any) => {
    isChange.current = true;
    console.log('e', e, keys);
    mutate({ ...data, checkedIds: keys, halfCheckedIds: e.halfCheckedKeys });
  };

  // 保存数据
  const onOk = async () => {
    const param = {
      roleId,
      menuCodes: [...data.checkedIds, ...data.halfCheckedIds],
    };

    const result = await menuRequest.run(param);
    if (result.success) {
      setVisible(false);
      message.success('操作成功');
    }
  };

  return (
    <CcsDrawer
      auth="sys:role:menu:update"
      title="菜单权限"
      visible={visible}
      mode={500}
      onOk={isChange.current ? onOk : () => setVisible(false)}
      onClose={() => setVisible(false)}
      loading={menuRequest.loading}
    >
      <Spin spinning={loading}>
        <Tree
          checkable
          onCheck={onCheck}
          checkedKeys={data.checkedIds}
          checkStrictly={false}
          className={styles.tree}
          titleRender={(item: any) => (
            <div className={styles.title}>
              {item.nodeData.menuType === 2 ? ( // 按钮和url权限
                <>
                  <Tag color="orange">{item.nodeName}</Tag>
                  <div style={{ color: '#848587' }}>{`(${item.nodeData.menuDesc})`}</div>
                </>
              ) : (
                <div>
                  {item.nodeName}
                  {item.nodeId}
                </div>
              )}
            </div>
          )}
          treeData={data.nodes as any}
        />
      </Spin>
    </CcsDrawer>
  );
};

export default SysRoleMenu;
