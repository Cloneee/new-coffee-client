import { NotFound, PrivateRoute } from 'components/Common';
import "./assets/css/styles.css";
import { Dashbroad } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='App'>
      
      <ConfigProvider>
      <ToastContainer/>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashbroad />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Dashbroad />
          </PrivateRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </ConfigProvider>
    </div>
  );
}

export default App;


