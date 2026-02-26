import Link from "next/link";
import { cn } from "@/lib/utils";
import type { TaskRunItem } from "@/lib/tasks/getTaskRuns";

const TASK_NAME_MAP: Record<string, string> = {
  "run-sandbox-command": "Sandbox Command",
  "customer-prompt-task": "Scheduled Prompt",
  "setup-sandbox": "Setup Sandbox",
  "send-pulses": "Send Pulses",
  "pro-artist-social-profiles-scrape": "Social Scrape",
};

function getTaskDisplayName(taskIdentifier: string): string {
  return TASK_NAME_MAP[taskIdentifier] ?? taskIdentifier;
}

const SUCCESS_STATUSES = new Set(["COMPLETED"]);
const ERROR_STATUSES = new Set([
  "FAILED",
  "CRASHED",
  "SYSTEM_FAILURE",
  "INTERRUPTED",
]);
const ACTIVE_STATUSES = new Set(["EXECUTING", "REATTEMPTING"]);

function getStatusColor(status: string): string {
  if (SUCCESS_STATUSES.has(status)) {
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  }
  if (ERROR_STATUSES.has(status)) {
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  }
  if (ACTIVE_STATUSES.has(status)) {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
  }
  return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
}

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: "Completed",
  FAILED: "Failed",
  CRASHED: "Crashed",
  CANCELED: "Canceled",
  SYSTEM_FAILURE: "System Failure",
  INTERRUPTED: "Interrupted",
  EXECUTING: "Executing",
  REATTEMPTING: "Reattempting",
  QUEUED: "Queued",
  DELAYED: "Delayed",
  FROZEN: "Frozen",
  PENDING_VERSION: "Pending Version",
};

function getStatusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

function formatDuration(durationMs: number | null): string {
  if (durationMs === null) return "";
  if (durationMs < 1000) return `${durationMs}ms`;
  const seconds = Math.round(durationMs / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

function formatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

interface RunCardProps {
  run: TaskRunItem;
}

const RunCard: React.FC<RunCardProps> = ({ run }) => {
  const duration = formatDuration(run.durationMs);

  return (
    <Link href={`/tasks/${run.id}`} className="group flex items-center justify-between py-4 px-4 hover:bg-muted dark:hover:bg-[#1a1a1a] transition-colors -mx-4 cursor-pointer">
      <div className="flex items-center space-x-4">
        <div>
          <h4 className="text-base font-medium text-foreground">
            {getTaskDisplayName(run.taskIdentifier)}
          </h4>
          <p className="text-sm text-muted-foreground">
            {formatTimestamp(run.createdAt)}
            {duration && ` \u00b7 ${duration}`}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <span
          className={cn(
            "px-2 py-1 text-xs font-medium rounded-full",
            getStatusColor(run.status),
          )}
        >
          {getStatusLabel(run.status)}
        </span>
      </div>
    </Link>
  );
};

export default RunCard;
