import useAccountQuery from "@/hooks/useAccountQuery";
import getAccountAutoTopUp from "@/lib/recoup/getAccountAutoTopUp";

/** The opt-in auto top-up settings for an account; one retry so a blip does not disable the panel. */
const useAutoTopUp = (accountId: string | undefined) =>
  useAccountQuery("autoTopUp", accountId, getAccountAutoTopUp, { retry: 1 });

export default useAutoTopUp;
