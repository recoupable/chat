interface PageProps {
  params: Promise<{ runId: string }>;
}

export default async function TaskRunPage({ params }: PageProps) {
  const { runId } = await params;

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold">{runId}</h1>
    </div>
  );
}
