import type { FC } from 'react';
import React, { useRef } from 'react';
import { Input, Modal } from 'antd';
import type { ProTableInstance } from '@ccs-design/rc-pro';
import { CcsProTable } from '@ccs-design/rc-pro';
import { CcsStateBadge } from '@/components/common';
import { queryPageUrl } from '@/pages/sys/url/service';

interface PropsType {
  onCancel: () => void;
}

const ModalTable: FC<PropsType> = ({ onCancel }) => {
  const ref = useRef<ProTableInstance>(null);

  const columns = [
    { title: 'URL名', dataIndex: 'urlName' },
    { title: 'URL地址', dataIndex: 'urlPath', ellipsis: true },
    {
      title: 'URL类型',
      width: 100,
      dataIndex: 'urlType',
      render(val: number) {
        return val === 1 ? '普通url' : 'AntPath';
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      render(val: number) {
        return <CcsStateBadge state={val} />;
      },
    },
  ];

  // 查询条件
  const formItems = [
    { label: 'URL名称', name: 'urlName', value: <Input placeholder="请输入" /> },
    { label: 'URL地址', name: 'urlPath', value: <Input placeholder="请输入" /> },
  ];

  return (
    <>
      <Modal
        title="角色选择"
        visible
        width={800}
        onOk={() => onCancel()}
        onCancel={() => onCancel()}
        bodyStyle={{ padding: 0 }}
      >
        <CcsProTable
          proRef={ref}
          formInitValues={{ roleId: 10001 }}
          formItems={formItems}
          fillSpace={false}
          table={{
            request: queryPageUrl,
            rowKey: 'urlId',
            columns,
            rowSelection: {},
          }}
        />
      </Modal>
    </>
  );
};

export default ModalTable;
