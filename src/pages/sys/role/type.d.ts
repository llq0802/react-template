import { MenuType } from '@ccs-design/rc-pro';

export interface SysRoleMenuType {
  checkedIds: string[];
  halfCheckedIds: string[];
  nodes: MenuType[];
}

export interface SysRoleType {
  roleId: number;
  roleName: string;
  roleDesc: string;
  state: number;
}

export type SysRoleTypePartial = Partial<SysRoleType>;

export interface SysRoleUrlType {
  checked: boolean;
  createTime: Date;
  groupDesc: string;
  groupId: number;
  groupName: string;
  state: number;
}
