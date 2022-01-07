import { Button, Form, Input, Modal, Table, Tag, Select } from 'antd';
import EmployeeAPi from 'api/employee-api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Toast } from 'components/Common';
import { Loading } from 'components/Common/Loading';
import { Employee } from 'models';
import React, { useEffect, useState } from 'react';
import { employeeActions } from '../employeeSlice';

export const ListEmployeePage = () => {
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const listEmployee = useAppSelector((state) => state.employee.list);
  const isLoading = useAppSelector((state) => state.employee.loading);
  const [selectedEmployee, setselectedEmployee] = useState<Employee>();
  useEffect(() => {
    dispatch(employeeActions.fetchEmployeeList());
  }, [dispatch]);
  //Add table
  const [isShowAddModal, setisShowAddModal] = useState<boolean>(false);

  const handleCancelAddModal = () => {
    setisShowAddModal(false);
  };

  const onFormSubmitAddModal = async (employee: Employee) => {
    try {
      await EmployeeAPi.add(employee);
      Toast(
        'success',
        'Thêm nhân viên thành công!',
        'nhân viên mới được tạo thành công. Bạn có thể xem lại trong danh sách nhân viên.'
      );
      dispatch(employeeActions.fetchEmployeeList());
      setisShowAddModal(false);
    } catch (error: any) {
      Toast('danger', 'Thêm nhân viên thất bại!', error.response.data.error);
    }

    console.log(employee);
  };
  const footerOfAddModal = [
    <Button key="back" onClick={() => handleCancelAddModal()}>
      Thoát
    </Button>,

    <Button
      form="AddForm"
      icon={<i className="fas fa-save"></i>}
      type="primary"
      key="submit"
      htmlType="submit"
    >
      &nbsp;Thêm
    </Button>,
  ];

  // -- Detail customer Modal
  const [isShowDetailModal, setisShowDetailModal] = useState(false);
  const handleShowDetailModal = async (obj: Employee) => {
    console.log(obj);

    await setselectedEmployee(obj);
    await setisShowDetailModal(true);
  };
  const handleCancelDetailModal = () => {
    setisShowDetailModal(false);
  };

  const onFormSubmitDetailModal = async (employee: Employee) => {
    try {
      if (employee._id) await EmployeeAPi.update(employee._id, employee);
      Toast(
        'success',
        'Cập nhật nhân viên thành công!',
        'nhân viên được cập nhật thành công. Bạn có thể xem lại trong danh sách nhân viên.'
      );
      dispatch(employeeActions.fetchEmployeeList());
      setisShowDetailModal(false);
    } catch (error: any) {
      Toast('danger', 'Cập nhật nhân viên thất bại!', error.response.data.error);
    }
  };
  const footerOfDetailModal = [
    <Button key="back" onClick={() => handleCancelDetailModal()}>
      Thoát
    </Button>,

    <Button
      form="DetailForm"
      icon={<i className="fas fa-save"></i>}
      type="primary"
      key="submit"
      htmlType="submit"
    >
      &nbsp;Cập nhật
    </Button>,
  ];

  const columns: any = [
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <strong> {text} </strong>,
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      // width: '20%'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      // width: '20%'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      // width: '20%'
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      key: 'role',
      // width: '20%'
      render: (role: String)=> <Tag color={role === "admin"? "red" : role === "manager"? "orange" : "green"}>{role.toUpperCase()}</Tag>
    },

    {
      title: 'Chi tiết',
      key: 'lastOnline',
      render: (obj: Employee) => {
        return (
          <div>
            {' '}
            <Button
              icon={<i className="fas fa-user-circle"></i>}
              type="primary"
              onClick={() => handleShowDetailModal(obj)}
            >
              &nbsp;&nbsp;Chi tiết
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div>
          <div className="text-end">
            <Button onClick={() => setisShowAddModal(true)} type="primary">
              Nhân viên mới
            </Button>
          </div>

          <Modal
            closable={false}
            style={{ top: 20 }}
            title={<strong>Thêm nhân viên:</strong>}
            visible={isShowAddModal}
            footer={footerOfAddModal}
          >
            <div>
              <Form
                id="AddForm"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 20 }}
                layout="horizontal"
                onFinish={onFormSubmitAddModal}
              >
                <Form.Item
                  label="Tên :"
                  name="name"
                  rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email:"
                  name="email"
                  rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu:"
                  name="password"
                  rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ: "
                  name="address"
                  rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại:"
                  name="phone"
                  rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Chức vụ:"
                  name="role"
                  rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                  hasFeedback
                >
                  <Select defaultValue="Chọn chức vụ">
                    <Option value="employee">Nhân viên</Option>
                    <Option value="manager">Quản lý</Option>
                    <Option value="admin" disabled>
                      Admin
                    </Option>
                  </Select>
                </Form.Item>
              </Form>
            </div>
          </Modal>
          {isShowDetailModal && (
            <Modal
              closable={false}
              style={{ top: 20 }}
              title={<strong>Chi tiết khách hàng:</strong>}
              visible={isShowDetailModal}
              footer={footerOfDetailModal}
            >
              <div>
                <Form
                  id="DetailForm"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 20 }}
                  layout="horizontal"
                  onFinish={onFormSubmitDetailModal}
                  initialValues={selectedEmployee}
                >
                  <Form.Item
                    label="Tên :"
                    name="_id"
                    rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                    hasFeedback
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Tên :"
                    name="name"
                    rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                    hasFeedback
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email:"
                    name="email"
                    rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                    hasFeedback
                  >
                    <Input />
                  </Form.Item>
                  {/* <Form.Item
                    label="Mật khẩu:"
                    name="password"
                    rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item> */}
                  <Form.Item
                    label="Địa chỉ: "
                    name="address"
                    rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                    hasFeedback
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại:"
                    name="phone"
                    rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                    hasFeedback
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          )}
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={listEmployee}
            pagination={false}
            scroll={{ y: 800 }}
          />
        </div>
      )}
    </div>
  );
};
