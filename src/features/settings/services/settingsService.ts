import api from '@/services/api';
import type { ApiResponse } from '@/types/global.types';

export interface TenantSettings {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  timezone: string;
  locale: string;
  domain?: string;
  domain_verified: boolean;
  logo?: string;
  favicon?: string;
  primary_color: string;
  secondary_color: string;
  created_at: string;
  updated_at: string;
}

export interface BrandingData {
  logo?: File | string;
  favicon?: File | string;
  primary_color: string;
  secondary_color: string;
}

export interface GeneralSettingsData {
  name: string;
  timezone: string;
  locale: string;
}

export type SettingsResponse = ApiResponse<TenantSettings>;

export const settingsService = {
  getSettings: async (): Promise<SettingsResponse> => {
    return api.get('/tenant/settings');
  },

  updateBranding: async (data: FormData): Promise<ApiResponse> => {
    return api.post('/tenant/branding', data);
  },

  updateSettings: async (data: GeneralSettingsData): Promise<ApiResponse> => {
    return api.put('/tenant/settings', data);
  },

  updateDomain: async (domain: string): Promise<ApiResponse> => {
    return api.put('/tenant/domain', { domain });
  },
};