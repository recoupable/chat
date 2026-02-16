"use client";

import { useTaskRunStatus } from "@/hooks/useTaskRunStatus";
import RunDetails from "@/components/TasksPage/Run/RunDetails";
import RunPageSkeleton from "@/components/TasksPage/Run/RunPageSkeleton";

export default function RunSandboxCommandResultWithPolling({ runId }: { runId: string }) {
  const { data, isLoading } = useTaskRunStatus(runId);

  if (isLoading || !data) {
    return (
      <div className="max-w-2xl [&>div]:h-auto [&>div]:p-4">
        <RunPageSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-2xl [&>div]:h-auto [&>div]:p-4">
      <RunDetails runId={runId} data={data} />
    </div>
  );
}
