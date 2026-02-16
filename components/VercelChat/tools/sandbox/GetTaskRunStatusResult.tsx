"use client";

import RunDetails from "@/components/TasksPage/Run/RunDetails";
import type { TaskRunStatus } from "@/lib/tasks/getTaskRunStatus";

interface GetTaskRunStatusResultProps {
  runId: string;
  result: TaskRunStatus;
}

export default function GetTaskRunStatusResult({
  runId,
  result,
}: GetTaskRunStatusResultProps) {
  return (
    <div className="max-w-2xl [&>div]:h-auto [&>div]:p-4">
      <RunDetails runId={runId} data={result} />
    </div>
  );
}
