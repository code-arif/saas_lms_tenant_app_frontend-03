import api from '@/services/api';
import type { LoginCredentials, LoginResponse, OtpVerify } from '../types/auth.types';
import type { ApiResponse } from '@/types/global.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return api.post('/auth/tenant_admin/login', credentials);
  },

  requestOtp: async (email: string): Promise<ApiResponse> => {
    return api.post('/auth/otp/request', { email });
  },

  verifyOtp: async (data: OtpVerify): Promise<LoginResponse> => {
    return api.post('/auth/otp/verify', data);
  },

  forgotPassword: async (email: string): Promise<ApiResponse> => {
    return api.post('/auth/forgot-password', { email });
  },

  getMe: async (): Promise<ApiResponse> => {
    return api.get('/auth/me');
  },

  logout: async (): Promise<ApiResponse> => {
    return api.post('/auth/logout');
  },
};