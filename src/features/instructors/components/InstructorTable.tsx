import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils/formatDate';
import { Trash2 } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import type { Instructor } from '../services/instructorService';

interface InstructorTableProps {
  instructors: Instructor[];
  isLoading: boolean;
  onRemove?: (uuid: string) => void;
  isRemoving?: boolean;
}

const InstructorTable = ({ instructors, isLoading, onRemove, isRemoving }: InstructorTableProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (instructors.length === 0) {
    return (
      <EmptyState
        title="No instructors yet"
        description="Invite instructors to create courses on your platform."
        icon={<span className="text-4xl">👨‍🏫</span>}
      />
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Instructor</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instructors.map((instructor) => (
            <TableRow key={instructor.uuid}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {instructor.avatar ? (
                      <img src={instructor.avatar} alt={instructor.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm font-medium">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{instructor.name}</p>
                    <p className="text-xs text-muted-foreground">{instructor.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{instructor.courses_count || 0}</TableCell>
              <TableCell>{instructor.students_count || 0}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(instructor.created_at)}</TableCell>
              <TableCell className="text-right">
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(instructor.uuid)}
                    disabled={isRemoving}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InstructorTable;