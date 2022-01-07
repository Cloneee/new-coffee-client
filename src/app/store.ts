import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import categoryReducer from 'features/category/categorySlice';
import customerReducer from 'features/customer/customerSlice';
import employeeReducer from 'features/employee/employeeSlice';
import orderItemsReducer from 'features/order/orderItemsSlice';
import orderReducer from 'features/order/orderSlice';
import productReducer from 'features/product/productSlice';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import rootSaga from './rootSage';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  product: productReducer,
  orderItems: orderItemsReducer,
  order: orderReducer,
  category: categoryReducer,
  customer: customerReducer,
  employee: employeeReducer,
});
const sagaMiddleWare = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare, routerMiddleware(history)),
});

sagaMiddleWare.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
