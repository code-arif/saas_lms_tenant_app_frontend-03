import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../services/analyticsService';

export const useCourseAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'courses'],
    queryFn: () => analyticsService.getCourseAnalytics(),
  });
};

export const useStudentAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'students'],
    queryFn: () => analyticsService.getStudentAnalytics(),
  });
};

export const useRevenueAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'revenue'],
    queryFn: () => analyticsService.getRevenueAnalytics(),
  });
};