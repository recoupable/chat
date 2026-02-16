"use client";

import RunSandboxCommandResultWithPolling from "./RunSandboxCommandResultWithPolling";

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
