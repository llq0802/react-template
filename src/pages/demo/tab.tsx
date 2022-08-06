import React from 'react';
import { Button, Space } from 'antd';
import { CcsMemoTabs, TabPropType } from '@ccs-design/rc-pro';

const TabContent1 = ({ onChangeKey, onDisabled, onEnable }: TabPropType) => (
  <div style={{ padding: 24 }}>
    <div>TabContent1...</div>
    <Space>
      <Button
        onClick={() => {
          if (onEnable) onEnable(['2', '3']);
        }}
      >
        取消disabled2、3
      </Button>
      <Button
        onClick={() => {
          if (onChangeKey) onChangeKey('4', { content: 'tab1 to tab4 props' });
        }}
      >
        选中tab4，并传值
      </Button>
      <Button
        onClick={() => {
          if (onDisabled) onDisabled(['2', '3', '4']);
        }}
      >
        disabled tab2、3、4
      </Button>
    </Space>
  </div>
);
const TabContent2 = () => <div>TabContent2...</div>;
const TabContent3 = () => <div>TabContent3...</div>;
const TabContent4 = ({ content }: any) => (
  <div style={{ padding: 24 }}>
    TabContent4...<div>{content}</div>
  </div>
);

export default () => (
  <CcsMemoTabs
    defaultActiveKey="1"
    tabs={[
      { key: '1', title: 'tab1', element: <TabContent1 /> },
      { key: '2', title: 'tab2', element: <TabContent2 />, disabled: true },
      { key: '3', title: 'tab3', element: <TabContent3 />, disabled: true },
      { key: '4', title: 'tab4', element: <TabContent4 />, disabled: true },
    ]}
  />
);
