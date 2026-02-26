"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, Clock, Ban, AlertTriangle } from "lucide-react";
import type { TaskRunStatus } from "@/lib/tasks/getTaskRunStatus";
import RunLogsList from "./RunLogsList";
import AccountIdDisplay from "@/components/ArtistSetting/AccountIdDisplay";

interface RunDetailsProps {
  runId: string;
  data: TaskRunStatus;
}

interface StatusConfigEntry {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const ERROR_STATUSES = new Set([
  "FAILED",
  "CRASHED",
  "SYSTEM_FAILURE",
  "TIMED_OUT",
  "EXPIRED",
  "INTERRUPTED",
]);

const STATUS_CONFIG: Record<string, StatusConfigEntry> = {
  COMPLETED: {
    icon: <CheckCircle2 className="size-5 text-green-500" />,
    label: "Completed",
    color: "text-green-500",
  },
  FAILED: {
    icon: <XCircle className="size-5 text-red-500" />,
    label: "Failed",
    color: "text-red-500",
  },
  CRASHED: {
    icon: <XCircle className="size-5 text-red-500" />,
    label: "Crashed",
    color: "text-red-500",
  },
  SYSTEM_FAILURE: {
    icon: <AlertTriangle className="size-5 text-red-500" />,
    label: "System Failure",
    color: "text-red-500",
  },
  TIMED_OUT: {
    icon: <XCircle className="size-5 text-red-500" />,
    label: "Timed Out",
    color: "text-red-500",
  },
  EXPIRED: {
    icon: <XCircle className="size-5 text-red-500" />,
    label: "Expired",
    color: "text-red-500",
  },
  INTERRUPTED: {
    icon: <XCircle className="size-5 text-red-500" />,
    label: "Interrupted",
    color: "text-red-500",
  },
  CANCELED: {
    icon: <Ban className="size-5 text-gray-500" />,
    label: "Canceled",
    color: "text-gray-500",
  },
  EXECUTING: {
    icon: <Loader2 className="size-5 animate-spin text-yellow-500" />,
    label: "Executing",
    color: "text-yellow-500",
  },
  DEQUEUED: {
    icon: <Loader2 className="size-5 animate-spin text-yellow-500" />,
    label: "Dequeued",
    color: "text-yellow-500",
  },
  QUEUED: {
    icon: <Clock className="size-5 text-gray-500" />,
    label: "Queued",
    color: "text-gray-500",
  },
  WAITING: {
    icon: <Clock className="size-5 text-gray-500" />,
    label: "Waiting",
    color: "text-gray-500",
  },
  DELAYED: {
    icon: <Clock className="size-5 text-gray-500" />,
    label: "Delayed",
    color: "text-gray-500",
  },
  RESCHEDULED: {
    icon: <Clock className="size-5 text-gray-500" />,
    label: "Rescheduled",
    color: "text-gray-500",
  },
  FROZEN: {
    icon: <Clock className="size-5 text-gray-500" />,
    label: "Frozen",
    color: "text-gray-500",
  },
  PENDING_VERSION: {
    icon: <Clock className="size-5 text-gray-500" />,
    label: "Pending Version",
    color: "text-gray-500",
  },
};

const FALLBACK_CONFIG: StatusConfigEntry = {
  icon: <Clock className="size-5 text-gray-500" />,
  label: "Unknown",
  color: "text-gray-500",
};

export default function RunDetails({ runId, data }: RunDetailsProps) {
  const config = STATUS_CONFIG[data.status] ?? FALLBACK_CONFIG;
  const logs = data.metadata?.logs ?? [];
  const currentStep = data.metadata?.currentStep;
  const pathname = usePathname();
  const isOnRunPage = pathname === `/tasks/${runId}`;

  return (
    <div className="mx-auto flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        {config.icon}
        <div>
          {isOnRunPage ? (
            <h1 className="text-lg font-semibold">{data.taskIdentifier}</h1>
          ) : (
            <Link href={`/tasks/${runId}`} target="_blank" className="text-lg font-semibold hover:underline">
              {data.taskIdentifier}
            </Link>
          )}
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

      {ERROR_STATUSES.has(data.status) && data.error && (
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
