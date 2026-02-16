"use client";

import { useEffect, useRef } from "react";

interface RunLogsListProps {
  logs: string[];
}

export default function RunLogsList({ logs }: RunLogsListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs.length]);

  if (logs.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Waiting for logs...
      </p>
    );
  }

  return (
    <div className="max-h-80 overflow-y-auto rounded-md border bg-muted/30 p-3 font-mono text-sm">
      {logs.map((log, i) => (
        <p key={i} className="py-0.5 text-muted-foreground">
          {log}
        </p>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
