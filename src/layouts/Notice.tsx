import React from 'react';
import TextLoop from 'react-text-loop';

/**
 * 通知信息
 * @returns
 */
const UserNotice = () => {
  return (
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
