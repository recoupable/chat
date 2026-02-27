import { useState, useEffect } from "react";

const STORAGE_KEY = "sidebar-pinned";

/**
 * Persists the sidebar pinned state across page refreshes via localStorage.
 * Falls back to false if no stored value exists.
 */
const useSidebarPin = () => {
  const [isPinned, setIsPinned] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isPinned));
  }, [isPinned]);

  const togglePin = () => setIsPinned((prev) => !prev);

  return { isPinned, togglePin };
};

export default useSidebarPin;
