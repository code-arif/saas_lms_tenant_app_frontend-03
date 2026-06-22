import api from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/global.types';

export interface CourseCategory {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
  courses_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  icon?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {
  uuid: string;
}

export type CategoryResponse = ApiResponse<CourseCategory>;
export type CategoryListResponse = PaginatedResponse<CourseCategory>;

export const courseCategoryService = {
  getAll: async (params?: any): Promise<CategoryListResponse> => {
    return api.get('/course-categories', { params });
  },

  getOne: async (uuid: string): Promise<CategoryResponse> => {
    return api.get(`/course-categories/${uuid}`);
  },

  create: async (data: CreateCategoryPayload): Promise<CategoryResponse> => {
    return api.post('/course-categories', data);
  },

  update: async (uuid: string, data: Partial<CreateCategoryPayload>): Promise<CategoryResponse> => {
    return api.put(`/course-categories/${uuid}`, data);
  },

  delete: async (uuid: string): Promise<ApiResponse> => {
    return api.delete(`/course-categories/${uuid}`);
  },

  toggleStatus: async (uuid: string): Promise<CategoryResponse> => {
    return api.patch(`/course-categories/${uuid}/toggle-status`);
  },
};
