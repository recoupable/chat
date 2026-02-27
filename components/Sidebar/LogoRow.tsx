import Link from "next/link";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../Logo";

export interface LogoRowProps {
  isExpanded: boolean;
  isPinned?: boolean;
  onTogglePin?: () => void;
}

const LogoRow = ({ isExpanded, isPinned = false, onTogglePin }: LogoRowProps) => (
  <div className={cn(
    "flex items-center shrink-0",
    isExpanded ? "justify-between px-3" : "justify-center"
  )}>
    <Link
      href="/"
      className="hover:opacity-80 transition-opacity duration-200"
      aria-label="Home"
    >
      <Logo isExpanded={isExpanded} />
    </Link>
    {/* Sidebar pin/collapse toggle — only visible when expanded */}
    {isExpanded && onTogglePin && (
      <button
        type="button"
        onClick={onTogglePin}
        className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label={isPinned ? "Collapse sidebar" : "Pin sidebar open"}
      >
        {isPinned ? (
          <PanelLeftClose className="size-4" />
        ) : (
          <PanelLeft className="size-4" />
        )}
      </button>
    )}
  </div>
);

export default LogoRow;
