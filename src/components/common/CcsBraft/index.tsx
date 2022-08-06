import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import { message, Upload } from 'antd';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import NProgress from 'nprogress';
import 'braft-editor/dist/index.css';
import { Base64 } from 'js-base64';
import type { UploadChangeParam } from 'antd/lib/upload';
import GlobalConfig from '@/global';
import { USER_TOKEN } from '@/constants';

declare const window: any;

interface PropsType {
  controls?: any;
  value?: string;
  className?: string;
  readOnly?: boolean;
  placeholder?: string;
  contentStyle?: CSSProperties;
  onChange?: (e: string) => void;
}

/**
 * 富文本组件
 */
export default ({
  value,
  onChange,
  className,
  contentStyle,
  placeholder,
  readOnly,
  controls,
}: PropsType) => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(value ? Base64.decode(value) : ''),
  );

  // 图片上传,上传成功根据接口返回url插入代码
  const uploadHandler = (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
      NProgress.start(); // 顶部加载动作条
    }
    if (info.file.status === 'done') {
      const { response } = info.file;
      if (response.success) {
        setEditorState(
          ContentUtils.insertMedias(editorState, [
            {
              type: 'IMAGE',
              url: `${GlobalConfig.DownloadUrl}?fileId=${response.data}`, // 接口返回url
            },
          ]),
        );
        message.success('图片上传成功');
      } else {
        message.error(response.msg);
      }
      NProgress.done();
    } else if (info.file.status === 'error') {
      NProgress.done();
      message.error(info.file.error.message);
    }
    return true;
  };

  // 保存代码
  // submitContent = async () => {
  //   // 在编辑器获得焦点时按下ctrl+s会执行此方法
  //   // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
  //   // const { editorState } = this.state
  //   // const htmlContent = editorState.toHTML()
  //   // console.log('htmlContent', htmlContent)
  //   // const result = await saveEditorContent(htmlContent)
  // }

  const buildPreviewHtml = () => `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${editorState.toHTML()}</div>
        </body>
      </html>
    `;

  const preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }
    window.previewWindow = window.open();
    window.previewWindow.document.write(buildPreviewHtml());
    window.previewWindow.document.close();
  };

  const handleEditorChange = (e: any) => {
    setEditorState(e);
    // base64编码返回
    if (onChange) onChange(Base64.encode(e.toHTML()));
  };

  const uploadProps = {
    accept: 'image/*',
    name: 'fileName',
    action: GlobalConfig.UploadUrl,
    headers: { token: sessionStorage.getItem(USER_TOKEN) || '' },
    showUploadList: false,
    onChange: uploadHandler,
  };

  const extendControls: any = [
    {
      key: 'custom-button',
      type: 'button',
      text: '预览',
      onClick: preview,
    },
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload {...uploadProps}>
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <button
            type="button"
            className="control-item button upload-button"
            data-
            title="插入图片"
          >
            插入图片
          </button>
        </Upload>
      ),
    },
  ];

  return (
    <BraftEditor
      value={editorState}
      onChange={handleEditorChange}
      controls={controls}
      className={className}
      contentStyle={contentStyle}
      placeholder={placeholder}
      readOnly={readOnly}
      // onSave={this.submitContent}
      extendControls={extendControls}
    />
  );
};
