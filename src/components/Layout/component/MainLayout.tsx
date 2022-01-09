import { Layout } from 'antd';
import { ListCustomerPage } from 'features/customer/pages/ListCustomerPage';
import { ListEmployeePage } from 'features/employee/pages/ListEmployeePage';
import { ListOrderPage } from 'features/order/pages/ListOrderPage';
import { OrderPage } from 'features/order/pages/OrderPage';
import { ProductPage } from 'features/product/pages/ProductPage';
import TotalSales from 'features/totalSale/TotalSales';
import React from 'react';

interface Props {
    layoutSelectedIndex: number
    
}

const MainLayout = (props: Props) => {
    const {layoutSelectedIndex} = props
    const { Content } = Layout
    const layoutList: any[] = [<OrderPage/>,<ListOrderPage/>,<TotalSales/>,<ProductPage/>,<ListCustomerPage/>,<ListEmployeePage/>, ]
    return (
        <Layout style={{ padding: '0px 10px 10px' }}>
            <Content
              className="site-layout-background"
             
            >
              <div style={{minHeight: '600px',backgroundColor:'white'}} className="">
                  {layoutList[layoutSelectedIndex]}
              </div>
            </Content>
          

          </Layout>
    )
}

export default MainLayout
