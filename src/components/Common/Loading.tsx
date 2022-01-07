import { Space, Spin } from 'antd';
import React from 'react';

export const Loading = () => {
  return (
    <div style={{paddingTop:'100px'}} className='text-center'>
      <Space size="middle">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </Space>
      <br></br>
      <strong>Đang tải ...</strong>
    </div>
  );
};
