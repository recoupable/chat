import React, { useRef, useEffect } from "react";
import { Loader, CheckCircle, XCircle } from "lucide-react";
import type { SandboxStreamProgress } from "@/lib/sandboxes/sandboxStreamTypes";

interface PromptSandboxStreamProgressProps {
  progress: SandboxStreamProgress;
}

const PromptSandboxStreamProgress: React.FC<
  PromptSandboxStreamProgressProps
> = ({ progress }) => {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [progress.output]);

  if (progress.status === "booting") {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
        <Loader className="h-3 w-3 animate-spin" />
        <span>Starting sandbox...</span>
      </div>
    );
  }

  if (progress.status === "streaming") {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader className="h-3 w-3 animate-spin" />
          <span>Running in sandbox...</span>
        </div>
        <div className="border border-border dark:border-zinc-800 rounded-lg bg-zinc-950 overflow-hidden">
          <pre
            ref={preRef}
            className="p-3 text-xs text-zinc-300 font-mono whitespace-pre-wrap max-h-80 overflow-y-auto"
          >
            {progress.output || "Waiting for output..."}
          </pre>
        </div>
      </div>
    );
  }

  if (progress.status === "complete") {
    const hasError = progress.exitCode !== undefined && progress.exitCode !== 0;

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {hasError ? (
            <XCircle className="h-3 w-3 text-red-500" />
          ) : (
            <CheckCircle className="h-3 w-3 text-green-500" />
          )}
          <span>
            {hasError
              ? `Sandbox exited with code ${progress.exitCode}`
              : "Sandbox complete"}
          </span>
        </div>
        <div className="border border-border dark:border-zinc-800 rounded-lg bg-zinc-950 overflow-hidden">
          <pre className="p-3 text-xs text-zinc-300 font-mono whitespace-pre-wrap max-h-80 overflow-y-auto">
            {progress.output || "(no output)"}
          </pre>
        </div>
        {progress.stderr && (
          <div className="border border-red-800/30 rounded-lg bg-red-950/20 overflow-hidden">
            <pre className="p-3 text-xs text-red-400 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
              {progress.stderr}
            </pre>
          </div>
        )}
      </div>
    );
  }

  if (progress.status === "error") {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-red-500">
          <XCircle className="h-3 w-3" />
          <span>Sandbox error</span>
        </div>
        <div className="border border-red-800/30 rounded-lg bg-red-950/20 overflow-hidden">
          <pre className="p-3 text-xs text-red-400 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
            {progress.stderr || progress.output || "Unknown error"}
          </pre>
        </div>
      </div>
    );
  }

  return null;
};

export default PromptSandboxStreamProgress;
