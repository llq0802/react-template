

export interface SysPropValueType {
  valueId: number;
  valueCode: string;
  valueName: string;
  valueDesc: string;
  propId: number;
  state: number;
  sortId: number;
  valueControl: string;
  propCode: string;
}

export interface SysPropType {
  propId: number;
  propCode: string;
  propName: string;
  state: number;
  propDesc: string;
  propControl: string;
}
export type SysPropTypePartial = Partial<SysPropType>;

export type SysPropValueTypePartial = Partial<SysPropValueType>;
