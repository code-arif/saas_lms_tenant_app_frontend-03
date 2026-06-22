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
import { useCourseCategories } from '../hooks/useCourseCategories';
import type { CourseCategory } from '../services/courseCategoryService';
import { Loader2 } from 'lucide-react';

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  description: z.string().max(500, 'Description is too long').optional().or(z.literal('')),
  icon: z.string().max(10, 'Icon must be a single emoji').optional().or(z.literal('')),
  sort_order: z.coerce.number().int().min(0).optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CourseCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: CourseCategory | null;
}

const EMOJI_OPTIONS = [
  '📚', '📖', '🎓', '💻', '🎨', '🎵', '🧮', '🔬',
  '🌍', '🏥', '⚖️', '💰', '🎯', '🏆', '🌟', '💡',
  '📊', '🗣️', '🤝', '🧠', '🎮', '📝', '🔧', '🎬',
];

const CourseCategoryModal = ({ open, onOpenChange, category }: CourseCategoryModalProps) => {
  const isEditing = !!category;
  const { createCategory, updateCategory, isCreating, isUpdating } = useCourseCategories();
  const [selectedEmoji, setSelectedEmoji] = useState(category?.icon || '');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      icon: '',
      sort_order: 0,
    },
  });

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('description', category.description || '');
      setValue('icon', category.icon || '');
      setValue('sort_order', category.sort_order || 0);
      setSelectedEmoji(category.icon || '');
    } else {
      reset();
      setSelectedEmoji('');
    }
  }, [category, setValue, reset]);

  const isPending = isCreating || isUpdating;

  const onSubmit = async (data: CategoryFormValues) => {
    const payload = {
      ...data,
      icon: selectedEmoji || data.icon,
      description: data.description || undefined,
    };

    if (isEditing && category) {
      await updateCategory({ uuid: category.uuid, ...payload });
    } else {
      await createCategory(payload);
    }
    onOpenChange(false);
    reset();
    setSelectedEmoji('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
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
          {/* Icon / Emoji Picker */}
          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setSelectedEmoji(emoji);
                    setValue('icon', emoji);
                  }}
                  className={`h-10 w-10 rounded-lg border text-lg flex items-center justify-center transition-all hover:scale-110 hover:border-primary ${
                    selectedEmoji === emoji
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/30 scale-110'
                      : 'border-input hover:bg-muted'
                  }`}
                >
                  {emoji}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setSelectedEmoji('');
                  setValue('icon', '');
                }}
                className={`h-10 w-10 rounded-lg border text-xs flex items-center justify-center transition-all hover:border-destructive ${
                  !selectedEmoji
                    ? 'border-destructive bg-destructive/10 text-destructive'
                    : 'border-input text-muted-foreground hover:bg-muted'
                }`}
              >
                ✕
              </button>
            </div>
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

          {/* Sort Order */}
          <div className="space-y-2">
            <Label htmlFor="sort_order">Sort Order</Label>
            <Input
              id="sort_order"
              type="number"
              min={0}
              placeholder="0"
              {...register('sort_order')}
              className="w-24"
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first in the list
            </p>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                reset();
                setSelectedEmoji('');
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
