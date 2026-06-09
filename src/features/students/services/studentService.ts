import api from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/global.types';

export interface Student {
  id: string;
  uuid: string;
  name: string;
  email: string;
  avatar?: string;
  enrollments_count?: number;
  completed_courses?: number;
  created_at: string;
  updated_at: string;
}

export type StudentResponse = ApiResponse<Student>;
export type StudentListResponse = PaginatedResponse<Student>;

export const studentService = {
  getAll: async (params?: any): Promise<StudentListResponse> => {
    return api.get('/students', { params });
  },

  getOne: async (uuid: string): Promise<StudentResponse> => {
    return api.get(`/students/${uuid}`);
  },
};