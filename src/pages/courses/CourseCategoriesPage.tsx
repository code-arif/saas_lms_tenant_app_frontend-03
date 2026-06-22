import { FolderOpen } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import EmptyState from '@/components/common/EmptyState';

const CourseCategoriesPage = () => {
  return (
    <div className="space-y-6">
      <PageTitle
        title="Course Categories"
        subtitle="Organize your courses into categories"
      />
      <EmptyState
        icon={FolderOpen}
        title="No categories yet"
        description="Course categories help you organize and structure your course catalog."
        action={{
          label: 'Create Category',
          onClick: () => {},
        }}
      />
    </div>
  );
};

export default CourseCategoriesPage;
