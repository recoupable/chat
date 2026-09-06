import { describe, it, expect, vi, beforeEach } from "vitest";
import updateClientAutoTopUp from "@/lib/billing/updateClientAutoTopUp";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("updateClientAutoTopUp", () => {
  beforeEach(() => vi.clearAllMocks());

  it("PUTs the three settings to /api/accounts/{id}/auto-top-up", async () => {
    const body = {
      account_id: "acct-1",
      enabled: true,
      amountCents: 10000,
      thresholdCents: 100,
      lastRunAt: null,
      lastError: null,
    };
    mockFetch.mockResolvedValue({ ok: true, json: async () => body });
    const result = await updateClientAutoTopUp("acct-1", "tok", {
      enabled: true,
      amountCents: 10000,
      thresholdCents: 100,
    });
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toMatch(/\/api\/accounts\/acct-1\/auto-top-up$/);
    expect(options.method).toBe("PUT");
    expect(options.headers.Authorization).toBe("Bearer tok");
    expect(JSON.parse(options.body)).toEqual({
      enabled: true,
      amountCents: 10000,
      thresholdCents: 100,
    });
    expect(result).toEqual(body);
  });

  it("throws the api error message on a 400", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        error: "Add a payment method before turning on auto top-up",
      }),
    });
    await expect(
      updateClientAutoTopUp("acct-1", "tok", {
        enabled: true,
        amountCents: 10000,
        thresholdCents: 100,
      }),
    ).rejects.toThrow("Add a payment method before turning on auto top-up");
  });

  it("reports the status when the failure body is not JSON or is null", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: async () => {
        throw new SyntaxError("bad");
      },
    });
    await expect(
      updateClientAutoTopUp("acct-1", "tok", {
        enabled: false,
        amountCents: 0,
        thresholdCents: 0,
      }),
    ).rejects.toThrow("HTTP 502");
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => null,
    });
    await expect(
      updateClientAutoTopUp("acct-1", "tok", {
        enabled: false,
        amountCents: 0,
        thresholdCents: 0,
      }),
    ).rejects.toThrow("HTTP 400");
  });

  it("rejects a 2xx error envelope instead of returning it as settings", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ status: "error", error: "Card declined" }),
    });
    await expect(
      updateClientAutoTopUp("acct-1", "tok", {
        enabled: true,
        amountCents: 10000,
        thresholdCents: 100,
      }),
    ).rejects.toThrow("Card declined");
  });
});
