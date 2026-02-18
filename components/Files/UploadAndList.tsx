"use client";

import { useMemo } from "react";
import useFilesManager from "@/hooks/useFilesManager";
import { useUserProvider } from "@/providers/UserProvder";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { FileTree } from "@/components/ai-elements/file-tree";
import FileNodeComponent from "@/components/Sandboxes/FileNodeComponent";
import { convertFilesToFileTree } from "@/lib/files/convertFilesToFileTree";
import { Loader } from "lucide-react";

export default function UploadAndList() {
  const { userData } = useUserProvider();
  const { selectedArtist } = useArtistProvider();
  const base = `files/${userData?.account_id || ""}/${selectedArtist?.account_id || ""}/`;
  const { files, isLoading } = useFilesManager(base, true);

  const filetree = useMemo(
    () => convertFilesToFileTree(files, base),
    [files, base]
  );

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader className="h-4 w-4 animate-spin" />
        <span>Loading files...</span>
      </div>
    );
  }

  if (filetree.length === 0) {
    return (
      <div className="p-12 text-center text-sm text-muted-foreground">
        No files yet.
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-2 text-lg font-medium">Files</h2>
      <FileTree>
        {filetree.map((node) => (
          <FileNodeComponent key={node.path} node={node} />
        ))}
      </FileTree>
    </div>
  );
}
