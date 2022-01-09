import { Button, Form, Image, Input, InputNumber, Modal, Select, Table, Tag } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import productApi from 'api/product-api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Toast } from 'components/Common';
import { categoryActions } from 'features/category/categorySlice';
import { Category, FilterFormat, Product, ProductResponse } from 'models';
import React, { useEffect, useState } from 'react';
import { productActions } from '../productSlice';

export const ProductPage = () => {
  const dispatch = useAppDispatch();
  const listProduct: Product[] = useAppSelector((state) => state.product.list);
  const listCategory: Category[] = useAppSelector((state) => state.category.list);
  const listCategoryFormatted: FilterFormat[] = [];
  const [selectedProduct, setselectedProduct] = useState<ProductResponse>();
  listCategory.forEach((category) => {
    let filerItem: FilterFormat = { text: category.name, value: category.name };
    listCategoryFormatted.push(filerItem);
  });

  // handle Delete Product
  const confirmDelete = async () => {
    try {
      if (selectedProduct?._id) await productApi.remove(selectedProduct._id);
      Toast(
        'success',
        'Xoá sản phẩm thành công!',
        'sản phẩm được xoá thành công. Bạn có thể xem lại trong danh sách sản phẩm.'
      );
      setisShowDetailModal(false);
      dispatch(productActions.fetchProductList());
    } catch (error: any) {
      Toast('danger', 'Xoá sản phẩm thất bại!', error.response.data.error);
    }
  };
  const handleDelete = async () => {
    confirm({
      title: 'Bạn có chắc chắn muốn xoá sản phẩm này không?',
      // icon: <ExclamationCircleOutlined />,
      content: 'sản phẩm một khi đã bị xoá, sẽ không thể hoàn tác...',
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk() {
        confirmDelete();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // -- Add Product Modal
  const [isShowAddModal, setisShowAddModal] = useState(false);

  const onFormSubmitAddModal = async (product: ProductResponse) => {
    product.images = [];
    console.log(product);
    try {
      await productApi.add(product);
      Toast(
        'success',
        'Thêm sản phẩm thành công!',
        'sản phẩm mới được tạo thành công. Bạn có thể xem lại trong danh sách sản phẩm.'
      );
      dispatch(productActions.fetchProductList());
      setisShowAddModal(false);
    } catch (error: any) {
      Toast('danger', 'Thêm sản phẩm thất bại!', error.response.data.error);
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
  // -- Detail Product Modal
  const [isShowDetailModal, setisShowDetailModal] = useState(false);
  const handleShowDetailModal = async (product: Product) => {
    console.log(product.category._id);

    let productById = await productApi.getById(product._id);
    await setselectedProduct(productById);
    await setisShowDetailModal(true);
  };
  const handleCancelDetailModal = () => {
    setisShowDetailModal(false);
  };

  const onFormSubmitDetailModal = async (product: any) => {
    try {
      if (product._id) await productApi.update(product._id, product);
      Toast(
        'success',
        'Cập nhật sản phẩm thành công!',
        'sản phẩm được cập nhật thành công. Bạn có thể xem lại trong danh sách sản phẩm.'
      );
      dispatch(productActions.fetchProductList());
      setisShowDetailModal(false);
    } catch (error: any) {
      Toast('danger', 'Cập nhật sản phẩm thất bại!', error.response.data.error);
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

  useEffect(() => {
    dispatch(productActions.fetchProductList());
    dispatch(categoryActions.fetchCategoryList());
  }, [dispatch]);
  const columns: any = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, obj: any) => (
        <div className="row">
          <Image width={60} src={obj.images[0]} />
          <strong className="col-6"> {text} </strong>
        </div>
      ),
      width: '25%',
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) =>
        new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price),
      sorter: {
        compare: (a: Product, b: Product) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      title: 'Loại',
      dataIndex: ['category', 'name'],
      key: 'category',
      filters: listCategoryFormatted,
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: string, record: Product) => record?.category.name.includes(value),
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (tag: boolean) => {
        if (tag === false) return <Tag color="red">{(tag + '').toUpperCase()}</Tag>;
        else return <Tag color="green">{(tag + '').toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (dateCreated: Date)=> new Date(dateCreated).toLocaleString()
    },
    {
      title: 'Chi tiết',
      key: 'lastOnline',
      render: (obj: Product) => {
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
      <div className="text-end">
        <Button
          onClick={() => setisShowAddModal(true)}
          type="primary"
          // icon={ <UserOutlined />}
        >
          Sản phẩm mới
        </Button>
      </div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={listProduct}
        pagination={false}
        scroll={{ y: 800 }}
      />

      <Modal
        closable={false}
        style={{ top: 20 }}
        title={<strong>Thêm sản phẩm:</strong>}
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
            {/* <Form.Item
              label="Hình ảnh :"
              name="images"
              rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
              hasFeedback
            >
              <Input disabled />
            </Form.Item> */}
            <Form.Item
              label="Tên sản phẩm :"
              name="name"
              rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá:"
              name="price"
              rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
              hasFeedback
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Loại"
              name="category"
              rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
            >
              <Select>
                {listCategory.map((category, index) => {
                  return <Select.Option value={category._id}>{category.name}</Select.Option>;
                })}
              </Select>
            </Form.Item>
            {/* <Form.Item label="Trạng thái" name="isFeatured" rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}>
              {' '}
              <Select>
                <Select.Option value="false">MỞ BÁN</Select.Option>
                <Select.Option value="true">HẾT HÀNG</Select.Option>
              </Select>
            </Form.Item> */}
            <Form.Item name="description" label="Mô tả">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {isShowDetailModal && (
        <Modal
          closable={false}
          style={{ top: 20 }}
          title={<strong>Chi tiết sản phẩm:</strong>}
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
              initialValues={selectedProduct}
            >
              <Form.Item
                label="Mã sản phẩm :"
                name="_id"
                rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                hasFeedback
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Tên sản phẩm :"
                name="name"
                rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giá:"
                name="price"
                rules={[{ required: true, message: 'Thuộc tính này là bắt buộc!' }]}
                hasFeedback
              >
                <InputNumber />
              </Form.Item>

              <Form.Item label="Loại" name="category">
                <Select>
                  {listCategory.map((category, index) => {
                    return <Select.Option value={category._id}>{category.name}</Select.Option>;
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="trạng thái" name="isFeatured">
                {' '}
                <Select defaultValue="false">
                  <Select.Option value="false">MỞ BÁN</Select.Option>
                  <Select.Option value="true">HẾT HÀNG</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="description" label="Mô tả">
                <Input.TextArea />
              </Form.Item>
            </Form>
            <div className="text-center">
              <Button
                onClick={() => handleDelete()}
                icon={<i className="fas fa-trash"></i>}
                type="primary"
                danger
              >
                &nbsp; Xoá sản phẩm này
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
