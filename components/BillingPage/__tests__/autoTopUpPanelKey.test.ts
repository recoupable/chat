import { describe, it, expect } from "vitest";
import autoTopUpPanelKey from "@/components/BillingPage/autoTopUpPanelKey";

const settings = {
  account_id: "acct-1",
  enabled: true,
  amountCents: 10000,
  thresholdCents: 100,
  lastRunAt: null,
  lastError: null,
};

describe("autoTopUpPanelKey", () => {
  it("changes with the account even when the card and flag match", () => {
    const a = autoTopUpPanelKey("acct-1", "4242", settings);
    const b = autoTopUpPanelKey("org-1", "4242", settings);
    expect(a).not.toBe(b);
  });

  it("changes when the saved amount or threshold changes", () => {
    const base = autoTopUpPanelKey("acct-1", "4242", settings);
    expect(
      autoTopUpPanelKey("acct-1", "4242", { ...settings, amountCents: 5000 }),
    ).not.toBe(base);
    expect(
      autoTopUpPanelKey("acct-1", "4242", { ...settings, thresholdCents: 500 }),
    ).not.toBe(base);
    expect(
      autoTopUpPanelKey("acct-1", "4242", { ...settings, enabled: false }),
    ).not.toBe(base);
    expect(autoTopUpPanelKey("acct-1", null, settings)).not.toBe(base);
  });

  it("is stable for the same inputs", () => {
    expect(autoTopUpPanelKey("acct-1", "4242", settings)).toBe(
      autoTopUpPanelKey("acct-1", "4242", { ...settings }),
    );
  });
});
