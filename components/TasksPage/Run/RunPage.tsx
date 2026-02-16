"use client";

import { XCircle } from "lucide-react";
import { useTaskRunStatus } from "@/hooks/useTaskRunStatus";
import RunPageSkeleton from "./RunPageSkeleton";
import RunDetails from "./RunDetails";

interface RunPageProps {
  runId: string;
}

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

  return <RunDetails runId={runId} data={data} />;
}
