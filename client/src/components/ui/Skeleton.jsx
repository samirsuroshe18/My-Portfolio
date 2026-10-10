import { cn } from '../../utils/classNames.js';

export function Skeleton({ className = '' }) {
  return <div aria-hidden="true" className={cn('skeleton-shimmer rounded-md', className)} />;
}

function Lines({ widths }) {
  return widths.map((width, index) => <Skeleton key={index} className={cn('h-3.5', width)} />);
}

export function HeroSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-x-[72px] gap-y-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
      <div className="flex min-w-0 flex-col gap-5">
        <Skeleton className="h-[clamp(52px,8vw,92px)] w-[86%]" />
        <Lines widths={['w-[70%]', 'w-full', 'w-[88%]']} />
        <div className="flex gap-3">
          <Skeleton className="h-12 w-36 rounded-[10px]" />
          <Skeleton className="h-12 w-36 rounded-[10px]" />
        </div>
      </div>
      <Skeleton className="aspect-[16/7] rounded-[18px] lg:aspect-[5/6]" />
    </div>
  );
}

export function FeaturedSkeleton({ count = 2 }) {
  return (
    <div aria-hidden="true" className="flex flex-col gap-14 sm:gap-[72px]">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="grid gap-x-14 gap-y-6 sm:grid-cols-[6fr_5fr] sm:items-center">
          <Skeleton className="aspect-[16/10] rounded-[14px]" />
          <div className="flex min-w-0 flex-col gap-3.5">
            <Skeleton className="h-3.5 w-[30%]" />
            <Skeleton className="h-10 w-56 max-w-full" />
            <Lines widths={['w-full', 'w-[94%]', 'w-[70%]', 'w-[45%]']} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RowsSkeleton({ rows = 3 }) {
  return (
    <div aria-hidden="true" className="border-b border-border">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="grid gap-x-6 gap-y-3 border-t border-border py-7 sm:grid-cols-[190px_minmax(0,1fr)]">
          <Skeleton className="h-3.5 w-28" />
          <div className="flex min-w-0 flex-col gap-3.5">
            <Skeleton className="h-5 w-[45%]" />
            <Lines widths={['w-full', 'w-[92%]', 'w-[60%]']} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChipsSkeleton({ rows = 4 }) {
  return (
    <div aria-hidden="true" className="border-b border-border">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="grid gap-x-6 gap-y-2 border-t border-border py-[18px] lg:grid-cols-[250px_minmax(0,1fr)] lg:items-center">
          <Skeleton className="h-3.5 w-36" />
          <div className="flex flex-wrap gap-2">
            {['w-24', 'w-20', 'w-28', 'w-20'].map((width, chip) => (
              <Skeleton key={chip} className={cn('h-9 rounded-full', width)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
