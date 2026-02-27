"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Menu from "./Menu";
import AccountModal from "../AccountModal";
import OrgSettingsModal from "../Organization/OrgSettingsModal";
import CreateOrgModal from "../Organization/CreateOrgModal";
import useIsMobile from "@/hooks/useIsMobile";
import useSidebarPin from "@/hooks/useSidebarPin";

const Sidebar = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);
<<<<<<< HEAD
  const { isPinned, togglePin } = useSidebarPin();
=======
>>>>>>> origin/test
  const isMobile = useIsMobile();
  const animate = { width: menuExpanded ? 240 : 56 };
  const initial = { width: 56 };

  return (
    <motion.div
      className="bg-sidebar overflow-hidden"
      animate={animate}
      initial={initial}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setMenuExpanded(!isMobile)}
      onMouseLeave={() => setMenuExpanded(false)}
    >
<<<<<<< HEAD
      <Menu
        isExpanded={isOpen}
        isPinned={isPinned}
        onTogglePin={togglePin}
      />
=======
      <Menu isExpanded={menuExpanded} />
>>>>>>> origin/test
      <AccountModal />
      <OrgSettingsModal />
      <CreateOrgModal />
    </motion.div>
  );
};

export default Sidebar;
