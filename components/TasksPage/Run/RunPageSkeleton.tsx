export default function RunPageSkeleton() {
  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="size-5 animate-pulse rounded-full bg-muted" />
        <div>
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-1 h-4 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>

      <div className="rounded-md border bg-muted/30 px-4 py-2">
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-48 animate-pulse rounded bg-muted" />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="mb-2 h-3 w-10 animate-pulse rounded bg-muted" />
        <div className="space-y-2 rounded-md border bg-muted/30 p-3">
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="h-3 w-28 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
