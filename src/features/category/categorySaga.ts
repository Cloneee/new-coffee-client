import categoryAPi from 'api/category-api';
import { Category } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { categoryActions } from './categorySlice';

function* fetchCategoryList() {
  try {
    const response: Category[] = yield call(categoryAPi.getAll);
    yield put(categoryActions.fetchCategoryListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch category list', error);
    yield put(categoryActions.fetchcategoryListFailed());
  }
}

export default function* categorySaga() {
  yield takeLatest(categoryActions.fetchCategoryList, fetchCategoryList);
}
