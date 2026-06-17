import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export const useMagicLogin = () => {
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');

  const requestOtpMutation = useMutation({
    mutationFn: (emailValue: string) => authService.requestOtp(emailValue),
    onSuccess: (response) => {
      if (response.success) {
        setStep('otp');
        toast.success('OTP has been sent to your email');
      } else {
        toast.error(response.message || 'Failed to send OTP');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) => authService.verifyOtp({ email, otp }),
    onSuccess: (response) => {
      if (response.success) {
        const { token, user } = response.data;

        if (user.role !== 'tenant') {
          toast.error('Only tenant administrators can access this application');
          return;
        }

        loginStore(token, user);
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'Invalid OTP');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Invalid or expired OTP');
    },
  });

  const requestOtp = (emailValue: string) => {
    setEmail(emailValue);
    requestOtpMutation.mutate(emailValue);
  };

  const verifyOtp = (otp: string) => {
    verifyOtpMutation.mutate(otp);
  };

  const reset = () => {
    setStep('email');
    setEmail('');
  };

  return {
    step,
    email,
    requestOtp,
    verifyOtp,
    reset,
    isSendingOtp: requestOtpMutation.isPending,
    isVerifyingOtp: verifyOtpMutation.isPending,
  };
};
