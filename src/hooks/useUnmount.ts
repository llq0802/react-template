import { useEffect } from 'react';
import useLatest from './useLatest';

/**
 * 在组件卸载（unmount）时执行的 Hook。
 * @param fn
 */
const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn);
  useEffect(
    () => () => {
      fnRef?.();
    },
    [],
  );
};

export default useUnmount;
