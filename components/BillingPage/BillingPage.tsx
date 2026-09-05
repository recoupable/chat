"use client";

import PageContainer from "@/components/TasksPage/PageContainer";
import useBillingScope from "@/hooks/useBillingScope";
import useBillingReads from "@/hooks/useBillingReads";
import useBillingMutations from "@/hooks/useBillingMutations";
import autoTopUpPanelKey from "./autoTopUpPanelKey";
import BillingPageHeader from "./BillingPageHeader";
import BillingSkeleton from "./BillingSkeleton";
import PaymentMethodPanel from "./PaymentMethodPanel";
import PlanPanel from "./PlanPanel";
import AutoTopUpPanel from "./AutoTopUpPanel";
import PaymentsTable from "./PaymentsTable";
import UsageLoadMore from "@/components/UsagePage/UsageLoadMore";

/** Card, plan, auto top-up and payments for the signed-in account or the selected organization. */
const BillingPage = () => {
  const { accountId, isOrg, isResolving, scopeLabel, switchToPersonal } =
    useBillingScope();
  const {
    subscription,
    payments,
    autoTopUp,
    autoTopUpSettings,
    isLoading,
    failed,
    ready,
    card,
    rows,
    balanceUsd,
  } = useBillingReads(accountId);
  const actions = useBillingMutations(accountId);

  return (
    <PageContainer className="max-w-4xl py-8">
      <BillingPageHeader scope={scopeLabel} />
      {(isResolving || isLoading) && <BillingSkeleton />}
      {!isLoading && failed && (
        <p className="text-sm text-muted-foreground">
          Billing could not be loaded. Try again in a moment.
        </p>
      )}
      {ready && subscription.data && payments.data && (
        <>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <PaymentMethodPanel
              card={card}
              onConfigure={actions.configureCard}
              onRemove={() => actions.removeCard.mutate()}
              isBusy={actions.removeCard.isPending}
              onSwitchToPersonal={isOrg ? switchToPersonal : undefined}
            />
            <PlanPanel
              subscription={subscription.data}
              onUpgrade={actions.upgrade}
              onManage={actions.manageBilling}
              canUpgrade={!isOrg}
            />
          </div>
          <div className="mb-4">
            <AutoTopUpPanel
              key={autoTopUpPanelKey(accountId, card?.last4, autoTopUpSettings)}
              settings={autoTopUpSettings}
              hasCard={!!card && !autoTopUp.isError}
              balanceUsd={balanceUsd}
              onSave={(input) => actions.saveAutoTopUp.mutate(input)}
              isSaving={actions.saveAutoTopUp.isPending}
              error={
                actions.saveAutoTopUp.error?.message ??
                autoTopUp.data?.lastError ??
                null
              }
            />
          </div>
          <h2 className="mb-3 mt-6 font-heading text-base font-semibold tracking-tight">
            Payments
          </h2>
          <PaymentsTable payments={rows} />
          {payments.hasNextPage && (
            <UsageLoadMore
              onClick={() => payments.fetchNextPage()}
              isLoading={payments.isFetchingNextPage}
            />
          )}
        </>
      )}
    </PageContainer>
  );
};

export default BillingPage;
