import type { FC } from 'react';
import React from 'react';
import { Spin, Tree } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { HttpResult } from '@ccs-design/rc-pro';
import type { SysOrgType } from '@/pages/sys/org/type';
import { queryOrgs } from '@/pages/sys/org/service';

interface PropsType {
  onChange: (orgId: number) => void;
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
const TreeSelect: FC<PropsType> = ({ onChange }) => {
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
    onChange(node.orgId);
  };

  const props: any = {
    checkStrictly: true,
    treeData: data,
    loadData: onLoadData,
    onSelect,
  };

  return data.length ? <Tree {...props} style={{ padding: 5 }} /> : <Spin spinning={loading} />;
};

export default TreeSelect;
