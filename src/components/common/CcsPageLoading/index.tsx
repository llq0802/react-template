import type { CSSProperties } from 'react';
import React from 'react';
import { Spin } from 'antd';

const loadingStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
  color: '#a5d4f5',
};
export default () => (
  <div style={loadingStyle}>
    <Spin size="large" />
  </div>
);
