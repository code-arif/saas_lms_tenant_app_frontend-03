import PageTitle from '@/components/common/PageTitle';
import StudentTable from '@/features/students/components/StudentTable';
import { useStudents } from '@/features/students/hooks/useStudents';

const StudentsPage = () => {
  const { data: response, isLoading } = useStudents();

  return (
    <div className="space-y-8">
      <PageTitle 
        title="Students" 
        description="View and manage students enrolled in your courses."
      />
      <StudentTable students={response?.data || []} isLoading={isLoading} />
    </div>
  );
};

export default StudentsPage;