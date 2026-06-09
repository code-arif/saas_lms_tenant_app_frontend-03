import { useQuery } from '@tanstack/react-query';
import { courseService } from '../services/courseService';

export const useCourses = (params?: any) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => courseService.getAll(params),
  });
};