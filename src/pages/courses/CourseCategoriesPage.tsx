import { useState, useEffect, useRef } from 'react';
import { Plus, RotateCcw, Search, X } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCourseCategories } from '@/features/courses-categories/hooks/useCourseCategories';
import CourseCategoryTable from '@/features/courses-categories/components/CourseCategoryTable';
import CourseCategoryModal from '@/features/courses-categories/components/CourseCategoryModal';
import type { CourseCategory } from '@/features/courses-categories/services/courseCategoryService';

const DEBOUNCE_MS = 400;

const CourseCategoriesPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CourseCategory | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    categories,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
    meta,
    deleteCategory,
    toggleCategoryStatus,
    isDeleting,
    isToggling,
  } = useCourseCategories({
    page,
    per_page: 15,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(statusFilter !== null ? { is_active: statusFilter } : {}),
  });

  // Debounce search input — resets to page 1 on change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== debouncedSearch) {
        setDebouncedSearch(search);
        setPage(1);
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search, debouncedSearch]);

  // Reset to page 1 if current page exceeds the last available page
  useEffect(() => {
    if (meta && page > 1 && page > meta.last_page) {
      setPage(1);
    }
  }, [meta?.last_page, page]);

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="space-y-6">
      <PageTitle
        title="Course Categories"
        description="Organize your courses into categories for better navigation."
      >
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          <RotateCcw size={15} className={isRefetching ? 'animate-spin' : ''} />
          Refresh
        </Button>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus size={18} />
          Create Category
        </Button>
      </PageTitle>

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            ref={searchInputRef}
            placeholder="Search categories by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-9 h-10"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setDebouncedSearch('');
                setPage(1);
                searchInputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Status filter buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {[
            { label: 'All', value: null },
            { label: 'Active', value: true },
            { label: 'Inactive', value: false },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                setStatusFilter(option.value);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                statusFilter === option.value
                  ? option.value === true
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-500/40'
                    : option.value === false
                      ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 ring-1 ring-gray-500/40'
                      : 'bg-primary/10 text-primary ring-1 ring-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <CourseCategoryTable
        categories={categories}
        isLoading={isLoading}
        isFetching={isFetching}
        onEdit={handleEdit}
        onDelete={deleteCategory}
        onToggleStatus={toggleCategoryStatus}
        isDeleting={isDeleting}
        isToggling={isToggling}
        meta={meta}
        onPageChange={handlePageChange}
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
