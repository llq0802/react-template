import type { FC } from 'react';
import React, { useState } from 'react';
import { history } from 'umi';
import { Form, Input, Modal } from 'antd';
import { useRequest } from 'ahooks';
import type { HttpResult, EventInstance } from '@ccs-design/rc-pro';
import { showNotification } from '@/utils';
import { modifyPwd } from '@/pages/sys/user/service';
import { USER_TOKEN } from '@/constants';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 9 },
  },
};

interface PropsType {
  $event: EventInstance;
}

/**
 * 密码修改
 * @param PropsType
 * @returns
 */
const UserPassword: FC<PropsType> = ({ $event }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { loading, run } = useRequest<HttpResult>(modifyPwd, { manual: true });

  const onVisible = () => {
    setVisible(!visible);
  };

  $event.useSubscription(() => onVisible());

  const onFinish = (values: any) => {
    run(values).then((d) => {
      if (d.success) {
        showNotification('success', '提示信息', '操作成功,请重新登录。');
        history.push('/auth/login');
        sessionStorage.removeItem(USER_TOKEN);
      }
    });
  };

  return visible ? (
    <Modal
      title="密码修改"
      visible={visible}
      onOk={() => form.submit()}
      onCancel={onVisible}
      confirmLoading={loading}
    >
      <Form onFinish={onFinish} form={form} {...formItemLayout}>
        <Form.Item
          label="原密码"
          name="oldPwd"
          rules={[
            {
              required: true,
              message: '请输入原密码!',
            },
          ]}
        >
          <Input.Password type="password" placeholder="输入原密码" />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPwd"
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入至少6位新密码!',
              min: 6,
            },
          ]}
        >
          <Input.Password type="password" placeholder="输入新密码" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirm"
          dependencies={['newPwd']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入确认密码!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPwd') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码输入不一致'));
              },
            }),
          ]}
        >
          <Input.Password type="password" placeholder="输入确认密码" />
        </Form.Item>
      </Form>
    </Modal>
  ) : null;
};

export default UserPassword;
