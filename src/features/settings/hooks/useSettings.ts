import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { settingsService } from '../services/settingsService';
import type { BrandingData, GeneralSettingsData } from '../services/settingsService';

export const useSettings = () => {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsService.getSettings(),
  });

  const updateBrandingMutation = useMutation({
    mutationFn: (data: FormData) => settingsService.updateBranding(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['settings'] });
        toast.success('Branding updated successfully');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update branding');
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (data: GeneralSettingsData) => settingsService.updateSettings(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['settings'] });
        toast.success('Settings updated successfully');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update settings');
    },
  });

  const updateDomainMutation = useMutation({
    mutationFn: (domain: string) => settingsService.updateDomain(domain),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['settings'] });
        toast.success('Domain updated successfully');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update domain');
    },
  });

  return {
    settings: settingsQuery.data?.data,
    isLoading: settingsQuery.isLoading,
    updateBranding: updateBrandingMutation.mutateAsync,
    updateSettings: updateSettingsMutation.mutateAsync,
    updateDomain: updateDomainMutation.mutateAsync,
    isUpdatingBranding: updateBrandingMutation.isPending,
    isUpdatingSettings: updateSettingsMutation.isPending,
    isUpdatingDomain: updateDomainMutation.isPending,
  };
};