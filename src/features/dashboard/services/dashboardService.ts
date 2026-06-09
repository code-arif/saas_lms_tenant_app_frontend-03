import api from '@/services/api';
import type { ApiResponse } from '@/types/global.types';

export interface DashboardStats {
  total_courses: number;
  total_students: number;
  total_instructors: number;
  total_revenue: number;
  monthly_revenue: Array<{ month: string; amount: number }>;
  recent_enrollments: Array<{
    student_name: string;
    course_title: string;
    enrolled_at: string;
  }>;
  subscription_status: string;
}

export const dashboardService = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return api.get('/tenant/stats');
  },
};