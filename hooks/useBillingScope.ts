import { useCallback } from "react";
import { useUserProvider } from "@/providers/UserProvder";
import { useOrganization } from "@/providers/OrganizationProvider";
import useAccountOrganizations from "@/hooks/useAccountOrganizations";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface BillingScope {
  /** The account the billing page reads and writes. */
  accountId: string | undefined;
  isOrg: boolean;
  /** True for the signed-in account itself: the only account self-serve checkout can upgrade. */
  isMine: boolean;
  /** True while the memberships that say whether the id is one of my orgs are still loading. */
  isResolving: boolean;
  /** "your account", the org's name, or "this account" for a forced id outside my orgs. */
  scopeLabel: string;
  /** True when the id came from the route (/billing/{accountId}); the org selector is ignored. */
  forced: boolean;
  /** True when a forced id is not a UUID; nothing is read. */
  invalid: boolean;
  switchToPersonal: () => void;
}

/**
 * Which account /billing shows. Precedence: the route's account id, else the
 * selected organization when it is one of mine, else me. The api decides
 * access; a forced id the caller may not read surfaces as a 403 on the reads.
 */
const useBillingScope = (forcedAccountId?: string): BillingScope => {
  const { userData } = useUserProvider();
  const { selectedOrgId, setSelectedOrgId } = useOrganization();
  const memberships = useAccountOrganizations();
  const switchToPersonal = useCallback(
    () => setSelectedOrgId(null),
    [setSelectedOrgId],
  );
  const me = userData?.account_id as string | undefined;
  const forced = forcedAccountId !== undefined;
  const invalid = forced && !UUID.test(forcedAccountId);
  const wanted = forced ? forcedAccountId : selectedOrgId;
  // Only the memberships can say whether an id is one of my orgs; the page waits rather than guessing.
  const isResolving =
    !!wanted && !invalid && !memberships.data && !memberships.isError;
  const org =
    isResolving || invalid
      ? undefined
      : memberships.data?.find((o) => o.organization_id === wanted);
  const accountId = invalid
    ? undefined
    : forced
      ? forcedAccountId
      : (org?.organization_id ?? (isResolving ? undefined : me));
  const isMine = !!accountId && accountId === me;
  const isOrg = !!org || (isResolving && !forced);
  const scopeLabel = org
    ? org.organization_name || "your organization"
    : isOrg
      ? "your organization"
      : forced && !isMine
        ? "this account"
        : "your account";
  return {
    accountId,
    isOrg,
    isMine,
    isResolving,
    scopeLabel,
    forced,
    invalid,
    switchToPersonal,
  };
};

export default useBillingScope;
