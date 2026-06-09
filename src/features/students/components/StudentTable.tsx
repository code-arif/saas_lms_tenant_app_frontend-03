import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/Table';
import { formatDate } from '@/utils/formatDate';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import type { Student } from '../services/studentService';

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
}

const StudentTable = ({ students, isLoading }: StudentTableProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (students.length === 0) {
    return (
      <EmptyState
        title="No students yet"
        description="Students will appear here once they enroll in your courses."
        icon={<span className="text-4xl">🎓</span>}
      />
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Enrollments</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.uuid}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {student.avatar ? (
                      <img src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm font-medium">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{student.enrollments_count || 0}</TableCell>
              <TableCell>{student.completed_courses || 0}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(student.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;