import React from 'react';
import { Form, Input, InputNumber, Radio } from 'antd';

const FormItem = Form.Item;

const ItemsMenu = () => (
  <>
    <FormItem
      label="菜单名称"
      name="menuName"
      rules={[{ required: true, message: '请输入菜单名称' }]}
    >
      <Input placeholder="请输入" />
    </FormItem>
    <FormItem label="菜单描述" name="menuDesc">
      <Input placeholder="请输入" />
    </FormItem>
    <FormItem label="菜单图标" name="icon">
      <Input placeholder="请输入" />
    </FormItem>
    <FormItem
      label="菜单链接"
      name="menuUrl"
      rules={[{ required: true, message: '请输入菜单菜单链接' }]}
    >
      <Input placeholder="请输入" />
    </FormItem>
    <FormItem label="类型" name="menuType" rules={[{ required: true, message: '请选择类型' }]}>
      <Radio.Group>
        <Radio.Button value={1}>菜单</Radio.Button>
        <Radio.Button value={0}>目录</Radio.Button>
      </Radio.Group>
    </FormItem>
    <FormItem label="在用状态" name="state" rules={[{ required: true, message: '请选择在用状态' }]}>
      <Radio.Group>
        <Radio.Button value={1}>在用</Radio.Button>
        <Radio.Button value={0}>禁用</Radio.Button>
      </Radio.Group>
    </FormItem>
    <FormItem label="序号" name="sortId">
      <InputNumber placeholder="请输入" style={{ width: '100%' }} />
    </FormItem>
  </>
);

export default ItemsMenu;
