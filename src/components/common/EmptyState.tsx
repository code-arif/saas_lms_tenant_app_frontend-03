import { Link } from 'react-router-dom';
import { Plus, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ title, description, actionLabel, actionHref, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed rounded-xl bg-muted/20">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
        {icon || <Inbox size={40} className="text-muted-foreground" />}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-8">{description}</p>
      {actionLabel && actionHref && (
        <Button asChild>
          <Link to={actionHref} className="gap-2">
            <Plus size={18} />
            {actionLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default EmptyState;