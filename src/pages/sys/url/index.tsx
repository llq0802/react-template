import type { FC } from 'react';
import React from 'react';
import { CcsMemoTabs } from '@ccs-design/rc-pro';
import UrlGroup from './UrlGroup';
import UrlCreate from './UrlCreate';

const tabs = [
  { key: '1', title: 'URL组', element: <UrlGroup /> },
  {
    key: '2',
    title: 'URL录入',
    element: <UrlCreate />,
  },
];

const Index: FC = () => <CcsMemoTabs defaultActiveKey="1" tabs={tabs} />;
export default Index;
