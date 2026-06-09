import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { instructorService } from '../services/instructorService';

export const useInstructors = (params?: any) => {
  const queryClient = useQueryClient();

  const instructorsQuery = useQuery({
    queryKey: ['instructors', params],
    queryFn: () => instructorService.getAll(params),
  });

  const inviteMutation = useMutation({
    mutationFn: (data: { email: string; name: string }) => instructorService.invite(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['instructors'] });
        toast.success('Instructor invited successfully');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to invite instructor');
    },
  });

  const removeMutation = useMutation({
    mutationFn: (uuid: string) => instructorService.remove(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
      toast.success('Instructor removed successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to remove instructor');
    },
  });

  return {
    instructors: instructorsQuery.data?.data || [],
    meta: instructorsQuery.data?.meta,
    isLoading: instructorsQuery.isLoading,
    isError: instructorsQuery.isError,
    inviteInstructor: inviteMutation.mutateAsync,
    removeInstructor: removeMutation.mutateAsync,
    isInviting: inviteMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
};