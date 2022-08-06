import { Form, Input, Button, Alert, Row, Col, Tabs } from 'antd';
import { connect } from 'umi';
import type { FC } from 'react';
import React, { useRef } from 'react';
import type { IntervalInstance, HttpResult } from '@ccs-design/rc-pro';
import { CcsIntervalButton } from '@ccs-design/rc-pro';
import useRequest from '@ahooksjs/use-request';
import { LockOutlined, MobileOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/lib/form';
import type { ConnectLoading, DispatchType } from '@/global';
import GlobalConfig from '@/global';
import type { AuthModelState } from '@/models/authModel';
import styles from './index.less';
import logo from '../../assets/icons/logo.svg';
import loginBg from '../../assets/imgs/login_bg.svg';
import { getCaptchaImg } from './service';

const FormItem = Form.Item;

interface LoginProps extends DispatchType {
  error: any;
  submitting: boolean;
}

export interface FormDataType {
  username: string;
  password: string;
  captcha: string;
}

interface CaptchaImgType {
  captchaBase64: string;
  captchaKey: string;
}

const LoginPage: FC<LoginProps> = ({ submitting, error, dispatch }) => {
  const sendRef = useRef<IntervalInstance>(null);
  const onSendCode = () => sendRef.current?.start();
  const { run, data } = useRequest<HttpResult<CaptchaImgType>>(getCaptchaImg);
  const ref = useRef<FormInstance>(null);

  // 提交
  const handleSubmit = async (values: FormDataType) => {
    const res: any = await dispatch({
      type: 'authModel/login',
      payload: { ...values, captchaKey: data?.data?.captchaKey },
    });
    if (res && !res.success) {
      ref.current?.resetFields();
    }
    run();
  };

  // 错误信息提示
  const renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${loginBg})` }}>
      <div className={styles.content}>
        <div key={0} className={styles.loginTitle}>
          <img src={logo} alt="logo" className={styles.logo} /> {GlobalConfig.AppName}
        </div>
        <div className={styles.loginMain}>
          <Form
            onFinish={handleSubmit}
            className="login-form"
            initialValues={{ username: 'guest', password: '@Crunii,.123' }}
            ref={ref}
          >
            <Tabs defaultActiveKey="1" tabBarStyle={{ marginBottom: 30 }} destroyInactiveTabPane>
              <Tabs.TabPane tab="账户密码登录" key="1">
                <FormItem name="username" rules={[{ required: true, message: '请输入登陆账号!' }]}>
                  <Input
                    prefix={<UserOutlined style={{ color: GlobalConfig.BrandPrimary }} />}
                    placeholder="guest"
                    size="large"
                  />
                </FormItem>
                <FormItem name="password" rules={[{ required: true, message: '请输入登陆密码!' }]}>
                  <Input
                    prefix={<LockOutlined style={{ color: GlobalConfig.BrandPrimary }} />}
                    placeholder="@Crunii,.123"
                    size="large"
                    type="password"
                  />
                </FormItem>
                <FormItem name="captcha" rules={[{ required: true, message: '请输入验证码!' }]}>
                  <Row gutter={8}>
                    <Col span={16}>
                      <Input
                        prefix={<SafetyOutlined style={{ color: GlobalConfig.BrandPrimary }} />}
                        placeholder="请输入验证码"
                        size="large"
                      />
                    </Col>
                    <Col span={8}>
                      {data?.data?.captchaBase64 ? (
                        <img
                          onClick={run}
                          src={data.data.captchaBase64}
                          alt="验证码"
                          style={{ width: '100%', height: 40 }}
                        />
                      ) : null}
                    </Col>
                  </Row>
                </FormItem>
                <FormItem style={{ marginTop: 32 }}>
                  <Button block type="primary" htmlType="submit" loading={submitting} size="large">
                    登 录
                  </Button>
                </FormItem>
              </Tabs.TabPane>
              <Tabs.TabPane tab="手机号码登录" key="2">
                <FormItem name="username" rules={[{ required: true, message: '请输入手机号码!' }]}>
                  <Input
                    prefix={<MobileOutlined style={{ color: GlobalConfig.BrandPrimary }} />}
                    placeholder="请输入手机号码"
                    size="large"
                  />
                </FormItem>
                <FormItem name="msgCode" rules={[{ required: true, message: '请输入验证码!' }]}>
                  <Row gutter={8}>
                    <Col span={16}>
                      <Input
                        prefix={<SafetyOutlined style={{ color: GlobalConfig.BrandPrimary }} />}
                        placeholder="请输入验证码"
                        size="large"
                      />
                    </Col>
                    <Col span={8}>
                      <CcsIntervalButton
                        cacheKey="_LoginMsgCode"
                        num={60}
                        disabledText="num秒后重发"
                        onClick={onSendCode}
                        ref={sendRef}
                        size="large"
                      >
                        发送验证码
                      </CcsIntervalButton>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem style={{ marginTop: 32 }}>
                  <Button block type="primary" htmlType="submit" loading={submitting} size="large">
                    登 录
                  </Button>
                </FormItem>
              </Tabs.TabPane>
            </Tabs>
          </Form>
          {!submitting && error && renderMessage(error)}
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ authModel, loading }: { authModel: AuthModelState; loading: ConnectLoading }) => ({
    error: authModel.error,
    submitting: loading.effects['login/login'],
  }),
)(LoginPage);
