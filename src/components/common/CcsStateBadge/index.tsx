import type { FC } from 'react';
import React from 'react';
import { Badge } from 'antd';

const statusMap: ('success' | 'processing' | 'default' | 'error' | 'warning')[] = [
  'default',
  'success',
];
const status = ['无效', '有效'];

/**
 * 状态显示显示组件
 * state
 */
export interface BadgeProps {
  state: number; // 状态值
}

const CcsStateBadge: FC<BadgeProps> = (props) => {
  const { state } = props;
  return <Badge status={statusMap[state]} text={status[state]} />;
};

export default CcsStateBadge;
