import { PayloadAction } from '@reduxjs/toolkit';
import OrderAPi from 'api/order-api';
import { ListParams, ListResponse, OrderResponse } from 'models';
import { call, put, takeEvery } from 'redux-saga/effects';
import { OrderActions } from './orderSlice';

function* fetchOrderList(action: PayloadAction<number>) {
  try {
    const response: ListResponse<OrderResponse> = yield call(OrderAPi.getAll,action.payload);
    yield put(OrderActions.fetchOrderListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch Order list', error);
    yield put(OrderActions.fetchOrderListFailed());
  }
}

function* fetchOrderListByCustomer(params: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<OrderResponse> = yield call(OrderAPi.getByCustomer,params.payload);
    console.log(response)
    yield put(OrderActions.fetchOrderListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch Order list', error);
    yield put(OrderActions.fetchOrderListFailed());
  }
}
 
export default function* OrderSaga() {
  yield takeEvery(OrderActions.fetchOrderList, fetchOrderList);
  yield takeEvery(OrderActions.fetchOrderListByCustomer, fetchOrderListByCustomer);
}
