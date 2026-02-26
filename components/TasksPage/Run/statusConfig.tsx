import { Loader2, CheckCircle2, XCircle, Clock, Ban, AlertTriangle } from "lucide-react";
import type { StatusConfigEntry } from "./types";

export const ERROR_STATUSES = new Set([
  "FAILED",
  "CRASHED",
  "SYSTEM_FAILURE",
  "INTERRUPTED",
]);

export const STATUS_CONFIG: Record<string, StatusConfigEntry> = {
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
  REATTEMPTING: {
    icon: <Loader2 className="size-5 animate-spin text-yellow-500" />,
    label: "Reattempting",
    color: "text-yellow-500",
  },
  QUEUED: {
    icon: <Clock className="size-5 text-gray-500" />,
    label: "Queued",
    color: "text-gray-500",
  },
  DELAYED: {
    icon: <Clock className="size-5 text-gray-500" />,
    label: "Delayed",
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

export const FALLBACK_CONFIG: StatusConfigEntry = {
  icon: <Clock className="size-5 text-gray-500" />,
  label: "Unknown",
  color: "text-gray-500",
};
