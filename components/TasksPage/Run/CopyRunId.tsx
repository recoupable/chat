"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyRunIdProps {
  runId: string;
}

export default function CopyRunId({ runId }: CopyRunIdProps) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className="inline-flex cursor-pointer items-center gap-1 hover:text-foreground"
      onClick={() => {
        navigator.clipboard.writeText(runId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      Run: {runId.slice(0, 12)}...
    </button>
  );
}
