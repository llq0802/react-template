import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * 用于获取上一次的值
 * @param value
 * @returns
 */
export function usePrevious<T>(value: T): T {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as T;
}

/**
 * 可以获取更新完的最新state
 * @export
 * @template T
 * @param {T} initialState
 * @return {*}  {([T, Function, T | null])}
 */
export function useRefState<T>(initialState: T): [T, Function, T | null] {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState(() => {
    const value = typeof initialState === 'function' ? initialState() : initialState;
    ref.current = value;
    return value;
  });
  const setValue = useCallback((newState: T) => {
    if (typeof newState === 'function') {
      setState((prevState: T) => {
        const ret = newState?.(prevState);
        ref.current = ret;
        return ret;
      });
    } else {
      ref.current = newState;
      setState(newState);
    }
  }, []);
  return [state, setValue, ref?.current];
}

/**
 * useState的回调获取最新的state
 * @export
 * @template T
 * @param {T} initialState
 * @return {*}  { [T, Function]}
 */
export function useCallbackState<T>(initialState: T): [T, Function] {
  const callBackRef = useRef<Function | null>(null);
  const [data, setData] = useState<T>(() => {
    const value = typeof initialState === 'function' ? initialState() : initialState;
    return value;
  });
  useEffect(() => {
    callBackRef?.current?.(data);
  }, [data]);
  return [
    data,
    function setState(newState: T, cb?: Function) {
      if (cb && typeof cb === 'function') callBackRef.current = cb;
      setData(newState);
    },
  ];
}
