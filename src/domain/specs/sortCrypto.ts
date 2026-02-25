import type { CryptoData, SortField, SortOrder } from "../types/crypto";

/**
 * Pure function: sort crypto list by field and order.
 */
export function sortCryptoList(
  list: CryptoData[],
  sortField: SortField,
  sortOrder: SortOrder
): CryptoData[] {
  if (!sortField) return list;

  return [...list].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (aVal === undefined || aVal === null) return 1;
    if (bVal === undefined || bVal === null) return -1;

    let comparison = 0;
    if (typeof aVal === "number" && typeof bVal === "number") {
      comparison = aVal - bVal;
    } else {
      comparison = String(aVal).localeCompare(String(bVal));
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });
}
