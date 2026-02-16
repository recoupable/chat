"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useCreateSandbox from "@/hooks/useCreateSandbox";

export default function SandboxCreateSection() {
  const [prompt, setPrompt] = useState("");
  const { createSandbox, isCreating } = useCreateSandbox();
  const { push } = useRouter();

  const handleCreateSandbox = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      const sandboxes = await createSandbox(prompt);
      const runId = sandboxes[0]?.runId;
      if (runId) {
        push(`/tasks/${runId}`);
      }
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <Textarea
        placeholder="Enter a prompt for Claude Code in the sandbox..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] resize-none"
        disabled={isCreating}
      />

      <Button
        onClick={handleCreateSandbox}
        disabled={isCreating || !prompt.trim()}
        className="w-full"
      >
        {isCreating ? (
          <>
            <Loader className="animate-spin" />
            Creating Sandbox...
          </>
        ) : (
          <>
            <Plus />
            Create Sandbox
          </>
        )}
      </Button>
    </div>
  );
}
