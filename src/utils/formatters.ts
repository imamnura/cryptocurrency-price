/**
 * Format number for ID locale display.
 */
export function formatNumber(num: number | string): string {
  const numValue = typeof num === "string" ? parseFloat(num) : num;
  if (Number.isNaN(numValue)) return "-";
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numValue);
}

/**
 * CSS class for price change (positive/negative).
 */
export function getPriceChangeClass(change: number | undefined): string {
  if (change === undefined) return "";
  return change >= 0 ? "positive" : "negative";
}

/**
 * Format price change as percentage string.
 */
export function formatPriceChange(change: number | undefined): string {
  if (change === undefined || change === null) return "-";
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}
