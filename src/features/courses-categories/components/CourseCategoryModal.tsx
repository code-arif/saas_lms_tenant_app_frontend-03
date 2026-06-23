import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { useCourseCategories } from '../hooks/useCourseCategories';
import type { CourseCategory } from '../services/courseCategoryService';
import { Loader2 } from 'lucide-react';

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255, 'Name is too long'),
  slug: z
    .string()
    .max(255, 'Slug is too long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens (e.g. web-development)')
    .optional()
    .or(z.literal('')),
  description: z.string().max(2000, 'Description is too long').optional().or(z.literal('')),
  icon_url: z.string().max(2048, 'URL is too long').url('Must be a valid URL').optional().or(z.literal('')),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color (e.g. #4F46E5)')
    .optional()
    .or(z.literal('')),
  parent_id: z.string().optional().or(z.literal('')),
  sort_order: z.coerce.number().int().min(0).max(32767).optional(),
  is_active: z.boolean().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CourseCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: CourseCategory | null;
}

const PRESET_COLORS = [
  '#4F46E5', '#6366F1', '#3B82F6', '#0EA5E9', '#06B6D4',
  '#10B981', '#22C55E', '#84CC16', '#EAB308', '#F59E0B',
  '#F97316', '#EF4444', '#EC4899', '#D946EF', '#8B5CF6',
];

const CourseCategoryModal = ({ open, onOpenChange, category }: CourseCategoryModalProps) => {
  const isEditing = !!category;
  const { createCategory, updateCategory, isCreating, isUpdating, categoryTree } = useCourseCategories();
  const [selectedColor, setSelectedColor] = useState(category?.color || '');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      icon_url: '',
      color: '',
      parent_id: '',
      sort_order: 0,
      is_active: true,
    },
  });

  const watchName = watch('name');

  // Auto-generate slug from name on create
  useEffect(() => {
    if (!isEditing && watchName) {
      const generatedSlug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', generatedSlug);
    }
  }, [watchName, isEditing, setValue]);

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('slug', category.slug || '');
      setValue('description', category.description || '');
      setValue('icon_url', category.icon_url || '');
      setValue('color', category.color || '');
      setValue('parent_id', category.parent_id || '');
      setValue('sort_order', category.sort_order || 0);
      setValue('is_active', category.is_active);
      setSelectedColor(category.color || '');
    } else {
      reset();
      setSelectedColor('');
    }
  }, [category, setValue, reset]);

  const isPending = isCreating || isUpdating;

  // Filter out the current category and its children from parent options
  const availableParents = categoryTree.filter(
    (p) => p.uuid !== category?.uuid
  );

  const onSubmit = async (data: CategoryFormValues) => {
    const payload = {
      name: data.name,
      slug: data.slug || undefined,
      description: data.description || null,
      icon_url: data.icon_url || null,
      color: selectedColor || data.color || null,
      parent_id: data.parent_id || null,
      sort_order: data.sort_order || 0,
      is_active: data.is_active ?? true,
    };

    if (isEditing && category) {
      await updateCategory({ uuid: category.uuid, ...payload });
    } else {
      await createCategory(payload);
    }
    onOpenChange(false);
    reset();
    setSelectedColor('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? 'Edit Category' : 'Create Category'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the category details below.'
              : 'Add a new category to organize your courses.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Parent Category */}
          <div className="space-y-2">
            <Label htmlFor="parent_id">Parent Category</Label>
            <select
              id="parent_id"
              {...register('parent_id')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">— Top-level category —</option>
              {availableParents.map((parent) => (
                <option key={parent.uuid} value={parent.uuid}>
                  {parent.name}
                  {parent.children?.length ? ` (${parent.children.length} sub-categories)` : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Leave empty to make this a top-level category
            </p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g. Web Development"
              {...register('name')}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              placeholder="Auto-generated from name"
              {...register('slug')}
              className={errors.slug ? 'border-destructive' : ''}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              URL-friendly identifier. Auto-generated from name if left empty.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this category..."
              rows={3}
              {...register('description')}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Icon URL */}
          <div className="space-y-2">
            <Label htmlFor="icon_url">Icon URL</Label>
            <Input
              id="icon_url"
              placeholder="https://cdn.example.com/icons/code.svg"
              {...register('icon_url')}
              className={errors.icon_url ? 'border-destructive' : ''}
            />
            {errors.icon_url && (
              <p className="text-sm text-destructive">{errors.icon_url.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              URL to an icon or image representing this category
            </p>
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => {
                    setSelectedColor(hex);
                    setValue('color', hex);
                  }}
                  className={`h-8 w-8 rounded-full border-2 transition-all hover:scale-110 ${
                    selectedColor === hex
                      ? 'border-foreground scale-110 ring-2 ring-offset-2 ring-foreground/30'
                      : 'border-transparent hover:border-muted-foreground/30'
                  }`}
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  setSelectedColor('');
                  setValue('color', '');
                }}
                className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  !selectedColor
                    ? 'border-destructive bg-destructive/10 text-destructive'
                    : 'border-input text-muted-foreground hover:border-destructive hover:text-destructive'
                }`}
                title="Clear color"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Input
                id="color"
                placeholder="#4F46E5"
                maxLength={7}
                {...register('color')}
                className={`w-32 font-mono ${errors.color ? 'border-destructive' : ''}`}
              />
              {selectedColor && (
                <div
                  className="h-8 w-8 rounded border shrink-0"
                  style={{ backgroundColor: selectedColor }}
                />
              )}
            </div>
            {errors.color && (
              <p className="text-sm text-destructive">{errors.color.message}</p>
            )}
          </div>

          {/* Sort Order & Active Status */}
          <div className="flex items-end gap-4">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                min={0}
                max={32767}
                placeholder="0"
                {...register('sort_order')}
                className="w-24"
              />
              <p className="text-xs text-muted-foreground">
                Lower numbers appear first
              </p>
            </div>

            <div className="space-y-2 flex-1">
              <Label>Status</Label>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setValue('is_active', true)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    watch('is_active') !== false
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-2 ring-green-500/50'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Badge variant="success">Active</Badge>
                </button>
                <button
                  type="button"
                  onClick={() => setValue('is_active', false)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    watch('is_active') === false
                      ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 ring-2 ring-gray-500/50'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Badge variant="secondary">Inactive</Badge>
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          {(watch('icon_url') || selectedColor || watch('name')) && (
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preview</p>
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: selectedColor ? `${selectedColor}20` : undefined }}
                >
                  {watch('icon_url') ? (
                    <img
                      src={watch('icon_url')}
                      alt=""
                      className="h-6 w-6 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span style={{ color: selectedColor || undefined }}>📁</span>
                  )}
                </div>
                <div>
                  <p className="font-medium" style={{ color: selectedColor || undefined }}>
                    {watch('name') || 'Category Name'}
                  </p>
                  {watch('description') && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {watch('description')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                reset();
                setSelectedColor('');
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="gap-2 min-w-[120px]">
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending
                ? isEditing ? 'Updating...' : 'Creating...'
                : isEditing ? 'Save Changes' : 'Create Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCategoryModal;
