import api from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/global.types';

export interface CategoryParent {
  uuid: string;
  name: string;
}

export interface CourseCategory {
  uuid: string;
  name: string;
  slug: string;
  description?: string | null;
  icon_url?: string | null;
  color?: string | null;
  sort_order: number;
  is_active: boolean;
  parent_id?: string | null;
  parent?: CategoryParent | null;
  children: CourseCategory[];
  courses_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryPayload {
  name: string;
  slug?: string;
  description?: string | null;
  icon_url?: string | null;
  color?: string | null;
  parent_id?: string | null;
  sort_order?: number;
  is_active?: boolean;
}

export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {
  uuid: string;
}

export type CategoryResponse = ApiResponse<CourseCategory>;
export type CategoryListResponse = PaginatedResponse<CourseCategory>;
export type CategoryTreeResponse = ApiResponse<CourseCategory[]>;

export const courseCategoryService = {
  getAll: async (params?: {
    per_page?: number;
    is_active?: boolean | string;
    parent_id?: string;
    search?: string;
    page?: number;
  }): Promise<CategoryListResponse> => {
    return api.get('/course-categories', { params });
  },

  getTree: async (): Promise<CategoryTreeResponse> => {
    return api.get('/course-categories/tree');
  },

  getOne: async (uuid: string): Promise<CategoryResponse> => {
    return api.get(`/course-categories/${uuid}`);
  },

  create: async (data: CreateCategoryPayload): Promise<CategoryResponse> => {
    return api.post('/course-categories/store', data);
  },

  update: async (uuid: string, data: Partial<CreateCategoryPayload>): Promise<CategoryResponse> => {
    return api.put(`/course-categories/${uuid}/update`, data);
  },

  delete: async (uuid: string): Promise<ApiResponse> => {
    return api.delete(`/course-categories/${uuid}/delete`);
  },

  toggleStatus: async (uuid: string): Promise<CategoryResponse> => {
    return api.patch(`/course-categories/${uuid}/toggle-active`);
  },
};
