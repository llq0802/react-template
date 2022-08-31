export declare type DomInfoType = Record<string, any> | null;

export function useClientRect<T = Element>(el: T): DomInfoType {
  // @ts-ignore
  return el.getBoundingClientRect() ?? null;
}

export function useDomStyle(el: HTMLElement): DomInfoType {
  return window?.getComputedStyle(el) ?? null;
}
