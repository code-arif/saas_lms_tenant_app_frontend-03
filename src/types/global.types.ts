export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin' | 'tenant_admin';
  avatar?: string;
  bio?: string;
  tenant_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Tenant {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  domain?: string;
  logo?: string;
  favicon?: string;
  primary_color?: string;
  secondary_color?: string;
  timezone?: string;
  locale?: string;
  created_at: string;
  updated_at: string;
}