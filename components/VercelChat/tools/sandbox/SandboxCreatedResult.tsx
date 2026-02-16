export default function SandboxCreatedResult({ sandboxId }: { sandboxId: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 max-w-2xl shadow-sm">
      <p className="text-sm text-muted-foreground">
        Sandbox <span className="font-mono">{sandboxId}</span> created (no command executed).
      </p>
    </div>
  );
}
