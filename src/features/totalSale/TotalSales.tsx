import React, { useState } from 'react';
import { Card, DatePicker } from 'antd';
import moment from 'moment';
import orderAPi from 'api/order-api';
import { Toast } from 'components/Common';
import { Button } from 'antd/lib/radio';
import Meta from 'antd/lib/card/Meta';

interface Props {}
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const TotalSales = (props: Props) => {
  let today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState(moment(today, dateFormat).format('YYYY-MM-DD'));
  const [to, setTo] = useState(moment(today, dateFormat).format('YYYY-MM-DD'));
  const [totalOrder, settotalOrder] = useState(0);
  const [totalMoney, settotalMoney] = useState(0);

  const dateRangeOnChange = (rs: any) => {
    setFrom(rs[0].format('YYYY-MM-DD'));
    setTo(rs[1].format('YYYY-MM-DD'));

    console.log(from);
  };
  const handleGetResult = async () => {
    try {
      let response = await orderAPi.getTotalSales({
        startDate: from,
        endDate: to,
      });
      console.log(response.totalOrders);
      settotalMoney(response.totalsales)
      settotalOrder(response.totalOrders)
    } catch (error) {
      Toast(
        'danger',
        'Thống kê không thành công!',
        'Không có hoá đơn nào để thống kê trong thời gian này. Vui lòng thử lại!'
      );
    }
  };
  return (
    <div className="text-center">
      <RangePicker
        allowClear={false}
        defaultValue={[moment(today, dateFormat), moment(today, dateFormat)]}
        format={dateFormat}
        onChange={(rs) => dateRangeOnChange(rs)}
      />{' '}
      <Button onClick={() => handleGetResult()} type="primary">
        Lấy kết quả
      </Button>
      <div className="row text-center" style={{ marginTop: '20px' }}>
          <div className='col-3'></div>
        <div className="col-3">
          <Card
            style={{ width: 300 }}
            // cover={
            //   <img
            //     alt="example"
            //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            //   />
            // }
          >
            <Meta title="Hoá đơn" description={<strong style={{fontSize:"20px","color": "#FF6F91" }}>{totalOrder + " Hoá đơn"}</strong>}/>
          </Card>
        </div>
        <div className="col-3">
          <Card
            style={{ width: 300 }}
            // cover={
            //   <img
            //     alt="example"
            //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            //   />
            // }
          >
            <Meta title="Doanh thu" description={<strong style={{fontSize:"20px","color": "#FF6F91" }}>{totalMoney + " VNĐ"}</strong>} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TotalSales;
