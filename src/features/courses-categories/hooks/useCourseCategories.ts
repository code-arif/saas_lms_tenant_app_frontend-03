import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  courseCategoryService,
  type CreateCategoryPayload,
  type UpdateCategoryPayload,
  type CourseCategory,
} from '../services/courseCategoryService';

export const useCourseCategories = (params?: any) => {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ['course-categories', params],
    queryFn: () => courseCategoryService.getAll(params),
    placeholderData: keepPreviousData,
  });

  const treeQuery = useQuery({
    queryKey: ['course-categories', 'tree'],
    queryFn: () => courseCategoryService.getTree(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryPayload) => courseCategoryService.create(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['course-categories'] });
        toast.success('Category created successfully');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create category');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ uuid, ...data }: UpdateCategoryPayload) =>
      courseCategoryService.update(uuid, data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['course-categories'] });
        toast.success('Category updated successfully');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update category');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => courseCategoryService.delete(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-categories'] });
      toast.success('Category deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (uuid: string) => courseCategoryService.toggleStatus(uuid),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['course-categories'] });
        toast.success(`Category ${response.data.is_active ? 'activated' : 'deactivated'} successfully`);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to toggle category status');
    },
  });

  return {
    categories: categoriesQuery.data?.data || [],
    meta: categoriesQuery.data?.meta,
    categoryTree: treeQuery.data?.data || ([] as CourseCategory[]),
    isTreeLoading: treeQuery.isLoading,
    isLoading: categoriesQuery.isLoading,
    isFetching: categoriesQuery.isFetching,
    isRefetching: categoriesQuery.isRefetching,
    refetch: categoriesQuery.refetch,
    isError: categoriesQuery.isError,
    error: categoriesQuery.error,
    createCategory: createMutation.mutateAsync,
    updateCategory: updateMutation.mutateAsync,
    deleteCategory: deleteMutation.mutateAsync,
    toggleCategoryStatus: toggleStatusMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isToggling: toggleStatusMutation.isPending,
  };
};
