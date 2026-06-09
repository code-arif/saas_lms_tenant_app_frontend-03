import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { subscriptionService } from '../services/subscriptionService';

export const useSubscription = () => {
  const queryClient = useQueryClient();

  const subscriptionQuery = useQuery({
    queryKey: ['subscription'],
    queryFn: () => subscriptionService.getSubscription(),
  });

  const plansQuery = useQuery({
    queryKey: ['plans'],
    queryFn: () => subscriptionService.getPlans(),
  });

  const invoicesQuery = useQuery({
    queryKey: ['invoices'],
    queryFn: () => subscriptionService.getInvoices(),
  });

  const subscribeMutation = useMutation({
    mutationFn: (planId: string) => subscriptionService.subscribe(planId),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['subscription'] });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
        toast.success('Successfully subscribed to plan');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to subscribe');
    },
  });

  const upgradeMutation = useMutation({
    mutationFn: (planId: string) => subscriptionService.upgrade(planId),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['subscription'] });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
        toast.success('Plan upgraded successfully');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upgrade plan');
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => subscriptionService.cancel(),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['subscription'] });
        toast.success('Subscription canceled');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to cancel subscription');
    },
  });

  return {
    subscription: subscriptionQuery.data?.data,
    plans: plansQuery.data?.data || [],
    invoices: invoicesQuery.data?.data || [],
    isLoading: subscriptionQuery.isLoading,
    subscribe: subscribeMutation.mutateAsync,
    upgrade: upgradeMutation.mutateAsync,
    cancel: cancelMutation.mutateAsync,
    isSubscribing: subscribeMutation.isPending,
    isUpgrading: upgradeMutation.isPending,
    isCanceling: cancelMutation.isPending,
  };
};