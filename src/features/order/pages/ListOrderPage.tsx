import { OrderedListOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Pagination, Select, Table, Tag, Tooltip } from 'antd';
import orderAPi from 'api/order-api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Toast } from 'components/Common';
import { Loading } from 'components/Common/Loading';
import { OrderResponse } from 'models';
import React, { useEffect, useState } from 'react';
import { OrderActions } from '../orderSlice';

export const ListOrderPage = () => {
  const dispatch = useAppDispatch();
  const listOrder = useAppSelector((state) => state.order.rawData.data);
  const totalPage = useAppSelector((state) => state.order.rawData.totalPage);
  const isLoading = useAppSelector((state) => state.order.loading);
  const [selectedOrder, setselectedOrder] = useState<OrderResponse>();
  const [currentPage, setcurrentPage] = useState<number>(1);
  useEffect(() => {
    dispatch(OrderActions.fetchOrderList(currentPage));
  }, [currentPage, dispatch]);

  const columns: any = [
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
      title: 'Khách hàng',
      dataIndex: ['customer', 'name'],
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
      render: (tag: string, obj: OrderResponse) => {
        let tooltip = 'Nhấn để thay đổi trạng thái';
        if (tag === 'Pending')
          return (
            <Tooltip placement="topRight" title={tooltip}>
              <Tag onClick={() => handleShowStatusModal(obj)} color="#2db7f5">
                {(tag + '').toUpperCase()}
              </Tag>
            </Tooltip>
          );
        else if (tag === 'Cancel') return <Tag color="#FF6F91">{(tag + '').toUpperCase()}</Tag>;
        else return <Tag color="#87d068">{(tag + '').toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'dateOrdered',
      key: 'dateOrdered',
      render: (dateCreated: Date)=> new Date(dateCreated).toLocaleString()
    },
    {
      title: 'Chi tiết',
      key: 'lastOnline',
      render: (obj: OrderResponse) => {
        return (
          <div>
            {' '}
            <Button
              icon={<OrderedListOutlined />}
              type="primary"
              onClick={() => handleShowListOrderModal(obj)}
            >
              &nbsp;&nbsp;Chi tiết đơn hàng
            </Button>
          </div>
        );
      },
    },
  ];

  const [isShowListOrderModal, setisShowListOrderModal] = useState(false);
  const handleShowListOrderModal = (order: OrderResponse) => {
    setselectedOrder(order);
    setisShowListOrderModal(true);
  };
  const handleCancleListOrderModal = () => {
    setisShowListOrderModal(false);
  };

  const footerOfListOrderlModal = [
    <Button key="back" onClick={() => handleCancleListOrderModal()}>
      Thoát
    </Button>,
  ];

  //Change status modal
  const [isShowStatusModal, setisShowStatusModal] = useState(false);
  const onChangeStatusFormSubmit = async (values: any) => {
    try {
      await orderAPi.toogle(values);
      Toast(
        'success',
        'Cập nhật hoá đơn thành công!',
        'Hoá đơn được cập nhật thành công. Bạn có thể xem lại trong danh sách hoá đơn.'
      );
      setisShowStatusModal(false);
      dispatch(OrderActions.fetchOrderList(currentPage));
    } catch (error) {
      Toast(
        'success',
        'Có lỗi xảy ra trong quá trình cập nhật!',
        'Hoá đơn cập nhật thất bại. Vui lòng thử lại.'
      );
    }
  };
  const handleShowStatusModal = (order: OrderResponse) => {
    console.log(order);
    setselectedOrder(order);
    setisShowStatusModal(true);
  };
  const handleCancleStatusModal = () => {
    setisShowStatusModal(false);
  };

  const footerOfStatuslModal = [
    <Button key="back" onClick={() => handleCancleStatusModal()}>
      Thoát
    </Button>,
    <Button
      form="changeStatusForm"
      icon={<i className="fas fa-save"></i>}
      type="primary"
      key="submit"
      htmlType="submit"
    >
      &nbsp;Lưu
    </Button>,
  ];
  const listOrderDetailColumns: any = [
    {
      title: 'Tên sản phẩm',
      dataIndex: ['product', 'name'],
      key: 'name',
      render: (text: string) => <strong>{text}</strong>,
      width: '45%',
    },
    {
      title: 'Đơn giá',
      dataIndex: ['product', 'price'],
      key: 'price',
      render: (price: number) =>
        new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price),

      width: '45%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: string) => <strong>{text}</strong>,
      width: '45%',
    },
  ];
  return (
    <div>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={listOrder}
            pagination={false}
            scroll={{ y: 800 }}
          />
          <div className="text-center">
            <Pagination
              showSizeChanger={false}
              current={currentPage}
              onChange={(e) => setcurrentPage(e)}
              total={totalPage * 10}
            />
          </div>

          <Modal
            width={1000}
            title="Chi tiết hoá đơn"
            visible={isShowListOrderModal}
            footer={footerOfListOrderlModal}
            closable={false}
          >
            <div>
              <Table
                rowKey="_id"
                columns={listOrderDetailColumns}
                dataSource={selectedOrder?.orderItems}
                pagination={false}
                scroll={{ y: 800 }}
              />
            </div>
          </Modal>
          {isShowStatusModal === true && (
            <Modal
              title="Trạng thái hoá đơn"
              visible={isShowStatusModal}
              footer={footerOfStatuslModal}
              closable={false}
            >
              <div>
                <Form
                  name="basic"
                  id="changeStatusForm"
                  onFinish={onChangeStatusFormSubmit}
                  initialValues={selectedOrder}
                  autoComplete="off"
                >
                  {/* <Form.Item label="" name="_id" style={{ display: 'none' }}>
                        <Input type="hidden" />
                    </Form.Item> */}
                  <Form.Item label="Mã hoá đơn " name="_id">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item label="Trạng thái" name="status">
                      <Select disabled={selectedOrder?.status === 'Complete' ? true : false}>
                        <Select.Option value="Pending">Đang chờ</Select.Option>
                        <Select.Option value="Complete">Hoàn thành</Select.Option>
                        <Select.Option value="Cancel">Huỷ</Select.Option>
                      </Select>
                    </Form.Item>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};
