import PageTitle from '@/components/common/PageTitle';
import CourseTable from '@/features/courses/components/CourseTable';
import { useCourses } from '@/features/courses/hooks/useCourses';

const CoursesPage = () => {
  const { data: response, isLoading } = useCourses();

  return (
    <div className="space-y-8">
      <PageTitle 
        title="Courses" 
        description="View and manage all courses on your platform."
      />
      <CourseTable courses={response?.data || []} isLoading={isLoading} />
    </div>
  );
};

export default CoursesPage;