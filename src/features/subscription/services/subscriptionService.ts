import api from '@/services/api';
import type { ApiResponse } from '@/types/global.types';

export interface Subscription {
  id: string;
  uuid: string;
  plan: {
    id: string;
    name: string;
    price: number;
    interval: string;
    features: string[];
  };
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'expired';
  current_period_start: string;
  current_period_end: string;
  trial_end?: string;
  cancel_at_period_end: boolean;
}

export interface Plan {
  id: string;
  uuid: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  student_limit: number;
  instructor_limit: number;
  course_limit: number;
  storage_limit: number;
}

export interface Invoice {
  id: string;
  uuid: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  created_at: string;
  invoice_url?: string;
}

export interface SubscriptionUsage {
  students_used: number;
  students_limit: number;
  instructors_used: number;
  instructors_limit: number;
  courses_used: number;
  courses_limit: number;
  storage_used: number;
  storage_limit: number;
}

export type SubscriptionResponse = ApiResponse<Subscription>;
export type PlansResponse = ApiResponse<Plan[]>;
export type InvoicesResponse = ApiResponse<Invoice[]>;
export type UsageResponse = ApiResponse<SubscriptionUsage>;

export const subscriptionService = {
  getSubscription: async (): Promise<SubscriptionResponse> => {
    return api.get('/billing/subscription');
  },

  getPlans: async (): Promise<PlansResponse> => {
    return api.get('/billing/plans');
  },

  subscribe: async (planId: string): Promise<ApiResponse> => {
    return api.post('/billing/subscribe', { plan_id: planId });
  },

  upgrade: async (planId: string): Promise<ApiResponse> => {
    return api.post('/billing/upgrade', { plan_id: planId });
  },

  cancel: async (): Promise<ApiResponse> => {
    return api.post('/billing/cancel');
  },

  getInvoices: async (params?: any): Promise<InvoicesResponse> => {
    return api.get('/billing/invoices', { params });
  },
};