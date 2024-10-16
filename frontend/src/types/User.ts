export enum UserRole {
  UNREGISTERED = 'UNREGISTERED',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;
  username: string;
  role: UserRole;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
}

