import {
  ControlOutlined,
  NotificationOutlined,
  OrderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useAppSelector } from 'app/hooks';
import React from 'react';
interface Props {
  onSelectedLayoutIndexChange: any;
}
const { Sider } = Layout;
const { SubMenu } = Menu;

const listIconOfSubMenu = [
  <OrderedListOutlined />,
  <i className="fas fa-wine-glass-alt"></i>,
  <UserOutlined />,
  <UserOutlined />,
  <NotificationOutlined />,
  <ControlOutlined />,
];

const LeftSlider = (props: Props) => {
  const { onSelectedLayoutIndexChange } = props;
  let role: any = useAppSelector((state) => state.auth.currentUSer?.role);
  if (typeof role === 'undefined') {
    if (sessionStorage.getItem('role')) role = sessionStorage.getItem('role');
  }
  let subMenu = [
    {
      key: 'orders',
      title: 'Hoá đơn',
      items: [
        { key: 0, content: 'Tạo hoá đơn mới' },
        { key: 1, content: 'Danh sách hoá đơn' },
        // { key: 2, content: 'Danh sách hoá đơn' },
      ],
    },
    // { key: 'products', title: 'Sản phẩm', items: [{ key: 3, content: 'Danh sách sản phẩm' }] },
    // { key: 'customers', title: 'Khách hàng', items: [{ key: 4, content: 'Danh sách khách hàng' }] },
    // { key: 'employees', title: 'Nhân viên', items: [{ key: 5, content: 'Danh sách nhân viên' }] },
  ];
  if (role === 'manager' || role === 'admin')
    subMenu = [
      {
        key: 'orders',
        title: 'Hoá đơn',
        items: [
          { key: 0, content: 'Tạo hoá đơn mới' },
          { key: 1, content: 'Danh sách hoá đơn' },
          { key: 2, content: 'Thống kê hoá đơn' },
        ],
      },
      { key: 'products', title: 'Sản phẩm', items: [{ key: 3, content: 'Danh sách sản phẩm' }] },
      {
        key: 'customers',
        title: 'Khách hàng',
        items: [{ key: 4, content: 'Danh sách khách hàng' }],
      },
      { key: 'employees', title: 'Nhân viên', items: [{ key: 5, content: 'Danh sách nhân viên' }] },
    ];
  return (
    <Sider width={250} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['orders']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {subMenu.map((sub, index) => {
          return (
            <SubMenu key={sub.key} icon={listIconOfSubMenu[index]} title={sub.title}>
              {sub.items.map((item, id) => {
                return (
                  <Menu.Item key={item.key} onClick={() => onSelectedLayoutIndexChange(item.key)}>
                    {item.content}
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default LeftSlider;
