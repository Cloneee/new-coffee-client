import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Modal } from 'antd';
import EmployeeAPi from 'api/employee-api';
import { useAppDispatch } from 'app/hooks';
import { Toast } from 'components/Common';
import { authActions } from 'features/auth/authSlice';
import React, { useState } from 'react';
interface Props {}

export const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const [isShowChangePasswordModal, setisShowChangePasswordModal] = useState<boolean>(false)
  const onFormChangePasswordSubmit = async (values: any) => {
    let newPass: string = values.password
  try {
    await EmployeeAPi.changePassword(newPass)
    
    Toast(
      'success',
      'Cập nhật mật khẩu thành công!',
      'Cập nhật mật khẩu thành công.'
    );
  } catch (error: any) {
    console.log(error.response)
    // Toast('danger', 'Cập nhật mật khẩu thất bại!', error.response.data.error);
  }
  setisShowChangePasswordModal(false)

    
  };
  const footerOfChangePassModal = [
    <Button key="back" onClick={() => setisShowChangePasswordModal(false)}>
      Thoát
    </Button>,

    <Button
      form="changePassForm"
      icon={<i className="fas fa-save"></i>}
      type="primary"
      key="submit"
      htmlType="submit"
    >
      &nbsp;Lưu
    </Button>,
  ];
  return (
    <div>
      {isShowChangePasswordModal && (
        <Modal
          visible={isShowChangePasswordModal}
          closable={false}
          title="Đổi mật khẩu"
          footer={footerOfChangePassModal}
          style={{ top: 20 }}
        >
          <Form
            name="basic"
            id="changePassForm"
            onFinish={onFormChangePasswordSubmit}
            autoComplete="off"
          >
            
            <Form.Item
              label="Mật khẩu mới:"
              name="password"
              rules={[
                { required: true, message: 'Mật khẩu không được để trống!' },
                
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      )}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ paddingRight: '50px' }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0" href="#top">
              <img src="./image/LOGO.png" height="50" alt="" loading="lazy" />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#top">
                  Dashboard
                </a>
              </li>
              {/* <li className="nav-item">
              <a className="nav-link" href="#top">Team</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#top">Projects</a>
            </li> */}
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <a
              className="text-reset me-3 dropdown-toggle hidden-arrow"
              href="#top"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              {/* <i className="fas fa-bell"></i>
              <span className="badge rounded-pill badge-notification bg-danger">1</span> */}
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              {/* <li>
              <a className="dropdown-item" href="#top">Some news</a>
            </li>
            <li>
              <a className="dropdown-item" href="#top">Another news</a>
            </li>
            <li>
              <a className="dropdown-item" href="#top">Something else here</a>
            </li> */}
            </ul>

            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#top"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              {/* <img
                src={userProfile.imageUrl}
                className="rounded-circle"
                height="5"
                alt=""
                loading="lazy"
              /> */}
              <Avatar icon={<UserOutlined />} />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a
                  type="button"
                  href="#top"
                  className="dropdown-item"
                  onClick={() => setisShowChangePasswordModal(true)}
                >
                  Đổi mật khẩu
                </a>
              </li>
              <li>
                <a
                  type="button"
                  href="#top"
                  className="dropdown-item text-danger"
                  onClick={() => dispatch(authActions.logOut())}
                >
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
