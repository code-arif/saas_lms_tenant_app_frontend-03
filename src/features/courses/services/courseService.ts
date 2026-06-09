import api from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/global.types';

export type CourseStatus = 'draft' | 'published' | 'archived';

export interface Course {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  description: string;
  short_description?: string;
  price: number;
  sale_price?: number;
  thumbnail?: string;
  status: CourseStatus;
  instructor_id: string;
  instructor?: {
    id: string;
    uuid: string;
    name: string;
    email: string;
  };
  students_count?: number;
  lessons_count?: number;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export type CourseResponse = ApiResponse<Course>;
export type CourseListResponse = PaginatedResponse<Course>;

export const courseService = {
  getAll: async (params?: any): Promise<CourseListResponse> => {
    return api.get('/courses', { params });
  },

  getOne: async (uuid: string): Promise<CourseResponse> => {
    return api.get(`/courses/${uuid}`);
  },
};