import { usePathname, useRouter } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import RecentChats from "../Sidebar/RecentChats";
import UserInfo from "../Sidebar/UserInfo";
import { v4 as uuidV4 } from "uuid";
import FanGroupNavItem from "./FanGroupNavItem";
import AgentsNavItem from "./AgentsNavItem";
import { RecentChatsSectionSkeleton } from "./RecentChatsSectionSkeleton";
import TasksNavItem from "./TasksNavItem";
import FilesNavItem from "./FilesNavItem";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoRow from "./LogoRow";
import NewChatButton from "./NewChatButton";
import Divider from "./Divider";

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
      <LogoRow isExpanded={isExpanded} isPinned={isPinned} onTogglePin={onTogglePin} />

      <NewChatButton isExpanded={isExpanded} email={email} onClick={() => goToItem("chat")} />

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

      <Divider isExpanded={isExpanded} />

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
