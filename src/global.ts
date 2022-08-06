import type { ConfigType } from '@ccs-design/rc-pro';
import type { Dispatch, AnyAction } from 'redux';
import type { ColProps } from 'antd';

const FormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 14 },
};

// 全局接口
export interface ConnectLoading {
  effects: Record<string, boolean>;
  models: Record<string, boolean>;
  global: boolean;
}

// dispatch
export declare type DispatchType = {
  dispatch: Dispatch<AnyAction>;
};

export interface GlobalConfigType extends ConfigType {
  /** 图片上传地址 */
  UploadUrl: string;
  /** 图片下载地址 */
  DownloadUrl: string;
  /** form布局 */
  FormItemLayout: {
    labelCol?: ColProps;
    wrapperCol?: ColProps;
  };
}

// 全局配置
const GlobalConfig: GlobalConfigType = {
  AppName: '管理系统',
  BrandPrimary: '#1890ff',
  MenuExpandWidth: 208,
  MenuCollapsedWidth: 48,
  IsTabsPage: true,
  IsAuthButton: true,
  IsDark: false, // 开启mfsu 清除浏览器数据缓存方可生效
  IsCompact: false,
  // LayoutChange: false,
  LayoutMode: 'top',
  MenuExpandMode: 'default',
  Api: '/api',
  Context: '/',
  UploadUrl: `/api/service-sysmgr/FileController/auth/uploadImage`,
  DownloadUrl: '/api/service-sysmgr/FileController/downloadFile',
  FormItemLayout,
};

export default GlobalConfig;
