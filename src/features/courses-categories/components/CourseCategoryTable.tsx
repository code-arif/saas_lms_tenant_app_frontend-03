import { useState, Fragment } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import { formatDate } from '@/utils/formatDate';
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import type { CourseCategory } from '../services/courseCategoryService';
import CategoryCardSkeleton from './CategoryCardSkeleton';

interface CourseCategoryTableProps {
  categories: CourseCategory[];
  isLoading: boolean;
  onEdit: (category: CourseCategory) => void;
  onDelete: (uuid: string) => void;
  onToggleStatus: (uuid: string) => void;
  isDeleting?: boolean;
  isToggling?: boolean;
}

const defaultIcon = (color?: string | null) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || 'currentColor'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const CategoryIcon = ({ category }: { category: CourseCategory }) => {
  const [imgError, setImgError] = useState(false);

  if (category.icon_url && !imgError) {
    return (
      <div
        className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: category.color ? `${category.color}20` : undefined }}
      >
        <img
          src={category.icon_url}
          alt=""
          className="h-5 w-5 object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0 text-lg"
      style={{ backgroundColor: category.color ? `${category.color}20` : undefined }}
    >
      {defaultIcon(category.color)}
    </div>
  );
};

const CourseCategoryTable = ({
  categories,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
  isDeleting,
  isToggling,
}: CourseCategoryTableProps) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (isLoading) {
    return <CategoryCardSkeleton count={5} />;
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed rounded-xl bg-muted/20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
          {defaultIcon()}
        </div>
        <h3 className="text-xl font-bold mb-2">No categories yet</h3>
        <p className="text-muted-foreground max-w-sm mb-2">
          Create your first category to start organizing your courses.
        </p>
      </div>
    );
  }

  // Separate top-level and child categories
  const topLevel = categories.filter((c) => !c.parent_id);
  const childCategories = categories.filter((c) => c.parent_id);

  const renderCategoryRow = (category: CourseCategory, isChild = false) => (
    <TableRow key={category.uuid} className="group">
      <TableCell>
        <div className="flex items-center gap-3">
          {isChild && <ChevronRight size={14} className="text-muted-foreground shrink-0 ml-1" />}
          <CategoryIcon category={category} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium truncate">{category.name}</p>
              {category.color && (
                <div
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: category.color }}
                  title={category.color}
                />
              )}
            </div>
            {category.description && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {category.description}
              </p>
            )}
            {category.parent && (
              <p className="text-xs text-muted-foreground/60">
                Parent: {category.parent.name}
              </p>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <code className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
          {category.slug}
        </code>
      </TableCell>
      <TableCell>
        <span className="font-medium">{category.courses_count || 0}</span>
      </TableCell>
      <TableCell>
        <Badge
          variant={category.is_active ? 'success' : 'secondary'}
          className="capitalize cursor-pointer select-none"
          onClick={() => onToggleStatus(category.uuid)}
        >
          {category.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">
        {formatDate(category.created_at)}
      </TableCell>
      <TableCell className="text-right">
        {/* Desktop/tablet: inline action buttons */}
        <div className="hidden md:flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(category)}
            title="Edit"
          >
            <Pencil size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              category.is_active
                ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/30'
                : 'text-green-600 hover:text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30'
            }`}
            onClick={() => onToggleStatus(category.uuid)}
            title={category.is_active ? 'Deactivate' : 'Activate'}
          >
            {category.is_active ? <ToggleLeft size={15} /> : <ToggleRight size={15} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setDeleteConfirm(category.uuid)}
            title="Delete"
          >
            <Trash2 size={15} />
          </Button>
        </div>

        {/* Mobile: dropdown menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={() => onEdit(category)}>
                <Pencil size={15} className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(category.uuid)}>
                {category.is_active ? (
                  <>
                    <ToggleLeft size={15} className="mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <ToggleRight size={15} className="mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDeleteConfirm(category.uuid)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 size={15} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[320px]">Category</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right w-[80px] md:w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topLevel.map((category) => (
              <Fragment key={category.uuid}>
                {renderCategoryRow(category)}
                {childCategories
                  .filter((c) => c.parent_id === category.uuid)
                  .map((child) => renderCategoryRow(child, true))}
              </Fragment>
            ))}
            {/* Orphan children (shouldn't happen, but just in case) */}
            {topLevel.length === 0 &&
              childCategories.map((child) => renderCategoryRow(child, true))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteConfirm}
        onOpenChange={(open) => {
          if (!open) setDeleteConfirm(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
              Child categories will be detached (become top-level).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                if (deleteConfirm) {
                  onDelete(deleteConfirm);
                  setDeleteConfirm(null);
                }
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
            >
              {isDeleting && <Loader2 size={16} className="animate-spin" />}
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CourseCategoryTable;
