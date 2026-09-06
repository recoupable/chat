/** Cents to a two-decimal dollars string for an input, or the fallback when unset. */
const toDollars = (cents: number | null, fallback: string): string =>
  cents === null ? fallback : (cents / 100).toFixed(2);

export default toDollars;
