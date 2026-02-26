import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useUserProvider } from "@/providers/UserProvder";
import RecentChats from "../Sidebar/RecentChats";
import UserInfo from "../Sidebar/UserInfo";
import Logo from "../Logo";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";
import FanGroupNavItem from "./FanGroupNavItem";
import AgentsNavItem from "./AgentsNavItem";
import { RecentChatsSectionSkeleton } from "./RecentChatsSectionSkeleton";
import TasksNavItem from "./TasksNavItem";
import FilesNavItem from "./FilesNavItem";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { SquarePen, PanelLeftClose, PanelLeft } from "lucide-react";

interface MenuProps {
  isExpanded: boolean;
  isPinned?: boolean;
  onTogglePin?: () => void;
}

const Menu = ({ isExpanded, isPinned = false, onTogglePin }: MenuProps) => {
  const { push, prefetch } = useRouter();
  const pathname = usePathname();
  const { email, isPrepared } = useUserProvider();
  const isAgents = pathname.includes("/agents");
  const isSegments = pathname.includes("/segments");
  const isTasks = pathname.includes("/tasks");
  const isFiles = pathname.includes("/files");

  const goToItem = (link?: string) => {
    if (isPrepared()) {
      push(`/${link || uuidV4()}`);
    }
  };

  useEffect(() => {
    prefetch("/files");
    prefetch("/agents");
  }, [prefetch]);

  return (
    <div className="w-full h-screen pt-5 pb-2 px-2 hidden md:flex flex-col">
      {/* Logo row — logo left, toggle button right */}
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

      {/* Primary action — New Chat */}
      <div className="flex flex-col gap-1 w-full mt-4">
        <button
          type="button"
          className={cn(
            "inline-flex items-center h-10 rounded-lg whitespace-nowrap overflow-hidden transition-all duration-200 text-sm font-normal text-foreground hover:bg-muted",
            isExpanded ? "w-full justify-start gap-2 px-3" : "w-10 justify-center mx-auto gap-0"
          )}
          onClick={() => goToItem("chat")}
          aria-label={email ? "New Chat" : "Sign In"}
        >
          <div className="w-[21px] flex justify-center items-center shrink-0">
            <SquarePen className="size-[18px]" />
          </div>
          <span className={cn(
            "overflow-hidden transition-all duration-200",
            isExpanded ? "opacity-100 max-w-[150px]" : "opacity-0 max-w-0"
          )}>
            {email ? "New Chat" : "Sign In"}
          </span>
        </button>
      </div>

      {/* Secondary navigation — separated from primary action */}
      <div className="flex flex-col gap-1 w-full mt-3">
        <AgentsNavItem
          isActive={isAgents}
          isExpanded={isExpanded}
          onClick={() => goToItem("agents")}
        />
        <TasksNavItem
          isActive={isTasks}
          isExpanded={isExpanded}
          onClick={() => goToItem("tasks")}
        />
        <FanGroupNavItem
          isActive={isSegments}
          isExpanded={isExpanded}
          onClick={() => goToItem("segments")}
        />
        <FilesNavItem
          isActive={isFiles}
          isExpanded={isExpanded}
          onClick={() => goToItem("files")}
        />
      </div>

      {/* Divider between nav and chats */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
          >
            <div className="mx-3 mt-4 border-t border-border" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Chats — smoothly fade in/out */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex flex-col flex-grow min-h-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
          >
            {!email ? (
              <RecentChatsSectionSkeleton />
            ) : (
              <RecentChats toggleModal={() => {}} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile — always visible (avatar shows when collapsed) */}
      <div className="shrink-0 mt-auto px-0.5 pb-1">
        <UserInfo isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default Menu;
