import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <div className="grid grid-cols-1 gap-[30px]  py-4 md:grid-cols-2 lg:grid-cols-3 ">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-md border-0 bg-white p-8 shadow-lg dark:bg-secondary-dark-darkBlue"
        >
          <Skeleton className="h-4 w-[100px] rounded-full bg-slate-100" />
          <Skeleton className="h-4 w-[200px] rounded-full bg-slate-100" />
          <Skeleton className="h-4 w-[70px] rounded-full bg-slate-100" />

          <div className="mt-11">
            <Skeleton className="h-4 w-[70px] rounded-full bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
