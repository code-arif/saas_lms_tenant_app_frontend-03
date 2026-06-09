import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardService.getStats(),
  });
};

// Helper to generate enrollment data from API response or return empty
// In production, this should come from the backend API
const ENROLLMENT_DATA = [
  { date: 'Jun 1', count: 3 },
  { date: 'Jun 2', count: 5 },
  { date: 'Jun 3', count: 2 },
  { date: 'Jun 4', count: 8 },
  { date: 'Jun 5', count: 4 },
  { date: 'Jun 6', count: 7 },
  { date: 'Jun 7', count: 1 },
  { date: 'Jun 8', count: 6 },
  { date: 'Jun 9', count: 3 },
  { date: 'Jun 10', count: 9 },
];

export function generateEnrollmentData(): Array<{ date: string; count: number }> {
  return ENROLLMENT_DATA;
}