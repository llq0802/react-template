import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import useRequest from '@ahooksjs/use-request';
import { Table, Transfer } from 'antd';
import _difference from 'lodash/difference';
import type { EventInstance, HttpResult } from '@ccs-design/rc-pro';
import { CcsDrawer } from '@ccs-design/rc-pro';
import type { ActionType } from './UrlGroup';
import { createGroupUrl, queryGroupUrl } from './service';
import type { SysUrlGroupCheckedType, SysUrlGroupTypePartial } from './type';

const leftTableColumns = [
  {
    dataIndex: 'urlName',
    title: 'URL名称',
  },
  {
    dataIndex: 'urlPath',
    title: 'URL地址',
    ellipsis: true,
  },
];

const rightTableColumns = [
  {
    dataIndex: 'urlName',
    title: 'URL名称',
  },
];

interface ParamsType {
  groupId?: number;
}

interface PropsType {
  $event: EventInstance<SysUrlGroupTypePartial, ActionType>;
}

const UrlsGroupDrawer: FC<PropsType> = ({ $event }) => {
  const [visible, setVisible] = useState(false);
  const { groupId, groupName } = $event.useSubscription(() => setVisible(true), 'groupUrl');
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  // query
  const queryRequest = useRequest<
    HttpResult<SysUrlGroupCheckedType[]>,
    ParamsType[],
    SysUrlGroupCheckedType[]
  >(queryGroupUrl, {
    manual: true,
    formatResult: (res) => {
      const { data: resData } = res;
      // 生成选择keys 和添加key字段
      const initCheckedKeys: string[] = [];
      resData.forEach((e) => {
        e.key = e.urlId.toString();
        if (e.checked) initCheckedKeys.push(e.urlId.toString());
      });
      setCheckedKeys(initCheckedKeys);
      return resData;
    },
  });
  // save request
  const { run, loading } = useRequest<HttpResult>(createGroupUrl, { manual: true });

  // 获取关联数据
  useEffect(() => {
    if (groupId) queryRequest.run({ groupId });
  }, [groupId]);

  // 穿梭选择改变
  const onChange = (nextTargetKeys: string[]) => {
    setCheckedKeys([...nextTargetKeys]);
  };

  // 确定
  const onSave = async () => {
    const result = await run({ groupId, urlIds: checkedKeys });
    if (result.success) {
      setVisible(false);
    }
  };

  return (
    <CcsDrawer
      auth="sys:url:group:connect"
      visible={visible}
      loading={loading}
      title={`${groupName} - 关联URL`}
      onClose={() => setVisible(false)}
      onOk={onSave}
      bodyStyle={{ padding: 16 }}
    >
      <Transfer
        titles={['URL列表', '已关联']}
        dataSource={queryRequest.data}
        showSearch
        targetKeys={checkedKeys}
        showSelectAll={false}
        rowKey={(record) => record.urlId.toString()}
        onChange={onChange}
        filterOption={(inputValue: any, item: SysUrlGroupCheckedType) =>
          item.urlName.indexOf(inputValue) !== -1 || item.urlPath.indexOf(inputValue) !== -1
        }
      >
        {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
        }) => {
          const columns = direction === 'left' ? leftTableColumns : rightTableColumns;
          const rowSelection = {
            onSelectAll(selected: boolean, selectedRows: SysUrlGroupCheckedType[]) {
              const treeSelectedKeys = selectedRows.map(({ key }) => key);
              const diffKeys = selected
                ? _difference(treeSelectedKeys, listSelectedKeys)
                : _difference(listSelectedKeys, treeSelectedKeys);

              onItemSelectAll(diffKeys, selected);
            },
            onSelect({ key }: { key: string }, selected: boolean) {
              onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys,
          };

          return (
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              rowKey="key"
              size="small"
              loading={queryRequest.loading}
              onRow={({ key }) => ({
                onClick: () => {
                  onItemSelect(key, !listSelectedKeys.includes(key));
                },
              })}
            />
          );
        }}
      </Transfer>
    </CcsDrawer>
  );
};

export default UrlsGroupDrawer;
