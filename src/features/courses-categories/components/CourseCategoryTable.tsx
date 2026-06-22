import { useState } from 'react';
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
          <span className="text-4xl">📂</span>
        </div>
        <h3 className="text-xl font-bold mb-2">No categories yet</h3>
        <p className="text-muted-foreground max-w-sm mb-2">
          Create your first category to start organizing your courses.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Category</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.uuid} className="group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-lg shrink-0">
                      {category.icon || '📁'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{category.name}</p>
                      {category.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {category.description}
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-40 group-hover:opacity-100 transition-opacity"
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
                </TableCell>
              </TableRow>
            ))}
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
              Courses in this category will not be deleted but will be uncategorized.
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
