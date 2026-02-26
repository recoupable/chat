import { usePaymentProvider } from "@/providers/PaymentProvider";

/** Compact inline credits display that lives inside the identity block */
const CreditsUsage = () => {
  const { totalCredits, credits, isLoading } = usePaymentProvider();

  return (
    <p className="text-[11px] text-muted-foreground">
      {isLoading ? (
        <span className="inline-block h-3 w-16 bg-muted animate-pulse rounded" />
      ) : (
        `${credits.toLocaleString()} / ${totalCredits.toLocaleString()} credits`
      )}
    </p>
  );
};

export default CreditsUsage;
