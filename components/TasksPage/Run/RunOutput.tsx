interface RunOutputProps {
  output: unknown;
}

export default function RunOutput({ output }: RunOutputProps) {
  if (output === undefined || output === null) return null;

  const rendered =
    typeof output === "string" ? output : JSON.stringify(output, null, 2);

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Result
      </p>
      <pre className="max-h-60 overflow-y-auto whitespace-pre-wrap break-words rounded-md border bg-muted/30 p-3 text-sm">
        {rendered}
      </pre>
    </div>
  );
}
