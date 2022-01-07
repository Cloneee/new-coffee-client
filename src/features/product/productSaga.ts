import productAPi from 'api/product-api';
import { Product } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { productActions } from './productSlice';

function* fetchproductList() {
  try {
    const response: Product[] = yield call(productAPi.getAll);
    yield put(productActions.fetchProductListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch product list', error);
    yield put(productActions.fetchProductListFailed());
  }
}

export default function* productSaga() {
  yield takeLatest(productActions.fetchProductList, fetchproductList);
}
