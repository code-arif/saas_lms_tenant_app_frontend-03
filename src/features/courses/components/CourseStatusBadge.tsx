import { Badge } from '@/components/ui/Badge';

interface CourseStatusBadgeProps {
  status: string;
}

const CourseStatusBadge = ({ status }: CourseStatusBadgeProps) => {
  const variants: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'outline'> = {
    published: 'success',
    draft: 'warning',
    archived: 'outline',
  };

  return (
    <Badge variant={variants[status] || 'secondary'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default CourseStatusBadge;