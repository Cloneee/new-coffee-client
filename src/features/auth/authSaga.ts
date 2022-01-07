import { PayloadAction } from '@reduxjs/toolkit';
import employeeAPi from 'api/auth-api';
import { push } from 'connected-react-router';
import { LoginResponseType } from 'models';
import { call, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayLoad } from './authSlice';

function* handleLogin(payload: LoginPayLoad) {
  try {
    const response: LoginResponseType = yield call(employeeAPi.login, payload);

    if (response.token) {
      sessionStorage.setItem('access_token', response.token);
      if (response.role) sessionStorage.setItem('role',response?.role)
      yield put(authActions.loginSuccess(response));
      yield put(push('/dashbroad'));
    } else {
      console.log(response);
    }
  } catch (error: any) {
    console.log(error.response.data);
    yield put(authActions.loginFailed(error.response.data.message));
    
  }
}
function* handleLogout() {
  sessionStorage.removeItem('access_token');
  yield put(push('/login'));
}
function* watchLoginFlow() {
  while (true) {
    //if Logged In
    const isLoggedIn = Boolean(sessionStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayLoad> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(authActions.logOut.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
