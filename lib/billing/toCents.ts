/** A dollars input string back to whole cents. */
const toCents = (dollars: string): number => Math.round(Number(dollars) * 100);

export default toCents;
