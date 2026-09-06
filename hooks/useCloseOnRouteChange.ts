import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Runs `close` after a client-side navigation, so an overlay that stays
 * mounted in the root layout (the mobile side menu) does not sit open over
 * the page a menu link just navigated to.
 */
export function useCloseOnRouteChange(close: () => void): void {
  const pathname = usePathname();
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current !== pathname) {
      previous.current = pathname;
      close();
    }
  }, [pathname, close]);
}
