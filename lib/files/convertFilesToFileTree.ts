import type { FileNode } from "@/lib/sandboxes/parseFileTree";
import type { ListedFileRow } from "@/hooks/useFilesManager";

export function convertFilesToFileTree(
  files: ListedFileRow[],
  basePath: string
): FileNode[] {
  const root: FileNode[] = [];
  const folderMap = new Map<string, FileNode>();

  const normalizedBase = basePath.endsWith("/") ? basePath : basePath + "/";

  for (const file of files) {
    const relativePath = file.storage_key.startsWith(normalizedBase)
      ? file.storage_key.slice(normalizedBase.length)
      : file.storage_key;

    const parts = relativePath.replace(/\/$/, "").split("/");

    // Build intermediate folders as needed
    for (let i = 0; i < parts.length - 1; i++) {
      const folderPath = parts.slice(0, i + 1).join("/");
      if (!folderMap.has(folderPath)) {
        const folderNode: FileNode = {
          name: parts[i],
          path: folderPath,
          type: "folder",
          children: [],
        };
        folderMap.set(folderPath, folderNode);

        if (i === 0) {
          root.push(folderNode);
        } else {
          const parentPath = parts.slice(0, i).join("/");
          folderMap.get(parentPath)?.children?.push(folderNode);
        }
      }
    }

    // Create the leaf node
    const nodeName = parts[parts.length - 1];
    const nodePath = parts.join("/");

    if (file.is_directory) {
      if (!folderMap.has(nodePath)) {
        const folderNode: FileNode = {
          name: nodeName,
          path: nodePath,
          type: "folder",
          children: [],
        };
        folderMap.set(nodePath, folderNode);

        if (parts.length === 1) {
          root.push(folderNode);
        } else {
          const parentPath = parts.slice(0, -1).join("/");
          folderMap.get(parentPath)?.children?.push(folderNode);
        }
      }
    } else {
      const fileNode: FileNode = {
        name: nodeName,
        path: nodePath,
        type: "file",
      };

      if (parts.length === 1) {
        root.push(fileNode);
      } else {
        const parentPath = parts.slice(0, -1).join("/");
        folderMap.get(parentPath)?.children?.push(fileNode);
      }
    }
  }

  sortFileTree(root);
  return root;
}

function sortFileTree(nodes: FileNode[]) {
  nodes.sort((a, b) => {
    if (a.type === "folder" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "folder") return 1;
    return a.name.localeCompare(b.name);
  });
  for (const node of nodes) {
    if (node.children) {
      sortFileTree(node.children);
    }
  }
}
