/** `9900, "usd"` reads "$99.00"; a null or blank currency means USD. */
const formatCents = (amountCents: number, currency: string | null): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency?.trim() || "usd").toUpperCase(),
  }).format(amountCents / 100);

export default formatCents;
