import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, OrderResponse } from 'models';

export interface OrderState {
  loading: boolean;
  rawData: ListResponse<OrderResponse>;
}

const initialState: OrderState = {
  loading: false,
  rawData: {
    data: [],
    totalPage: 1,
    currentPage: 1,
  },
};

const OrderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    fetchOrderList(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    fetchOrderListByCustomer(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchOrderListSuccess(state, action: PayloadAction<ListResponse<OrderResponse>>) {
      state.rawData = action.payload;

      state.loading = false;
    },

    fetchOrderListFailed(state) {
      state.loading = false;
    },

    // addOrder(state){
    //   state.loading = true
    // },
    // addOrderSuccess(state){
    //   state.loading = false
    // }
  },
});

// Actions
export const OrderActions = OrderSlice.actions;

// Selectors
export const selectOrderList = (state: RootState) => state.order.rawData;
export const selectOrderLoading = (state: RootState) => state.order.loading;

// Reducer
const orderReducer = OrderSlice.reducer;
export default orderReducer;
