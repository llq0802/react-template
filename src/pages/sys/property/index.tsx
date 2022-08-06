import { CcsMemoTabs } from '@ccs-design/rc-pro';
import type { TabDataType } from '@ccs-design/rc-pro/es/CcsMemoTabs';
import React from 'react';
import SysPropertyType from './Types';
import SysPropertyValue from './Value';

const tabs: TabDataType[] = [
  { key: '1', title: '静态属性', element: <SysPropertyType /> },
  {
    key: '2',
    title: '属性值',
    element: <SysPropertyValue />,
    disabled: true,
  },
];

export default () => <CcsMemoTabs defaultActiveKey="1" tabs={tabs} />;
