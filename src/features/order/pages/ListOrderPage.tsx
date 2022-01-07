import { Button, Pagination, Table, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Loading } from 'components/Common/Loading';
import { OrderResponse } from 'models';
import React, { useEffect, useState } from 'react';
import { OrderActions } from '../orderSlice';

interface Props {}

export const ListOrderPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const listOrder = useAppSelector((state) => state.order.rawData.data);
  const totalPage = useAppSelector((state) => state.order.rawData.totalPage);
  const isLoading = useAppSelector((state) => state.order.loading);
  const [currentPage, setcurrentPage] = useState<number>(1)
  useEffect(() => {
    dispatch(OrderActions.fetchOrderList(currentPage));
  }, [currentPage,dispatch]);

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
    {
      title: 'Chi tiết',
      key: 'lastOnline',
      render: (obj: OrderResponse) => {
        return (
          <div>
            {' '}
            <Button
              icon={<i className="fas fa-user-circle"></i>}
              type="primary"
              // onClick={() => showModal(obj)}
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
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={listOrder}
          pagination={false}
          scroll={{ y: 800 }}
        />
          <div className="text-center">
                <Pagination showSizeChanger={false} current={currentPage} onChange={(e) => setcurrentPage(e)} total={totalPage * 10} />
               
            </div>

        </div>
      )}
    </div>
  );
};
