import EmployeeAPi from 'api/employee-api';
import { Employee } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { employeeActions } from './employeeSlice';

function* fetchEmployeeList() {
  try {
    const response: Employee[] = yield call(EmployeeAPi.getAll);
    yield put(employeeActions.fetchEmployeeListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch Employee list', error);
    yield put(employeeActions.fetchEmployeeListFailed());
  }
}

export default function* EmployeeSaga() {
  yield takeLatest(employeeActions.fetchEmployeeList, fetchEmployeeList);
}
