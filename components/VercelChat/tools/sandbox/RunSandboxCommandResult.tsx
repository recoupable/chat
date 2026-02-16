"use client";

import { useTaskRunStatus } from "@/hooks/useTaskRunStatus";
import RunDetails from "@/components/TasksPage/Run/RunDetails";
import RunPageSkeleton from "@/components/TasksPage/Run/RunPageSkeleton";

interface RunSandboxCommandResultData {
  sandboxId: string;
  sandboxStatus: string;
  timeout: number;
  createdAt: string;
  runId?: string;
}

interface RunSandboxCommandResultProps {
  result: RunSandboxCommandResultData;
}

export default function RunSandboxCommandResult({
  result,
}: RunSandboxCommandResultProps) {
  const runId = result.runId;

  if (!runId) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 max-w-2xl shadow-sm">
        <p className="text-sm text-muted-foreground">
          Sandbox <span className="font-mono">{result.sandboxId}</span> created
          (no command executed).
        </p>
      </div>
    );
  }

  return <RunSandboxCommandResultWithPolling runId={runId} />;
}

function RunSandboxCommandResultWithPolling({ runId }: { runId: string }) {
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
