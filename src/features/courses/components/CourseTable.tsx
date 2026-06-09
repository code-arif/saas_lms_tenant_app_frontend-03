import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/Table';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import CourseStatusBadge from './CourseStatusBadge';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import type { Course } from '../services/courseService';

interface CourseTableProps {
  courses: Course[];
  isLoading: boolean;
}

const CourseTable = ({ courses, isLoading }: CourseTableProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (courses.length === 0) {
    return (
      <EmptyState
        title="No courses yet"
        description="Your courses will appear here once they are created."
        icon={<span className="text-4xl">📚</span>}
      />
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.uuid}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-lg">📚</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{course.short_description}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{course.instructor?.name || 'N/A'}</TableCell>
              <TableCell>{course.students_count || 0}</TableCell>
              <TableCell>{formatCurrency(course.price)}</TableCell>
              <TableCell><CourseStatusBadge status={course.status} /></TableCell>
              <TableCell className="text-muted-foreground">{formatDate(course.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;