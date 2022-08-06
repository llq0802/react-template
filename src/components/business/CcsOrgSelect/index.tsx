import type { FC, Key } from 'react';
import React, { useState, useEffect } from 'react';
import { Spin, Tree } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { HttpResult } from '@ccs-design/rc-pro';
import type { SysOrgType } from '@/pages/sys/org/type.d';
import { queryOrgs } from '@/pages/sys/org/service';

interface PropsType {
  multiple?: boolean;
  value?: { orgId?: string; orgName?: string };
  onVisible?: (visible: boolean) => void;
  onChange?: ({ orgId, orgName }: { orgId: number; orgName: string }) => void;
}

interface ParamsType {
  parentOrgId: number;
}

function updateTreeData(list: SysOrgType[], key: React.Key, children: SysOrgType[]): SysOrgType[] {
  return list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}

/**
 * 组织选择组件
 * @param PropsType
 * @returns
 */
const CcsOrgSelect: FC<PropsType> = ({ value, multiple, onChange, onVisible }) => {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [nodeKeys, setNodeKeys] = useState<any[]>([]);
  // http query
  const {
    data = [],
    loading,
    mutate,
    run,
  } = useRequest<HttpResult<SysOrgType[]>, ParamsType[], SysOrgType[]>(queryOrgs, {
    // manual: true,
    defaultParams: [{ parentOrgId: 0 }],
    formatResult: (res) => {
      res.data.forEach((e: SysOrgType) => {
        e.title = e.orgName;
        e.key = e.orgId;
        e.isLeaf = e.leaf;
      });
      return res.data;
    },
  });

  // 监听value值改变
  useEffect(() => {
    const { orgId } = value || {};
    if (orgId) {
      if (multiple) {
        const ids = orgId.toString().split(',') || [];
        const idsInt = ids.map(Number);
        setNodeKeys([...idsInt]);
      } else {
        setSelectedKeys([orgId]);
      }
    } else if (multiple) {
      setNodeKeys([]);
    } else {
      setSelectedKeys([]);
    }
  }, [value]);

  // 异步加载数据
  const onLoadData = ({ key, children }: any) => {
    return new Promise<void>((resolve) => {
      if (children) {
        resolve();
      }
      // 获取下级数据
      run({ parentOrgId: key }).then((childrenData) => {
        // 更新数据
        const newData = updateTreeData(data, key, childrenData);
        mutate(newData);
        resolve();
      });
    });
  };

  // 单选
  const onSelect = (e: any, { node }: { node: any }) => {
    setSelectedKeys([node.orgId]);
    if (onChange) onChange({ orgId: node.orgId, orgName: node.orgName });
    /** 单选选中后关闭选择框 */
    if (onVisible) onVisible(false);
  };

  // 多选
  const onCheck = ({ checked }: any, { checkedNodes }: { checkedNodes: any[] }) => {
    const names: string[] = [];
    checkedNodes.forEach((e) => {
      names.push(e.title);
    });
    setNodeKeys([...checked]);
    if (onChange) onChange({ orgId: checked.toString(), orgName: names.toString() });
  };

  const props: any = {
    checkable: multiple,
    checkStrictly: true,
    loadData: onLoadData,
    treeData: data,
  };

  if (multiple) {
    props.onCheck = onCheck;
    props.checkedKeys = nodeKeys;
  } else {
    props.onSelect = onSelect;
    props.selectedKeys = selectedKeys;
  }

  return data.length ? <Tree {...props} style={{ padding: 5 }} /> : <Spin spinning={loading} />;
};

export default CcsOrgSelect;
