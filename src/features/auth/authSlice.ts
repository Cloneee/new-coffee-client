import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Toast } from 'components/Common/Toast';
import {
  EMPLOYEE_NOTFOUND, EMPLOYEE_NOTFOUND_VN, PASSWORD_ERROR,
  PASSWORD_ERROR_VN
} from 'constants/auth-const';
import { LoginResponseType } from 'models';

export interface LoginPayLoad {
  email: string;
  password: string;
}
export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUSer?: LoginResponseType;
}
const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUSer: undefined,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayLoad>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<LoginResponseType>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUSer = action.payload;
    },
    loginFailed(state, action: PayloadAction<any>) {
      state.isLoggedIn = false;
      state.logging = false;
      let message = action.payload;
      if (message === EMPLOYEE_NOTFOUND)
        Toast('danger', 'Đăng nhập thất bại', EMPLOYEE_NOTFOUND_VN);
      if (message === PASSWORD_ERROR) Toast('danger', 'Đăng nhập thất bại', PASSWORD_ERROR_VN);
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.currentUSer = undefined;
    },
  },
});

//Actions
export const authActions = authSlice.actions;

//Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.isLogging;

const authReducer = authSlice.reducer;

export default authReducer;
