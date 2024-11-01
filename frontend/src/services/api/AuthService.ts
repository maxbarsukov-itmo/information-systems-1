import api from 'services/api/api';

import { AxiosResponse } from 'axios';
import { AuthenticationDto } from 'interfaces/dto/auth/AuthenticationDto';
import { SignInDto } from 'interfaces/dto/auth/SignInDto';
import { SignUpDto } from 'interfaces/dto/auth/SignUpDto';

export default class AuthService {
  /**
   * Get current user
   * @returns {Promise<AxiosResponse<AuthenticationDto>>} User's data and token
   * @throws 401 - Unauthorized
   * @throws 422 - Bad token user ID
   */
  static async me(): Promise<AxiosResponse<AuthenticationDto>> {
    return api.get<AuthenticationDto>('/auth');
  }

  /**
   * Login user
   * @param {Credentials} credentials Username & Password
   * @returns {Promise<AxiosResponse<AuthenticationDto>>} User's data and token
   * @throws 400 - Invalid credentials
   * @throws 403 - Cannot log in
   */
  static async login(credentials: SignInDto): Promise<AxiosResponse<AuthenticationDto>> {
    return api.post<AuthenticationDto>('/auth/sign-in', credentials);
  }

  /**
   * Create user
   * @param {Credentials} credentials Username & Password
   * @returns {Promise<AxiosResponse<AuthenticationDto>>} User's data and token
   * @throws 400 - Invalid credentials
   * @throws 409 - User.ts with this username already exists
   */
  static async register(credentials: SignUpDto): Promise<AxiosResponse<AuthenticationDto>> {
    return api.post<AuthenticationDto>('/auth/sign-up', credentials);
  }
}
