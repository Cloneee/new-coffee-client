import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Employee } from 'models';

export interface EmployeeState {
  loading: boolean;
  list: Employee[];
}

const initialState: EmployeeState = {
  loading: false,
  list: [],
};
const EmployeeSlice = createSlice({
  name: 'Employee',
  initialState: initialState,
  reducers: {
    fetchEmployeeList(state) {
      state.loading = true;
    },
    fetchEmployeeListSuccess(state, action: PayloadAction<Employee[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchEmployeeListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const employeeActions = EmployeeSlice.actions;

// Selectors
export const selectEmployeeList = (state: RootState) => state.employee.list;
export const selectEmployeeLoading = (state: RootState) => state.employee.loading;

// Reducer
const employeeReducer = EmployeeSlice.reducer;
export default employeeReducer;
