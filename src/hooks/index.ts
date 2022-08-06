import { useEffect, useRef } from 'react';

/**
 * 自定义hook 用于获取上一次的值
 * @param value
 * @returns
 */
export function usePrevious<T>(value: T): T {
  const ref = useRef<unknown>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as T;
}
