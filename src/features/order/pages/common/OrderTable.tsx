import { Button, Modal, Table, Tag } from 'antd';
import Search from 'antd/lib/input/Search';
import orderAPi from 'api/order-api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Loading } from 'components/Common/Loading';
import { Toast } from 'components/Common/Toast';
import { orderItemsActions } from 'features/order/orderItemsSlice';
import { Customer, Order, OrderItem, OrderItemForAdd } from 'models';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customerActions } from '../../../customer/customerSlice';

interface Props {}
let locale = {
  emptyText: 'Không tìm thấy kết quả nào',
};

export const OrderTable = (props: Props) => {
  const dispatch = useAppDispatch();
  const listOrderItems: OrderItem[] = useAppSelector((state) => state.orderItems.listItem);
  const totalPrice = useAppSelector((state) => state.orderItems.totalPrice);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();
  const [isShowModal, setisShowModal] = useState<boolean>(false);
  const [titleOfModal, settitleOfModal] = useState('title');
  const listCustomer = useAppSelector((state) => state.customer.list);
  const isLoading = useAppSelector((state) => state.customer.loading);

  const onSearch = (query: string) => {
    if (query === '') {
      dispatch(customerActions.fetchCustomerList());
    } else dispatch(customerActions.fetchCustomerResultListWhenSearch(query));
  };

  useEffect(() => {
    dispatch(customerActions.fetchCustomerList());
  }, [dispatch]);
  const handleCancel = () => {
    setisShowModal(false);
  };
  const showModal = () => {
    settitleOfModal('Chọn khách hàng:');
    setisShowModal(true);
  };
  const handleAddOrderButon = async () => {
    if (listOrderItems.length === 0) {
      Toast(
        'danger',
        'Chưa có sản phẩm nào trong hoá đơn',
        'Chưa có sản phẩm nào trong hoá đơn. Vui lòng thêm trước khi muốn tạo!'
      );
    } else {
      if (!selectedCustomer) {
        Toast('warning', 'Lưu ý!', 'Bạn vừa tạo hoá đơn với khách hàng vô danh!');
      }
      let listOrderItemsForAdd: OrderItemForAdd[] = [];
      listOrderItems.forEach((item, index) => {
        listOrderItemsForAdd.push({
          product: item?.product?._id,
          quantity: item.quantity,
        });
      });
      console.log(listOrderItemsForAdd);
      let order: Order = {
        orderItems: listOrderItemsForAdd,
        customer: selectedCustomer?._id,
      };
      try {
        await orderAPi.add(order);
        Toast(
          'success',
          'Tạo hoá đơn thành công',
          'Hoá đơn được tạo thành công. Bạn có thể xem lại hoá đơn đã tạo trong danh sách hoá đơn'
        );
        dispatch(orderItemsActions.destroyOrderItems());
        setSelectedCustomer({});
      } catch (error) {
        console.log(error);
      }
    }
  };
  const footerOfDetailModal = [
    <Button key="back" onClick={() => handleCancel()}>
      Thoát
    </Button>,
  ];

  const onMinusOrderItemClick = (obj: OrderItem) => {
    if (obj.quantity === 1) {
      toast(
        <div>
          <div className="toast-custom__body">
            <div className="toast-custom__title">Số lượng không được dưới 1!</div>
            <div className="toast-custom__content">
              Vui lòng nhấn xoá nếu bạn muốn xoá sản phẩm <br /> khỏi hoá đơn.
            </div>
            {/* <div>            <a className="btn " style={{borderColor:"#1db954", backgroundColor:"#1db954"}}  href='https://accounts.spotify.com/authorize?client_id=aa81c8b08f9847ccb97d12ed03dccd34&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&scope=user-read-playback-state%20user-read-currently-playing%20user-read-private%20user-read-email%20user-follow-read%20streaming%20app-remote-control%20user-read-playback-position%20user-top-read%20user-read-recently-played%20playlist-modify-private%20playlist-read-collaborative%20playlist-read-private%20playlist-modify-public'  >SIGN IN</a></div> */}
          </div>
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
          className: 'toast-custom toast--danger',
          bodyClassName: 'toast-custom__body',
          autoClose: 5000,
        }
      );
    } else dispatch(orderItemsActions.minusQuantityOrderItem(obj));
  };
  const columns: any = [
    {
      title: 'STT',
      dataIndex: '_id',
      key: '_id',
      render: (text: string) => <strong>{text}</strong>,
      width: '12%',
    },
    {
      title: 'Sản phẩm',
      dataIndex: ['product', 'name'],
      key: 'name',
      render: (text: string) => <strong>{text}</strong>,
      width: '45%',
    },
    {
      title: 'Số lượng',
      dataIndex: '',
      key: '',
      render: (obj: OrderItem) => {
        return (
          <div className="row">
            <div className="col-3">
              <Button
                shape="circle"
                icon={<i className="fas fa-minus"></i>}
                type="primary"
                onClick={() => onMinusOrderItemClick(obj)}
              ></Button>
            </div>
            <div className="col-3 text-center">
              <strong>{obj.quantity}</strong>
            </div>
            <div className="col-3">
              <Button
                onClick={() => dispatch(orderItemsActions.plusQuantityOrderItem(obj))}
                shape="circle"
                icon={<i className="fas fa-plus"></i>}
                type="primary"
              ></Button>
            </div>
            <div className="col-3">
              <Button
                danger
                icon={<i className="fas fa-trash"></i>}
                type="primary"
                onClick={() => dispatch(orderItemsActions.deleteOrderItem(obj))}
              ></Button>
            </div>
          </div>
        );
      },
    },
  ];

  const customerColumns: any = [
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
      title: 'Chi tiết',
      key: 'lastOnline',
      render: (obj: Customer) => {
        return (
          <div>
            {selectedCustomer?._id === obj._id ? (
              <Tag color="#87d068">{'Đang chọn'.toUpperCase()}</Tag>
            ) : (
              <Button
                icon={<i className="fas fa-check"></i>}
                type="primary"
                onClick={() => setSelectedCustomer(obj)}
              >
                &nbsp;&nbsp;Chọn
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ paddingTop: '15px' }} className="col-5">
      <div className="text-center">
        <h4>HOÁ ĐƠN</h4>
      </div>
      <Table
        locale={locale}
        rowKey={'_id'}
        dataSource={listOrderItems}
        pagination={false}
        scroll={{ y: 350 }}
        columns={columns}
      />

      <br></br>
      <div className="row text-center">
        <h5 className="col-6 text-start">Khách hàng: </h5>
        <div className="col-6">
          <Button onClick={showModal} icon={<i className="fas fa-user"></i>} type="primary">
            {' '}
            &nbsp; &nbsp;Chọn khách hàng
          </Button>
          {isLoading === true ? (
            <Loading />
          ) : (
            <Modal
              closable={false}
              width={1000}
              style={{ top: 20 }}
              title={titleOfModal}
              visible={isShowModal}
              footer={footerOfDetailModal}
            >
              <div>
                <Search
                  placeholder="Nhập thông tin ..."
                  onSearch={(query) => onSearch(query)}
                  style={{ width: 200 }}
                />
                <Button
                  type="primary"
                  onClick={() => dispatch(customerActions.fetchCustomerList())}
                >
                  Mặc định
                </Button>
                <Table
                  locale={locale}
                  rowKey={'_id'}
                  dataSource={listCustomer}
                  pagination={false}
                  scroll={{ y: 350 }}
                  columns={customerColumns}
                />
              </div>
            </Modal>
          )}
        </div>
        <div className="col-12 text-start" style={{ paddingTop: '15px', fontSize: '18px' }}>
          {typeof selectedCustomer?._id !== 'undefined' ? (
            <div>
              <div>
                Tên khách hàng: <strong>{selectedCustomer.name}</strong>
              </div>
              <div>
                SĐT: <strong>{selectedCustomer.phone}</strong>
              </div>
              <div>
                Email: <strong>{selectedCustomer.email}</strong>
              </div>
              <div>
                Địa chỉ: <strong>{selectedCustomer.address}</strong>
              </div>
            </div>
          ) : (
            <div>Chưa có khách hàng nào được chọn</div>
          )}
        </div>
      </div>
      <br></br>
      <hr />
      <div style={{ paddingTop: '15px', fontSize: '18px' }}>
        Tổng thành tiền:{' '}
        <strong style={{ fontWeight: 'bolder' }}>
          <h5>
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
              totalPrice
            )}{' '}
          </h5>
        </strong>
        <div className="row text-center">
          <div className="col-6">
            <Button
              onClick={() => dispatch(orderItemsActions.destroyOrderItems())}
              danger
              icon={<i className="fas fa-trash"></i>}
              type="primary"
            >
              {' '}
              &nbsp; &nbsp;Huỷ hoá đơn
            </Button>
          </div>
          <div className="col-6">
            <Button
              onClick={() => handleAddOrderButon()}
              icon={<i className="fas fa-trash"></i>}
              type="primary"
            >
              {' '}
              &nbsp; &nbsp;Lưu hoá đơn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
