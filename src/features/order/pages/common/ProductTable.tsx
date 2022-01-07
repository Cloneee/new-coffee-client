import { Button, Image, Table, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Loading } from 'components/Common/Loading';
import { categoryActions } from 'features/category/categorySlice';
import { orderItemsActions } from 'features/order/orderItemsSlice';
import { productActions } from 'features/product/productSlice';
import { Category, FilterFormat, Product } from 'models';
import React, { useEffect } from 'react';

interface Props {}

export const ProductTable = (props: Props) => {
  const dispatch = useAppDispatch();
  const listProduct: Product[] = useAppSelector((state) => state.product.list);
  const isLoading: boolean = useAppSelector((state) => state.product.loading);
  const listCategory: Category[] = useAppSelector((state) => state.category.list);
  const listCategoryFormatted: FilterFormat[] = [];
  listCategory.forEach((category, index) => {
    let filerItem: FilterFormat = { text: category.name, value: category.name };
    listCategoryFormatted.push(filerItem);
  });
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
      width: '40%',
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
      width: '15%',
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
    // {
    //     title: 'description',
    //     dataIndex: 'description',
    //     key: 'description',

    // },
    {
      title: 'Trạng thái',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (tag: boolean) => {
        if (tag === false) return <Tag color="red">{(tag + '').toUpperCase()}</Tag>;
        else return <Tag color="green">{(tag + '').toUpperCase()}</Tag>;
      },
      width: '15%',
    },
    //  {
    //     title: 'Ngày tạo',
    //     dataIndex: 'dateCreated',
    //     key: 'dateCreated',

    // },
    {
      title: 'Thêm',
      key: 'lastOnline',
      render: (obj: Product) => {
        return (
          <div>
            {' '}
            <Button
              icon={<i className="fas fa-plus"></i>}
              type="primary"
              onClick={() =>
                dispatch(orderItemsActions.addNewOrderItemToOrder({ product: obj, quantity: 1 }))
              }
            ></Button>
          </div>
        );
      },
      width: '10%',
    },
  ];

  return (
    <div className="col-7">
      {isLoading === true ? (
        <Loading />
      ) : (
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={listProduct}
          pagination={false}
          scroll={{ y: 800 }}
        />
      )}
    </div>
  );
};
