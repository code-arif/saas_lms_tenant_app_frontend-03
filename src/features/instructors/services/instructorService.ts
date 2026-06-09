import api from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/global.types';

export interface Instructor {
  id: string;
  uuid: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  courses_count?: number;
  students_count?: number;
  created_at: string;
  updated_at: string;
}

export type InstructorResponse = ApiResponse<Instructor>;
export type InstructorListResponse = PaginatedResponse<Instructor>;

export const instructorService = {
  getAll: async (params?: any): Promise<InstructorListResponse> => {
    return api.get('/instructors', { params });
  },

  getOne: async (uuid: string): Promise<InstructorResponse> => {
    return api.get(`/instructors/${uuid}`);
  },

  invite: async (data: { email: string; name: string }): Promise<InstructorResponse> => {
    return api.post('/instructors', data);
  },

  remove: async (uuid: string): Promise<ApiResponse> => {
    return api.delete(`/instructors/${uuid}`);
  },
};