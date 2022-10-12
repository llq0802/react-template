import type { FC } from 'react';
import React from 'react';
import { Badge } from 'antd';
import { STATUS_MAP } from '@/constants';

const statusMap: ('success' | 'processing' | 'default' | 'error' | 'warning')[] = [
  'error',
  'success',
];

/**
 * 状态显示显示组件
 * state
 */
export interface BadgeProps {
  state: 0 | 1 | '0' | '1'; // 状态值
}

const CcsStateBadge: FC<BadgeProps> = (props) => {
  const { state } = props;
  return <Badge status={statusMap[state]} text={STATUS_MAP[state]} />;
};

export default CcsStateBadge;
