export interface Sandbox {
  sandboxId: string;
  sandboxStatus: "pending" | "running" | "stopping" | "stopped" | "failed";
  timeout: number;
  createdAt: string;
  runId?: string;
}
