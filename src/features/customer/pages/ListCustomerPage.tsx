import { OrderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Pagination, Table, Tag } from 'antd';
import Search from 'antd/lib/input/Search';
import confirm from 'antd/lib/modal/confirm';
import CustomerAPi from 'api/customer-api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Toast } from 'components/Common';
import { Loading } from 'components/Common/Loading';
import { OrderActions } from 'features/order/orderSlice';
import { Customer, ListParams, Product } from 'models';
import React, { useEffect, useState } from 'react';
import { customerActions } from '../customerSlice';


let locale = {
  emptyText: 'Không tìm thấy kết quả nào',
};
export const ListCustomerPage = () => {
  const dispatch = useAppDispatch();
  const listCustomer = useAppSelector((state) => state.customer.list);
  const isLoading = useAppSelector((state) => state.customer.loading);
  const listOrderByCustomer = useAppSelector((state) => state.order.rawData.data);
  const totalPage = useAppSelector((state) => state.order.rawData.totalPage);
  const isListOrderLoading = useAppSelector((state) => state.order.loading);
  const [selectedCustomer, setselectedCustomer] = useState<Customer>();
  const [currentPage, setcurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(customerActions.fetchCustomerList());
  }, [dispatch]);

  // handle Delete customer
  const confirmDelete = async () =>{
    try {
      if (selectedCustomer?._id) await CustomerAPi.remove(selectedCustomer._id);
      Toast(
        'success',
        'Xoá khách hàng thành công!',
        'Khách hàng được xoá thành công. Bạn có thể xem lại trong danh sách khách hàng.'
      );
      setisShowDetailModal(false)
      dispatch(customerActions.fetchCustomerList());
    } catch (error: any) {
      Toast('danger', 'Xoá khách hàng thất bại!', error.response.data.error);
    }
  }
  const handleDelete = async () => {

    confirm({
      title: 'Bạn có chắc chắn muốn xoá khách hàng này không?',
      // icon: <ExclamationCircleOutlined />,
      content: 'Khách hàng một khi đã bị xoá, sẽ không thể hoàn tác...',
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk() {
        confirmDelete()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  };
  // handle Search 
  const onSearch = (query: string) => {
    if (query === '') {
      dispatch(customerActions.fetchCustomerList());
    } else dispatch(customerActions.fetchCustomerResultListWhenSearch(query));
  };

  const handleCustomerOrderClick = async (obj: Customer | undefined) => {
    setcurrentPage(1)
    setselectedCustomer(obj)
    let params: ListParams = {
      id: obj?._id,
      page: 1,
    };
    
    await dispatch(OrderActions.fetchOrderListByCustomer(params));
    await setisShowListOrderModal(true);
  };
  // -- Add customer Modal
  const [isShowAddModal, setisShowAddModal] = useState(false);

  const onFormSubmitAddModal = async (customer: Customer) => {
    try {
      await CustomerAPi.add(customer);
      Toast(
        'success',
        'Thêm khách hàng thành công!',
        'Khách hàng mới được tạo thành công. Bạn có thể xem lại trong danh sách khách hàng.'
      );
      dispatch(customerActions.fetchCustomerList());
      setisShowAddModal(false);
    } catch (error: any) {
      Toast('danger', 'Thêm khách hàng thất bại!', error.response.data.error);
    }
  };
  const footerOfAddModal = [
    <Button key="back" onClick={() => setisShowAddModal(false)}>
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
  const handleShowDetailModal = async (obj: Customer) => {
    

    await setselectedCustomer(obj);
    await setisShowDetailModal(true);
  };
  const handleCancelDetailModal = () => {
    setisShowDetailModal(false);
  };

  const onFormSubmitDetailModal = async (customer: Product) => {
    try {
      if (customer._id) await CustomerAPi.update(customer._id, customer);
      Toast(
        'success',
        'Cập nhật khách hàng thành công!',
        'Khách hàng được cập nhật thành công. Bạn có thể xem lại trong danh sách khách hàng.'
      );
      dispatch(customerActions.fetchCustomerList());
      setisShowDetailModal(false);
    } catch (error: any) {
      Toast('danger', 'Cập nhật khách hàng thất bại!', error.response.data.error);
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
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <strong>{text}</strong>,
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Chi tiết',
      key: 'lastOnline',
      width: '25%',
      render: (obj: Customer) => {
        return (
          <div>
            {' '}
            <Button
              onClick={() => handleShowDetailModal(obj)}
              icon={<i className="fas fa-user-circle"></i>}
              type="primary"
            >
              &nbsp;&nbsp;Chi tiết
            </Button>
            &nbsp;&nbsp;
            <Button
              onClick={() => handleCustomerOrderClick(obj)}
              danger
              icon={<OrderedListOutlined />}
              type="primary"
            >
              &nbsp;&nbsp;Lịch sử mua hàng
            </Button>
          </div>
        );
      },
    },
  ];
  // List Orders Customer
  const [isShowListOrderModal, setisShowListOrderModal] = useState(false);
  const handleCancleListOrderModal = () => {
    setisShowListOrderModal(false);
  };
  const handlePageListOrderOnChange = async (page: number) =>{
    
    setcurrentPage(page)
    let params: ListParams = {
      id: selectedCustomer?._id,
      page: page,
    };
    
    await dispatch(OrderActions.fetchOrderListByCustomer(params));
  }
  const footerOfListOrderlModal = [
    <Button key="back" onClick={() => handleCancleListOrderModal()}>
      Thoát
    </Button>,
  ];
  const ListOrderTableColumns: any = [
    {
      title: 'Mã hoá đơn',
      dataIndex: '_id',
      key: '_id',
      render: (text: string) => <strong>{text}</strong>,
      width: '20%',
    },
    {
      title: 'Người lập HĐ',
      dataIndex: ['employee', 'name'],
      key: 'name',
      render: (text: string) => <strong>{text}</strong>,
    },

    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) =>
        new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price),
    },

    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (tag: string) => {
        if (tag === 'Pending') return <Tag color="#2db7f5">{(tag + '').toUpperCase()}</Tag>;
        else return <Tag color="#87d068">{(tag + '').toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'dateOrdered',
      key: 'dateOrdered',
    },
    // {
    //   title: 'Chi tiết',
    //   key: 'lastOnline',
    //   render: (obj: OrderResponse) => {
    //     return (
    //       <div>
    //         {' '}
    //         <Button
    //           icon={<i className="fas fa-user-circle"></i>}
    //           type="primary"
    //           // onClick={() => showModal(obj)}
    //         >
    //           &nbsp;&nbsp;Chi tiết
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];
  return (
    <div>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div>
          <div className="row">
            &nbsp;{' '}
            <div className="col-5 text-start">
              <Search
                placeholder="Nhập thông tin ..."
                onSearch={(query) => onSearch(query)}
                style={{ width: 200 }}
              />
              <Button  type="primary" onClick={() => dispatch(customerActions.fetchCustomerList())}>
                Mặc định
              </Button>
            </div>
            <div className="col-6 text-end">
              <Button onClick={() => setisShowAddModal(true)} type="primary"
              icon={ <UserOutlined />}
              >
                Khách hàng mới
              </Button>
            </div>
          </div>

          <Table
            rowKey="_id"
            columns={columns}
            dataSource={listCustomer}
            pagination={false}
            scroll={{ y: 800 }}
            locale={locale}
          />
          <Modal
            closable={false}
            style={{ top: 20 }}
            title={<strong>Thêm khách hàng:</strong>}
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
                  initialValues={selectedCustomer}
                >
                  <Form.Item
                    label="Mã khách hàng :"
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
                <div className="text-center">
                <Button 
                onClick={()=>handleDelete()}
                icon={<i className="fas fa-trash"></i>} type="primary" danger>
                  &nbsp; Xoá khách hàng này
                </Button>
              </div>
              </div>
            </Modal>
          )}
          <div>
            <Modal
              width={1000}
              title="Basic Modal"
              visible={isShowListOrderModal}
              footer={footerOfListOrderlModal}
              closable={false}
            >
              {isListOrderLoading === false ? 
              <div>

                <Table
                  rowKey="_id"
                  columns={ListOrderTableColumns}
                  dataSource={listOrderByCustomer}
                  pagination={false}
                  scroll={{ y: 800 }}
                />
                <div className="text-center">
                  <Pagination
                    showSizeChanger={false}
                    current={currentPage}
                    onChange={(e) => handlePageListOrderOnChange(e)}
                    total={totalPage * 10}
                  />
                </div>
              </div> : <Loading/> }
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};
