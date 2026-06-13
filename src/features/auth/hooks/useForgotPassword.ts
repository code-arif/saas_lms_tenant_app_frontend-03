import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService } from '../services/authService';

export const useForgotPassword = () => {
  const [sent, setSent] = useState(false);

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (response) => {
      if (response.success) {
        setSent(true);
        toast.success('If an account with that email exists, a password reset link has been sent.');
      } else {
        toast.error(response.message || 'Failed to send reset link');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    },
  });

  return {
    forgotPassword: forgotPasswordMutation.mutate,
    isLoading: forgotPasswordMutation.isPending,
    isSuccess: sent,
  };
};
