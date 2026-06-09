import { useState } from 'react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/AlertDialog';
import PageTitle from '@/components/common/PageTitle';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CurrentPlan from '@/features/subscription/components/CurrentPlan';
import PlanCard from '@/features/subscription/components/PlanCard';
import BillingHistory from '@/features/subscription/components/BillingHistory';
import { useSubscription } from '@/features/subscription/hooks/useSubscription';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

const SubscriptionPage = () => {
  const { 
    subscription, 
    plans, 
    invoices, 
    isLoading, 
    subscribe, 
    upgrade, 
    cancel,
    isSubscribing,
    isUpgrading,
    isCanceling
  } = useSubscription();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleSelectPlan = async (planId: string) => {
    if (subscription) {
      await upgrade(planId);
    } else {
      await subscribe(planId);
    }
  };

  const handleCancel = async () => {
    await cancel();
    setShowCancelDialog(false);
  };

  return (
    <div className="space-y-8">
      <PageTitle 
        title="Subscription" 
        description="Manage your subscription plan and billing."
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {subscription ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CurrentPlan subscription={subscription} />
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <a 
                      href="/subscription?tab=plans" 
                      className="block w-full text-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
                    >
                      Change Plan
                    </a>
                    <button
                      onClick={() => setShowCancelDialog(true)}
                      className="block w-full text-center px-4 py-2 rounded-md border text-destructive text-sm font-medium hover:bg-destructive/10"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No Active Subscription</h3>
              <p className="text-muted-foreground mb-6">Choose a plan to get started with your learning platform.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan.uuid}
                plan={plan}
                isCurrent={subscription?.plan.id === plan.id}
                onSelect={handleSelectPlan}
                isLoading={isSubscribing || isUpgrading}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <BillingHistory invoices={invoices} />
        </TabsContent>
      </Tabs>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your subscription? You will lose access to all premium features at the end of your current billing period.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancel} 
              className="bg-destructive text-destructive-foreground"
              disabled={isCanceling}
            >
              {isCanceling ? 'Canceling...' : 'Yes, Cancel'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubscriptionPage;