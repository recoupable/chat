"use client";

import { useCallback, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { FileTree } from "@/components/ai-elements/file-tree";
import FileNodeComponent from "./FileNodeComponent";
import FilePreview from "@/components/Files/FilePreview";
import useSandboxes from "@/hooks/useSandboxes";
import { getFileContents } from "@/lib/sandboxes/getFileContents";
import { isTextFile } from "@/utils/isTextFile";
import { Loader } from "lucide-react";

export default function SandboxFileTree() {
  const { filetree, isLoading, error, refetch } = useSandboxes();
  const { getAccessToken } = usePrivy();

  const [selectedPath, setSelectedPath] = useState<string>();
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleSelect = useCallback(
    async (path: string) => {
      setSelectedPath(path);
      setFileContent(null);
      setFileError(null);
      setFileLoading(true);

      try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
          setFileError("Please sign in to view file contents");
          return;
        }
        const { content } = await getFileContents(accessToken, path);
        setFileContent(content);
      } catch (err) {
        setFileError(err instanceof Error ? err.message : "Failed to load file");
      } finally {
        setFileLoading(false);
      }
    },
    [getAccessToken],
  );

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader className="h-4 w-4 animate-spin" />
        <span>Loading files...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive">
        <p>Failed to load files</p>
        <button
          onClick={() => refetch()}
          className="text-sm underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (filetree.length === 0) {
    return (
      <div className="w-full max-w-md">
        <p className="text-sm text-muted-foreground">No files yet.</p>
      </div>
    );
  }

  const fileName = selectedPath?.split("/").pop() ?? "";

  return (
    <div className="flex w-full gap-4">
      <div className="w-full max-w-md shrink-0">
        <h2 className="mb-2 text-lg font-medium">Repository Files</h2>
        <FileTree selectedPath={selectedPath} onSelect={handleSelect}>
          {filetree.map((node) => (
            <FileNodeComponent key={node.path} node={node} />
          ))}
        </FileTree>
      </div>
      {selectedPath && (
        <div className="min-w-0 flex-1">
          <h2 className="mb-2 text-lg font-medium truncate">{fileName}</h2>
          <FilePreview
            content={fileContent}
            loading={fileLoading}
            error={fileError}
            isTextFile={isTextFile(fileName)}
            fileName={fileName}
          />
        </div>
      )}
    </div>
  );
}
