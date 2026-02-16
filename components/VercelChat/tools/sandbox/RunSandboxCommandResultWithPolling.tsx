"use client";

import { useTaskRunStatus } from "@/hooks/useTaskRunStatus";
import RunDetails from "@/components/TasksPage/Run/RunDetails";
import RunPageSkeleton from "@/components/TasksPage/Run/RunPageSkeleton";

export default function RunSandboxCommandResultWithPolling({ runId }: { runId: string }) {
  const { data, isLoading } = useTaskRunStatus(runId);

  if (isLoading || !data) {
    return <RunPageSkeleton />;
  }

  return <RunDetails runId={runId} data={data} />;
}
