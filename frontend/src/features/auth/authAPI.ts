import axios from 'axios';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '../../types/User';

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axios.post('/api/register', data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post('/api/login', data);
  return response.data;
};
