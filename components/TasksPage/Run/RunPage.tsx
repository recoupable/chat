"use client";

import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useTaskRunStatus } from "@/hooks/useTaskRunStatus";
import RunLogsList from "./RunLogsList";
import CopyRunId from "./CopyRunId";
import RunPageSkeleton from "./RunPageSkeleton";

interface RunPageProps {
  runId: string;
}

const STATUS_CONFIG = {
  pending: {
    icon: <Loader2 className="size-5 animate-spin text-blue-500" />,
    label: "Running",
    color: "text-blue-500",
  },
  complete: {
    icon: <CheckCircle2 className="size-5 text-green-500" />,
    label: "Complete",
    color: "text-green-500",
  },
  failed: {
    icon: <XCircle className="size-5 text-red-500" />,
    label: "Failed",
    color: "text-red-500",
  },
} as const;

export default function RunPage({ runId }: RunPageProps) {
  const { data, isLoading, error } = useTaskRunStatus(runId);

  if (isLoading || !data) {
    return <RunPageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <XCircle className="size-8 text-red-500" />
        <p className="mt-3 text-sm text-red-500">
          {error instanceof Error ? error.message : "Failed to load run status"}
        </p>
      </div>
    );
  }

  const config = STATUS_CONFIG[data.status];
  const logs = data.metadata?.logs ?? [];
  const currentStep = data.metadata?.currentStep;

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        {config.icon}
        <div>
          <h1 className="text-lg font-semibold">{data.taskIdentifier}</h1>
          <p className={`text-sm ${config.color}`}>{config.label}</p>
        </div>
      </div>

      {currentStep && (
        <div className="rounded-md border bg-muted/30 px-4 py-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Current Step
          </p>
          <p className="text-sm font-medium">{currentStep}</p>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Logs
        </p>
        <RunLogsList logs={logs as string[]} />
      </div>

      {data.status === "failed" && data.error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            {data.error}
          </p>
        </div>
      )}

      <div className="flex gap-4 text-xs text-muted-foreground">
        <CopyRunId runId={runId} />
        {data.durationMs !== null && (
          <span>Duration: {(data.durationMs / 1000).toFixed(1)}s</span>
        )}
      </div>
    </div>
  );
}
