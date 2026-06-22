import { cn } from '@/utils/cn';

interface CategoryCardSkeletonProps {
  count?: number;
  grid?: boolean;
}

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'animate-pulse rounded-md bg-muted/60 relative overflow-hidden',
      'after:absolute after:inset-0 after:-translate-x-full',
      'after:animate-[shimmer_1.5s_infinite]',
      'after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent',
      className
    )}
  />
);

const CategoryCardSkeleton = ({ count = 6, grid = false }: CategoryCardSkeletonProps) => {
  if (grid) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <SkeletonBlock className="h-12 w-12 rounded-lg" />
                <div className="space-y-2">
                  <SkeletonBlock className="h-4 w-28" />
                  <SkeletonBlock className="h-3 w-20" />
                </div>
              </div>
              <SkeletonBlock className="h-6 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-3/4" />
            </div>
            <div className="flex items-center gap-4 pt-2 border-t">
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="border-b p-4">
        <div className="flex items-center gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBlock
              key={i}
              className={cn(
                'h-4',
                i === 0 ? 'w-48' : i === 1 ? 'w-32' : i === 2 ? 'w-20' : i === 3 ? 'w-24' : 'w-28'
              )}
            />
          ))}
          <SkeletonBlock className="h-4 w-16 ml-auto" />
        </div>
      </div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn('border-b p-4', i === count - 1 && 'border-b-0')}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <SkeletonBlock className="h-9 w-9 rounded-lg" />
              <div className="space-y-1.5">
                <SkeletonBlock className="h-3.5 w-36" />
                <SkeletonBlock className="h-3 w-24" />
              </div>
            </div>
            <SkeletonBlock className="h-3.5 w-24" />
            <SkeletonBlock className="h-3.5 w-16" />
            <SkeletonBlock className="h-6 w-16 rounded-full" />
            <SkeletonBlock className="h-3.5 w-24" />
            <div className="flex gap-1 ml-auto">
              <SkeletonBlock className="h-8 w-8 rounded-md" />
              <SkeletonBlock className="h-8 w-8 rounded-md" />
              <SkeletonBlock className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCardSkeleton;
