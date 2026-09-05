"use client";

import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import createClientCheckoutSession from "@/lib/stripe/createClientCheckoutSession";
import type { UpgradePlan } from "@/lib/upgrade/types";

/** Opens Stripe Checkout for the plan a prompt's button names; a signed-out visitor gets the login modal, every failure a toast. */
export function useUpgradeCheckout() {
  const { getAccessToken, login } = usePrivy();

  const startCheckout = async (plan: UpgradePlan) => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        login();
        return;
      }
      const result = await createClientCheckoutSession(accessToken, { plan });
      if (result?.error) throw result.error;
    } catch {
      toast.error("Could not open checkout. Please try again.");
    }
  };

  return { startCheckout };
}
