"use client";

import Link from "next/link";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import type { TaskRunStatus } from "@/lib/tasks/getTaskRunStatus";
import RunLogsList from "./RunLogsList";
import AccountIdDisplay from "@/components/ArtistSetting/AccountIdDisplay";

interface RunDetailsProps {
  runId: string;
  data: TaskRunStatus;
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

export default function RunDetails({ runId, data }: RunDetailsProps) {
  const config = STATUS_CONFIG[data.status];
  const logs = data.metadata?.logs ?? [];
  const currentStep = data.metadata?.currentStep;

  return (
    <div className="mx-auto flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        {config.icon}
        <div>
          <Link href={`/tasks/${runId}`} className="text-lg font-semibold hover:underline">
            {data.taskIdentifier}
          </Link>
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
        <AccountIdDisplay accountId={runId} label="Run" />
        {data.durationMs !== null && (
          <span>Duration: {(data.durationMs / 1000).toFixed(1)}s</span>
        )}
      </div>
    </div>
  );
}
