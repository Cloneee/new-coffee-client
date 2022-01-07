import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Category } from 'models/category';

export interface categoryState {
  loading: boolean;
  list: Category[];
 
}

const initialState: categoryState = {
  loading: false,
  list: [],
};
const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    fetchCategoryList(state) {
      state.loading = true;
    },
    fetchCategoryListSuccess(state, action: PayloadAction<Category[]>) {
      state.list = action.payload;

      state.loading = false;
    },
    fetchcategoryListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const categoryActions = categorySlice.actions;

// Selectors
export const selectcategoryList = (state: RootState) => state.category.list;
export const selectcategoryLoading = (state: RootState) => state.category.loading;
// export const selectcategoryFilter = (state: RootState) => state.category.filter;
// export const selectcategoryPagination = (state: RootState) => state.category.pagination;

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
