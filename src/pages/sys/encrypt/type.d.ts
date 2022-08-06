export interface SysEncryptType {
  id: number;
  state: number;
  colName: string;
  tabName: string;
  createTime: string;
}

export type SysEncryptTypePartial = Partial<SysEncryptType>;
