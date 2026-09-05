import usePaymentMethod from "@/hooks/usePaymentMethod";
import useSubscription from "@/hooks/useSubscription";
import usePayments from "@/hooks/usePayments";
import useAutoTopUp from "@/hooks/useAutoTopUp";
import useAccountBalance from "@/hooks/useAccountBalance";
import { formatCreditsAsUsd } from "@/lib/credits/formatCreditsAsUsd";
import isForbiddenError from "@/lib/usage/isForbiddenError";

const NO_AUTO_TOP_UP = {
  enabled: false,
  amountCents: null,
  thresholdCents: null,
  lastRunAt: null,
  lastError: null,
};

/** The five reads behind /billing for one account, with the page's loading and failure gates. */
const useBillingReads = (accountId: string | undefined) => {
  const paymentMethod = usePaymentMethod(accountId);
  const subscription = useSubscription(accountId);
  const payments = usePayments(accountId);
  const autoTopUp = useAutoTopUp(accountId);
  const balance = useAccountBalance(accountId);

  // Auto top-up and the balance are in the gate so the panel never shows Off or $0.00 while they load.
  const isLoading =
    paymentMethod.isLoading ||
    subscription.isLoading ||
    payments.isLoading ||
    autoTopUp.isLoading ||
    balance.isLoading;
  const failed = paymentMethod.error || subscription.error || payments.error;
  // The api enforces access: a 403 on the card or plan read means the caller may not see this account.
  const forbidden =
    isForbiddenError(paymentMethod.error) ||
    isForbiddenError(subscription.error);
  const ready =
    !isLoading &&
    !!paymentMethod.data &&
    !!subscription.data &&
    !!payments.data;
  const card = paymentMethod.data?.card ?? null;
  // Null when the balance read failed: the panel says so instead of claiming $0.00.
  const balanceUsd =
    balance.data === undefined ? null : formatCreditsAsUsd(balance.data);
  // Documented defaults when the account has never configured auto top-up (or the read failed).
  const autoTopUpSettings = autoTopUp.data ?? {
    account_id: accountId as string,
    ...NO_AUTO_TOP_UP,
  };

  return {
    paymentMethod,
    subscription,
    payments,
    autoTopUp,
    autoTopUpSettings,
    isLoading,
    failed,
    forbidden,
    ready,
    card,
    balanceUsd,
  };
};

export default useBillingReads;
