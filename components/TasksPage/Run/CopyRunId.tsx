"use client";

import { Copy, Check } from "lucide-react";
import { useCopy } from "@/hooks/useCopy";

interface CopyRunIdProps {
  runId: string;
}

export default function CopyRunId({ runId }: CopyRunIdProps) {
  const { copied, copy } = useCopy();

  return (
    <button
      className="inline-flex cursor-pointer items-center gap-1 hover:text-foreground"
      onClick={() => copy(runId)}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      Run: {runId.slice(0, 12)}...
    </button>
  );
}
