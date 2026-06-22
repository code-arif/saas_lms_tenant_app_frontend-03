import { useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import { Button } from '@/components/ui/Button';
import { useCourseCategories } from '@/features/courses-categories/hooks/useCourseCategories';
import CourseCategoryTable from '@/features/courses-categories/components/CourseCategoryTable';
import CourseCategoryModal from '@/features/courses-categories/components/CourseCategoryModal';
import type { CourseCategory } from '@/features/courses-categories/services/courseCategoryService';

const CourseCategoriesPage = () => {
  const {
    categories,
    isLoading,
    deleteCategory,
    toggleCategoryStatus,
    isDeleting,
    isToggling,
  } = useCourseCategories();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CourseCategory | null>(null);

  const handleEdit = (category: CourseCategory) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setEditingCategory(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageTitle
        title="Course Categories"
        description="Organize your courses into categories for better navigation."
      >
        <Button variant="outline" size="sm" className="gap-2">
          <RotateCcw size={15} />
          Refresh
        </Button>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus size={18} />
          Create Category
        </Button>
      </PageTitle>

      <CourseCategoryTable
        categories={categories}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={deleteCategory}
        onToggleStatus={toggleCategoryStatus}
        isDeleting={isDeleting}
        isToggling={isToggling}
      />

      <CourseCategoryModal
        open={modalOpen}
        onOpenChange={handleModalClose}
        category={editingCategory}
      />
    </div>
  );
};

export default CourseCategoriesPage;
