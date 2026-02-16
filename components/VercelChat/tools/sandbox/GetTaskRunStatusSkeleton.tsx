import RunPageSkeleton from "@/components/TasksPage/Run/RunPageSkeleton";

export default function GetTaskRunStatusSkeleton() {
  return (
    <div className="max-w-2xl [&>div]:h-auto [&>div]:p-4">
      <RunPageSkeleton />
    </div>
  );
}
