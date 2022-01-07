import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Product } from 'models/product';

export interface ProductState {
  loading: boolean;
  list: Product[];
}

const initialState: ProductState = {
  loading: false,
  list: [],
};
const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    fetchProductList(state) {
      state.loading = true;
    },
    fetchProductListSuccess(state, action: PayloadAction<Product[]>) {
      state.list = action.payload;

      state.loading = false;
    },
    fetchProductListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const productActions = productSlice.actions;

// Selectors
export const selectProductList = (state: RootState) => state.product.list;
export const selectProductLoading = (state: RootState) => state.product.loading;

// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
