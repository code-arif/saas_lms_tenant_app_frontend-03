import { useQuery } from '@tanstack/react-query';
import { studentService } from '../services/studentService';

export const useStudents = (params?: any) => {
  return useQuery({
    queryKey: ['students', params],
    queryFn: () => studentService.getAll(params),
  });
};