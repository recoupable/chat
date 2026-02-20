import { useCallback, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { getFileContents } from "@/lib/sandboxes/getFileContents";

interface UseSandboxFileContentReturn {
  selectedPath: string | undefined;
  content: string | null;
  loading: boolean;
  error: string | null;
  select: (path: string) => void;
}

export default function useSandboxFileContent(): UseSandboxFileContentReturn {
  const { getAccessToken } = usePrivy();

  const [selectedPath, setSelectedPath] = useState<string>();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFile = useCallback(
    async (path: string) => {
      setSelectedPath(path);
      setContent(null);
      setError(null);
      setLoading(true);

      try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
          setError("Please sign in to view file contents");
          return;
        }
        const result = await getFileContents(accessToken, path);
        setContent(result.content);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load file");
      } finally {
        setLoading(false);
      }
    },
    [getAccessToken],
  );

  const select = useCallback(
    (path: string) => {
      void fetchFile(path);
    },
    [fetchFile],
  );

  return { selectedPath, content, loading, error, select };
}
