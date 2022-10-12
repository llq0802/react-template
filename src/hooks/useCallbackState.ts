import { useState, useRef, useEffect } from 'react';

/**
 * useState的回调获取最新的state
 * @export
 * @template T
 * @param {T} state
 * @return {*}  { [T, Function]}
 */
export default function useCallbackState<T>(state: T): [T, Function] {
  const callBackRef = useRef<Function | null>(null);
  const [data, setData] = useState(() => {
    const value = typeof state === 'function' ? state() : state;
    return value;
  });

  useEffect(() => {
    callBackRef?.current?.(data);
  }, [data]);

  return [
    data,
    (newState: T, cb: Function) => {
      callBackRef.current = cb;
      if (typeof newState === 'function') {
        setData((prevState: T) => {
          const ret = newState?.(prevState);
          return ret;
        });
      } else {
        setData(newState);
      }
    },
  ];
}
