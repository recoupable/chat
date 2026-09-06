import type { AutoTopUpSettings } from "@/lib/recoup/getAccountAutoTopUp";

/**
 * The remount key for AutoTopUpPanel: its fields are seeded once from the saved settings, so the
 * panel remounts whenever the account, the card or any saved value changes.
 */
const autoTopUpPanelKey = (
  accountId: string | undefined,
  cardLast4: string | null | undefined,
  settings: Pick<
    AutoTopUpSettings,
    "enabled" | "amountCents" | "thresholdCents"
  >,
): string =>
  [
    accountId ?? "none",
    cardLast4 ?? "none",
    String(settings.enabled),
    settings.amountCents ?? "unset",
    settings.thresholdCents ?? "unset",
  ].join("-");

export default autoTopUpPanelKey;
