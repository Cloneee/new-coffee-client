import { Button, Card, Col, Form, Input, Row, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Redirect } from 'react-router-dom';
import { authActions } from '../authSlice';

const fullWidthStyle = { margin: '10px', height: '150px' };

export default function LoginPage() {
  const accessToken = sessionStorage.getItem('access_token');
  const dispatch = useAppDispatch();

  const isLogging = useAppSelector((state) => state.auth.logging);

  const onFinish = (values: any) => {
    dispatch(authActions.login(values));
  };
  const onFinishFailed = (values: any) => {
    console.log('idk why must do something in this -.-');
  };
  if (accessToken) return <Redirect to="/dashbroad" />;
  return (
    <div>
      <Row gutter={6}>
        <Col className="gutter-row" span={24} style={fullWidthStyle}></Col>
        <Col className="gutter-row" span={6}></Col>
        <Col className="gutter-row" span={12}>
          <Card
            title={
              <div className="row">
                <div className="col-2"> Đăng nhập</div>
                <div className="col-4"></div>
              </div>
            }
            bordered={true}
            hoverable={true}
          >
            <Form
              name="basic"
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Tài khoản:"
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập tài khoản!' },
                  {
                    pattern: /[\D]/g,
                    message: 'Tài khoản phải bắt đầu bằng chữ',
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu:"
                name="password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  {
                    pattern: /[\w]/g,
                    message: 'Mật khẩu không hợp lệ!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 10, span: 24 }}>
                {isLogging === true && <Spin />}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: `1rem` }}
                  //   icon={<Spin />}
                >
                  ĐĂNG NHẬP
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
