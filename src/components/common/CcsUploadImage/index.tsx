import type { FC } from 'react';
import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile, HttpRequestHeader } from 'antd/lib/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import GlobalConfig from '@/global';
import styles from './index.less';

const imageType = ['image/jpeg', 'image/png', 'image/jpg'];

interface UploadImage {
  value?: string;
  onChange?: Function;
  style?: object;
  isShowButton?: boolean;
  buttonText?: string;
  className?: string;
  argsProps?: any;
}

/**
 * 图片上传组件
 * @param uploadImage
 * @returns
 */
const CcsUploadImage: FC<UploadImage> = (props) => {
  const [loading, setLoading] = useState(false);
  const {
    value,
    onChange,
    style,
    className,
    isShowButton = false,
    buttonText = '本地上传',
    ...argsProps
  } = props;
  // 上传前检查
  const beforeUpload = (file: File) => {
    const isJPG = imageType.some((e) => e === file.type);
    if (!isJPG) {
      message.error('只能上传图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 3;
    if (!isLt2M) {
      message.error('图片不能大于3MB!');
    }
    return isJPG && isLt2M;
  };

  // 图片改变事件
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const { response } = info.file;
      if (response.success) {
        onChange?.(response.data);
        message.success('图片上传成功');
      } else {
        message.error(response.msg);
      }
    } else if (info.file.status === 'error') {
      setLoading(false);
      message.error(info.file.error.message);
    }
  };
  // 上传按钮
  const uploadButton = (
    <>
      {!isShowButton ? (
        <span style={{ fontSize: 28 }}>{loading ? <LoadingOutlined /> : <PlusOutlined />}</span>
      ) : (
        <Button type="primary" icon={loading ? <LoadingOutlined /> : ''}>
          {buttonText}
        </Button>
      )}
    </>
  );

  return (
    <Upload
      name="fileName"
      listType="picture-card"
      className={`${styles.avatarUploader} ${className}`}
      style={style}
      showUploadList={false}
      action={`${GlobalConfig.Api}/service-sysmgr/FileController/auth/uploadImage`}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      headers={{ ticket: sessionStorage.getItem('_USER_TOKEN') } as HttpRequestHeader}
      {...argsProps}
    >
      {value && !loading ? (
        <img
          src={`${GlobalConfig.DownloadUrl}?fileId=${value}`}
          alt="avatar"
          style={{ objectFit: 'contain' }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default CcsUploadImage;
