// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCloseOnRouteChange } from "@/hooks/useCloseOnRouteChange";

const pathname = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

describe("useCloseOnRouteChange", () => {
  it("calls close when the pathname changes, not on mount", () => {
    const close = vi.fn();
    const { rerender } = renderHook(() => useCloseOnRouteChange(close));
    expect(close).not.toHaveBeenCalled();
    pathname.current = "/billing";
    rerender();
    expect(close).toHaveBeenCalledTimes(1);
  });
});
