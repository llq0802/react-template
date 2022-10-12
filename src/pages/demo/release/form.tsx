import type { FC, RefObject } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Form, Input, DatePicker, Row, Col } from 'antd';
import useRequest from '@ahooksjs/use-request';
import type { HttpResult, ProTableInstance, EventInstance } from '@ccs-design/rc-pro';
import { CcsDrawerForm } from '@ccs-design/rc-pro';
import { CcsBraft, CcsStateSelect, CcsUploadImage } from '@/components/common';
import { CcsStaticSelect } from '@/components/business';
import { createPub, getPubContent } from './service';
import { momentDate } from '@/utils';
import type { BussReleaseTypePartial } from './type';
import styles from './index.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const formContentLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

interface PropsType {
  proRef: RefObject<ProTableInstance>;
  $event: EventInstance<BussReleaseTypePartial>;
}

const BusinessReleaseForm: FC<PropsType> = ({ proRef, $event }) => {
  const ref = useRef<FormInstance>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const queryRequest = useRequest<HttpResult<string>>(getPubContent, { manual: true });
  const saveRequest = useRequest<HttpResult>(createPub, { manual: true });

  const record = $event.useSubscription((e) => {
    const enableTime = momentDate(e?.enableTime);
    const disableTime = momentDate(e?.disableTime);
    e.time = [enableTime, disableTime];
    setVisible(true);
  });

  useEffect(() => {
    async function queryContent(pubId: number) {
      const result = await queryRequest.run({ pubId });
      if (result.success) {
        record.pubContent = result.data;
        // 富文本组件特殊只能使用resetFields
        ref.current?.resetFields(['pubContent']);
      }
    }

    // 获取发布内容
    if (visible && record?.pubId) {
      queryContent(record?.pubId);
    }
  }, [visible]);

  // 提交内容
  const onFinish = async (params: any) => {
    const result = await saveRequest.run({
      ...params,
      enableTime: params.time && params.time[0] ? params.time[0].format('YYYY-MM-DD HH:mm:ss') : '',
      disableTime:
        params.time && params.time[1] ? params.time[1].format('YYYY-MM-DD HH:mm:ss') : '',
    });

    if (result.success) {
      proRef.current?.onReload();
      setVisible(false);
    }
  };

  return (
    <>
      <CcsDrawerForm
        auth="demo:release:update"
        ref={ref}
        values={record}
        visible={visible}
        loading={saveRequest.loading}
        title={`发布 - ${record.pubId ? '修改' : '新增'}`}
        onClose={() => setVisible(false)}
        onSubmit={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Row style={{ marginTop: 16 }}>
          <Col span={12}>
            <FormItem
              label="标题"
              name="pubName"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input placeholder="请输入" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="说明"
              name="pubDesc"
              rules={[{ required: true, message: '请输入说明' }]}
            >
              <Input placeholder="请输入" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="类型"
              name="pubType"
              rules={[{ required: true, message: '请选择类型' }]}
            >
              <CcsStaticSelect propCode="ReleaseType" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="序号"
              name="sortId"
              rules={[{ required: true, message: '请输入序号' }]}
            >
              <Input placeholder="请输入" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="期限" name="time" rules={[{ required: true, message: '请选择期限' }]}>
              <RangePicker style={{ width: '100%' }} showTime />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="状态"
              name="state"
              rules={[{ required: true, message: '请选择在用状态' }]}
            >
              <CcsStateSelect />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="图标" name="pubIcon">
              <CcsUploadImage />
            </FormItem>
          </Col>
        </Row>
        <FormItem {...formContentLayout} label="文本信息" name="pubContent">
          <CcsBraft
            className={styles.editor}
            contentStyle={{ height: 'auto', minHeight: 600 }}
            placeholder="请输入正文内容"
          />
        </FormItem>
      </CcsDrawerForm>
    </>
  );
};

export default BusinessReleaseForm;
