import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { Check } from 'lucide-react';
import type { Plan } from '../services/subscriptionService';

interface PlanCardProps {
  plan: Plan;
  isCurrent?: boolean;
  onSelect?: (planId: string) => void;
  isLoading?: boolean;
}

const PlanCard = ({ plan, isCurrent, onSelect, isLoading }: PlanCardProps) => {
  return (
    <Card className={isCurrent ? 'border-primary ring-2 ring-primary/20' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{plan.name}</CardTitle>
          {isCurrent && <Badge>Current</Badge>}
        </div>
        <div className="mt-2">
          <span className="text-3xl font-bold">{formatCurrency(plan.price)}</span>
          <span className="text-muted-foreground"> / {plan.interval}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Students</span>
            <span className="font-medium">{plan.student_limit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Instructors</span>
            <span className="font-medium">{plan.instructor_limit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Courses</span>
            <span className="font-medium">{plan.course_limit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Storage</span>
            <span className="font-medium">{plan.storage_limit} GB</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isCurrent && onSelect && (
          <Button 
            className="w-full" 
            onClick={() => onSelect(plan.id)}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Select Plan'}
          </Button>
        )}
        {isCurrent && (
          <Button className="w-full" variant="outline" disabled>
            Current Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlanCard;