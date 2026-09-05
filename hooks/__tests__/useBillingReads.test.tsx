// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useBillingReads from "@/hooks/useBillingReads";

const settled = (data: unknown) => ({
  data,
  isLoading: false,
  error: null as Error | null,
  isError: false,
});
const reads = {
  paymentMethod: settled({ card: { last4: "4242" } }),
  subscription: settled({ status: "none" }),
  payments: settled({ pages: [{ payments: [] }] }),
  autoTopUp: settled(null),
  balance: settled(12400000),
};

vi.mock("@/hooks/usePaymentMethod", () => ({
  default: () => reads.paymentMethod,
}));
vi.mock("@/hooks/useSubscription", () => ({
  default: () => reads.subscription,
}));
vi.mock("@/hooks/usePayments", () => ({ default: () => reads.payments }));
vi.mock("@/hooks/useAutoTopUp", () => ({ default: () => reads.autoTopUp }));
vi.mock("@/hooks/useAccountBalance", () => ({ default: () => reads.balance }));

describe("useBillingReads", () => {
  beforeEach(() => {
    reads.balance = settled(12400000);
  });

  it("formats the balance as dollars once it has loaded", () => {
    const { result } = renderHook(() => useBillingReads("acct-1"));
    expect(result.current.ready).toBe(true);
    expect(result.current.balanceUsd).toBe("$12.40");
  });

  it("keeps the page loading while the balance is still loading", () => {
    reads.balance = {
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    };
    const { result } = renderHook(() => useBillingReads("acct-1"));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.ready).toBe(false);
  });

  it("reports no balance rather than $0.00 when the read failed", () => {
    reads.balance = {
      data: undefined,
      isLoading: false,
      error: new Error("x"),
      isError: true,
    };
    const { result } = renderHook(() => useBillingReads("acct-1"));
    expect(result.current.ready).toBe(true);
    expect(result.current.balanceUsd).toBeNull();
  });
});
