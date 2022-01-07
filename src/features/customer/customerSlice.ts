import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Customer } from 'models/Customer';

export interface CustomerState {
  loading: boolean;
  list: Customer[];
  // filter: ListParams;
  // pagination: PaginationParams;
}

const initialState: CustomerState = {
  loading: false,
  list: [],
};
const CustomerSlice = createSlice({
  name: 'Customer',
  initialState: initialState,
  reducers: {
    fetchCustomerList(state) {
      // state.loading = true;
    },
    fetchCustomerResultListWhenSearch(state, action: PayloadAction<string>) {
      // state.loading = true;
    },
    fetchCustomerListSuccess(state, action: PayloadAction<Customer[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchCustomerListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const customerActions = CustomerSlice.actions;

// Selectors
export const selectCustomerList = (state: RootState) => state.customer.list;
export const selectCustomerLoading = (state: RootState) => state.customer.loading;


// Reducer
const customerReducer = CustomerSlice.reducer;
export default customerReducer;
