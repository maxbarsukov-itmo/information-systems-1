import {
  loginFail,
  loginLoading,
  loginSuccess,
  logout as logoutUser,
} from 'store/auth';

import AuthService from 'services/api/AuthService';
import Storage from 'utils/Storage';

import { USER_KEY, TOKEN_KEY } from 'config/constants';
import { SignInDto } from 'interfaces/dto/auth/SignInDto';
import { SignUpDto } from 'interfaces/dto/auth/SignUpDto';


const getErrorMessage = error => error?.response?.data?.message || 'ERROR';

export const login = (credentials: SignInDto) => dispatch => {
  dispatch(loginLoading());

  return AuthService.login(credentials).then(
    response => {
      const { data } = response;
      dispatch(loginSuccess(data.user));
      Storage.set(TOKEN_KEY, data.token);
      Storage.set(USER_KEY, data.user);
      return Promise.resolve();
    },
    error => {
      dispatch(loginFail(getErrorMessage(error)));
      return Promise.reject();
    }
  );
};

export const register = (credentials: SignUpDto) => dispatch => {
  dispatch(loginLoading());

  return AuthService.register(credentials).then(
    response => {
      const { data } = response;
      dispatch(loginSuccess(data.user));
      Storage.set(TOKEN_KEY, data.token);
      Storage.set(USER_KEY, data.user);
      return Promise.resolve();
    },
    error => {
      dispatch(loginFail(getErrorMessage(error)));
      return Promise.reject();
    }
  );
};

export const logout = () => dispatch => {
  Storage.remove(TOKEN_KEY);
  Storage.remove(USER_KEY);

  dispatch(logoutUser());
};
