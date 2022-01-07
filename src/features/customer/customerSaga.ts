import { PayloadAction } from '@reduxjs/toolkit';
import CustomerAPi from 'api/customer-api';
import { Customer } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { customerActions } from './customerSlice';

function* fetchCustomerList() {
  try {
    const response: Customer[] = yield call(CustomerAPi.getAll);
    yield put(customerActions.fetchCustomerListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch Customer list', error);
    yield put(customerActions.fetchCustomerListFailed());
  }
}

function* fetchCustomerResultListWhenSearch(action: PayloadAction<string>) {
  try {
    const response: Customer[] = yield call(CustomerAPi.search,action.payload);
    yield put(customerActions.fetchCustomerListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch Customer list', error);
    yield put(customerActions.fetchCustomerListFailed());
  }
}



export default function* CustomerSaga() {
  yield takeLatest(customerActions.fetchCustomerList, fetchCustomerList);
  yield takeLatest(customerActions.fetchCustomerResultListWhenSearch, fetchCustomerResultListWhenSearch);

}
