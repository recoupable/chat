interface RunPageProps {
  runId: string;
}

export default function RunPage({ runId }: RunPageProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold">{runId}</h1>
    </div>
  );
}
