/** The one-line hint above the auto top-up fields; a null balance reads "unavailable", never $0.00. */
const describeAutoTopUpHint = (
  hasCard: boolean,
  enabled: boolean,
  balanceUsd: string | null,
): string => {
  if (!hasCard)
    return "Add a card first. Auto top-up charges the card on file when your balance runs low.";
  const balance = `Current balance ${balanceUsd ?? "unavailable"}.`;
  return enabled
    ? `Charges the card on file automatically. ${balance}`
    : `Off. Turn on to charge the card on file when your balance runs low. ${balance}`;
};

export default describeAutoTopUpHint;
