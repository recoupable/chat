"use client";

import RunDetails from "@/components/TasksPage/Run/RunDetails";
import type { TaskRunStatus } from "@/lib/tasks/getTaskRunStatus";

interface GetTaskRunStatusResultProps {
  result: TaskRunStatus & { runId?: string };
}

export default function GetTaskRunStatusResult({
  result,
}: GetTaskRunStatusResultProps) {
  const runId = result.runId ?? "unknown";

  return (
    <div className="max-w-2xl [&>div]:h-auto [&>div]:p-4">
      <RunDetails runId={runId} data={result} />
    </div>
  );
}
