// import {
//   AppstoreOutlined,
//   SketchOutlined,
//   SplitCellsOutlined,
//   UserSwitchOutlined,
// } from '@ant-design/icons';
// import { Menu } from 'antd';
import React from 'react';
import TextLoop from 'react-text-loop';

// const { SubMenu } = Menu;

/**
 * 通知信息
 * @returns
 */
const UserNotice = () => {
  return (
    // <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //   <Menu selectedKeys={['user:1']} mode="horizontal" theme="dark" style={{ flexGrow: 1 }}>
    //     <SubMenu key="userr" icon={<UserSwitchOutlined />} title="用户中心">
    //       <Menu.ItemGroup title="Item 1">
    //         <Menu.Item key="user:1">Option 1</Menu.Item>
    //         <Menu.Item key="user:2">Option 2</Menu.Item>
    //       </Menu.ItemGroup>
    //       <Menu.ItemGroup title="Item 2">
    //         <Menu.Item key="user:3">Option 3</Menu.Item>
    //         <Menu.Item key="user:4">Option 4</Menu.Item>
    //       </Menu.ItemGroup>
    //     </SubMenu>

    //     <Menu.Item key="app" icon={<SketchOutlined />}>
    //       设计中心
    //     </Menu.Item>
    //     <SubMenu key="SubMenu" icon={<SplitCellsOutlined />} title="调度中心">
    //       <Menu.ItemGroup title="Item 1">
    //         <Menu.Item key="setting:1">Option 1</Menu.Item>
    //         <Menu.Item key="setting:2">Option 2</Menu.Item>
    //       </Menu.ItemGroup>
    //       <Menu.ItemGroup title="Item 2">
    //         <Menu.Item key="setting:3">Option 3</Menu.Item>
    //         <Menu.Item key="setting:4">Option 4</Menu.Item>
    //       </Menu.ItemGroup>
    //     </SubMenu>
    //     <Menu.Item key="app" icon={<AppstoreOutlined />}>
    //       编排中心
    //     </Menu.Item>
    //   </Menu>
    //   <div style={{ color: '#9e9e9e', padding: '0 16px', textAlign: 'right' }}>
    //     <TextLoop>
    //       <span>那是一种内在的东西，他们到达不了，也无法触及的...</span>
    //       <span>希望是一个好东西，也许是最好的，好东西是不会消亡的...</span>
    //       <span>城镇中有那么多的酒馆，她却偏偏走进了我的酒馆...</span>
    //       <span>那时候我只会想自己想要什么，从不想自己拥有什么...</span>
    //       <span>凛冬将至...</span>
    //       <span>生命就像一盒巧克力，结果往往出人意料...</span>
    //     </TextLoop>
    //   </div>
    // </div>
    <div style={{ color: '#9e9e9e', padding: '0 16px', textAlign: 'right' }}>
      <TextLoop>
        <span>那是一种内在的东西，他们到达不了，也无法触及的...</span>
        <span>希望是一个好东西，也许是最好的，好东西是不会消亡的...</span>
        <span>城镇中有那么多的酒馆，她却偏偏走进了我的酒馆...</span>
        <span>那时候我只会想自己想要什么，从不想自己拥有什么...</span>
        <span>凛冬将至...</span>
        <span>生命就像一盒巧克力，结果往往出人意料...</span>
      </TextLoop>
    </div>
  );
};

export default UserNotice;
