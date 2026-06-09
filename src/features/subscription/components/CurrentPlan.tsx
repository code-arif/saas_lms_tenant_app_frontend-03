import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import type { Subscription } from '../services/subscriptionService';

interface CurrentPlanProps {
  subscription: Subscription;
}

const CurrentPlan = ({ subscription }: CurrentPlanProps) => {
  const statusColors: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
    active: 'success',
    trialing: 'warning',
    past_due: 'destructive',
    canceled: 'secondary',
    expired: 'secondary',
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Current Plan</CardTitle>
          <Badge variant={statusColors[subscription.status] || 'secondary'}>
            {subscription.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold">{subscription.plan.name}</h3>
          <p className="text-muted-foreground">
            {formatCurrency(subscription.plan.price)} / {subscription.plan.interval}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Billing period</span>
            <span>{formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}</span>
          </div>
          {subscription.trial_end && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Trial ends</span>
              <span>{formatDate(subscription.trial_end)}</span>
            </div>
          )}
          {subscription.cancel_at_period_end && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cancels at</span>
              <span className="text-destructive">{formatDate(subscription.current_period_end)}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Plan Features</p>
          <ul className="space-y-1">
            {subscription.plan.features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPlan;