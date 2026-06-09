import api from '@/services/api';
import type { ApiResponse } from '@/types/global.types';

export interface CourseAnalyticsData {
  total_courses: number;
  published_courses: number;
  draft_courses: number;
  avg_rating: number;
  total_enrollments: number;
  courses_by_status: Array<{ status: string; count: number }>;
  top_courses: Array<{
    title: string;
    students: number;
    rating: number;
    revenue: number;
  }>;
}

export interface StudentAnalyticsData {
  total_students: number;
  active_students: number;
  new_students_this_month: number;
  completion_rate: number;
  students_by_country: Array<{ country: string; count: number }>;
  enrollment_trend: Array<{ date: string; count: number }>;
}

export interface RevenueAnalyticsData {
  total_revenue: number;
  mrr: number;
  arr: number;
  churn_rate: number;
  revenue_by_month: Array<{ month: string; amount: number }>;
  revenue_by_course: Array<{ course: string; revenue: number }>;
}

export type CourseAnalyticsResponse = ApiResponse<CourseAnalyticsData>;
export type StudentAnalyticsResponse = ApiResponse<StudentAnalyticsData>;
export type RevenueAnalyticsResponse = ApiResponse<RevenueAnalyticsData>;

export const analyticsService = {
  getCourseAnalytics: async (): Promise<CourseAnalyticsResponse> => {
    return api.get('/analytics/courses');
  },

  getStudentAnalytics: async (): Promise<StudentAnalyticsResponse> => {
    return api.get('/analytics/students');
  },

  getRevenueAnalytics: async (): Promise<RevenueAnalyticsResponse> => {
    return api.get('/analytics/revenue');
  },
};