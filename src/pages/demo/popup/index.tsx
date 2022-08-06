import { Button, Card, Space, Form, Tabs } from 'antd';
import type { FC } from 'react';
import React, { useState } from 'react';
import { CcsDrawer, CcsDrawerTabs, CcsTrigger } from '@ccs-design/rc-pro';
import ModalTable from './modal-table';
import { CcsOrgSelect } from '@/components/business';
import CcsWorkerSelect from '@/components/business/CcsWorkerSelect';
import CcsSticky from '../sticky';

const DemoPopup: FC = () => {
  const [visible, setVisible] = useState<number>(0);
  const [form] = Form.useForm();

  return (
    <div style={{ position: 'relative' }}>
      <Card title="弹出框" bordered={false} hoverable bodyStyle={{ padding: 0 }} />
      <div style={{ margin: 10 }}>
        <Card bordered={false}>
          <Space>
            <Button onClick={() => setVisible(1)}>弹框table</Button>
            <Button onClick={() => setVisible(2)}>数据较多用抽屉</Button>
            <Button onClick={() => setVisible(3)}>自定义宽度</Button>
            <Button onClick={() => setVisible(4)}>抽屉Tabs</Button>
            <Button onClick={() => setVisible(6)}>抽屉Steps</Button>
            <Button onClick={() => setVisible(5)}>全屏抽屉</Button>
          </Space>
          <Form
            form={form}
            layout="inline"
            style={{ marginTop: 16 }}
            onFinish={(e) => console.log(e)}
            initialValues={{
              table1: { loginIds: 9998, workerNames: '田平' },
              table2: { loginIds: [9998, 10002], workerNames: '田平,谢於洪' },
            }}
          >
            <Form.Item name="org" label="树级多选">
              <CcsTrigger placeholder="请选择" showField="orgName">
                <CcsOrgSelect multiple />
              </CcsTrigger>
            </Form.Item>
            <Form.Item name="org1" label="树级单选">
              <CcsTrigger placeholder="请选择" showField="orgName">
                <CcsOrgSelect />
              </CcsTrigger>
            </Form.Item>
            <Form.Item name="table1" label="表格单选">
              <CcsTrigger placeholder="请选择" showField="workerNames" width={400} height={300}>
                <CcsWorkerSelect />
              </CcsTrigger>
            </Form.Item>
            <Form.Item name="table2" label="表格多选">
              <CcsTrigger placeholder="请选择" showField="workerNames" width={400} height={300}>
                <CcsWorkerSelect multiple />
              </CcsTrigger>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {visible === 1 && <ModalTable onCancel={() => setVisible(0)} />}
        <CcsDrawer
          title="抽屉"
          visible={visible === 2}
          onClose={() => setVisible(0)}
          onOk={() => setVisible(0)}
          bodyStyle={{ padding: 0 }}
        >
          {/* 抽屉... */}
          <CcsSticky />
        </CcsDrawer>
        <CcsDrawer
          title="抽屉自定义宽度"
          visible={visible === 3}
          mode={400}
          onClose={() => setVisible(0)}
          onOk={() => setVisible(0)}
        >
          抽屉...
        </CcsDrawer>
        <CcsDrawerTabs title="抽屉tabs" visible={visible === 4} onClose={() => setVisible(0)}>
          <Tabs>
            <Tabs.TabPane tab="基础信息" key="1">
              <CcsSticky />
            </Tabs.TabPane>
            <Tabs.TabPane tab="文本信息" key="2">
              <div>文本信息...</div>
            </Tabs.TabPane>
          </Tabs>
        </CcsDrawerTabs>
        <CcsDrawer
          title="抽屉Steps"
          visible={visible === 6}
          onClose={() => setVisible(0)}
          onOk={() => setVisible(0)}
          defaultKey="4"
          steps={[
            { key: '1', status: 'finish', title: '立项', element: <CcsSticky /> },
            { key: '2', status: 'finish', title: '审核', element: <div>审核...</div> },
            { key: '3', status: 'finish', title: '专家注智', element: <div>专家注智...</div> },
            {
              key: '4',
              status: 'process',
              title: '生成非现场报告',
              element: <div>生成非现场报告...</div>,
            },
            {
              key: '5',
              status: 'wait',
              title: '审核报告',
              disabled: true,
              element: <div>审核报告...</div>,
            },
            {
              key: '6',
              status: 'wait',
              title: '处理回复',
              disabled: true,
              element: <div>处理回复...</div>,
            },
            {
              key: '7',
              status: 'wait',
              title: '集团报表',
              disabled: true,
              element: <div>集团报表...</div>,
            },
            {
              key: '8',
              status: 'wait',
              title: '流程详情',
              disabled: true,
              element: <div>流程详情...</div>,
            },
          ]}
        />
        <CcsDrawer title="抽屉" visible={visible === 5} onClose={() => setVisible(0)} mode="full">
          抽屉...
        </CcsDrawer>
      </div>
    </div>
  );
};

export default DemoPopup;
