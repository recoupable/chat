"use client";

import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface RunErrorDetailsProps {
  error: { message: string; name?: string; stackTrace?: string };
}

export default function RunErrorDetails({ error }: RunErrorDetailsProps) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950">
      {error.name && (
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-red-600 dark:text-red-400">
          {error.name}
        </p>
      )}
      <p className="text-sm font-medium text-red-800 dark:text-red-200">
        {error.message}
      </p>
      {error.stackTrace && (
        <Collapsible>
          <CollapsibleTrigger className="mt-2 flex items-center gap-1 text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">
            <ChevronDown className="size-3" />
            Stack Trace
          </CollapsibleTrigger>
          <CollapsibleContent>
            <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-words rounded bg-red-100 p-2 text-xs text-red-800 dark:bg-red-900/50 dark:text-red-200">
              {error.stackTrace}
            </pre>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
