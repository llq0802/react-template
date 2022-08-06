import { Moment } from 'moment';

export interface SysUserRole {
  checked: boolean;
  roleId: number;
  roleName: string;
}

export interface SysUserType {
  workerName: string;
  loginId: number;
  loginCode: string;
  orgId: number;
  orgName: string;
  state: number;
  mobile: string;
  phone: string;
  email: string;
  sex: number;
  birthday: string | Moment;
  createTime: Date;
  orgValue?: { orgId?: number; orgName?: string };
}

export type SysUserTypePartial = Partial<SysUserType>;
