import React from 'react';
import { Form, Input, Radio } from 'antd';
import { CcsTrigger } from '@ccs-design/rc-pro';
import MenuUrlSelect from './UrlSelect';

const FormItem = Form.Item;

const ItemsButton = () => (
  <>
    <FormItem
      label="按钮名称"
      name="menuName"
      rules={[{ required: true, message: '请输入按钮名称' }]}
    >
      <Input placeholder="请输入" />
    </FormItem>
    <FormItem
      label="按钮功能名称"
      name="menuDesc"
      rules={[{ required: true, message: '请输入按钮功能名称' }]}
    >
      <Input placeholder="请输入" />
    </FormItem>
    <FormItem label="按钮图标" name="icon">
      <Input placeholder="请输入" />
    </FormItem>
    <FormItem
      label="按钮编码"
      name="menuUrl"
      // rules={[{ required: true, message: '请输入按钮编码' }]}
    >
      <Input placeholder="请输入" />
    </FormItem>
    <FormItem
      label="URL权限地址"
      name="buttonUrlId"
      rules={[{ required: true, message: '请选择URL权限地址' }]}
    >
      <CcsTrigger width={500} height={500} placeholder="请选择">
        <MenuUrlSelect />
      </CcsTrigger>
    </FormItem>
    <FormItem label="在用状态" name="state" rules={[{ required: true, message: '请选择在用状态' }]}>
      <Radio.Group>
        <Radio.Button value={1}>在用</Radio.Button>
        <Radio.Button value={0}>禁用</Radio.Button>
      </Radio.Group>
    </FormItem>
    <FormItem label="序号" name="sortId">
      <Input placeholder="请输入" />
    </FormItem>
  </>
);

export default ItemsButton;
