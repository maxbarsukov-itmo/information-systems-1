import api from 'services/api/api';

import { AxiosResponse } from 'axios';
import { AuthenticationDto } from 'interfaces/dto/auth/AuthenticationDto';
import { SignInDto } from 'interfaces/dto/auth/SignInDto';
import { SignUpDto } from 'interfaces/dto/auth/SignUpDto';

export default class AuthService {
  /**
   * Login user
   * @param {Credentials} credentials Username & Password
   * @returns {Promise<AxiosResponse<AuthenticationDto>>} User's data and token
   */
  static async login(credentials: SignInDto): Promise<AxiosResponse<AuthenticationDto>> {
    return api.post<AuthenticationDto>('/auth/sign-in', credentials);
  }

  /**
   * Create user
   * @param {Credentials} credentials Username & Password
   * @returns {Promise<AxiosResponse<AuthenticationDto>>} User's data and token
   */
  static async register(credentials: SignUpDto): Promise<AxiosResponse<AuthenticationDto>> {
    return api.post<AuthenticationDto>('/auth/sign-up', credentials);
  }
}
