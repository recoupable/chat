export type SandboxStreamStatus = "booting" | "streaming" | "complete" | "error";

export interface SandboxStreamProgress {
  status: SandboxStreamStatus;
  sandboxId?: string;
  output: string;
  stderr?: string;
  exitCode?: number;
  created?: boolean;
}

export function isSandboxStreamProgress(
  result: unknown,
): result is SandboxStreamProgress {
  if (typeof result !== "object" || result === null) return false;
  const r = result as Record<string, unknown>;
  return (
    typeof r.status === "string" &&
    ["booting", "streaming", "complete", "error"].includes(r.status) &&
    typeof r.output === "string"
  );
}
