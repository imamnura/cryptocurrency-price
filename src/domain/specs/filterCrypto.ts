import type { CryptoData, ColumnFilters } from "../types/crypto";

function matchesSearch(item: CryptoData, search: string): boolean {
  return item.name.toLowerCase().includes(search.toLowerCase());
}

function matchesColumn<K extends keyof ColumnFilters>(
  item: CryptoData,
  column: K,
  value: string
): boolean {
  if (value === "") return true;
  const raw = item[column as keyof CryptoData];
  if (raw === undefined || raw === null) return false;
  return String(raw).toLowerCase().includes(value.toLowerCase());
}

function matchesColumnExact(item: CryptoData, column: keyof ColumnFilters, value: string): boolean {
  if (value === "") return true;
  const raw = item[column as keyof CryptoData];
  if (raw === undefined || raw === null) return false;
  return String(raw).includes(value);
}

/**
 * Pure function: filter crypto list by search term and column filters.
 */
export function filterCryptoList(
  list: CryptoData[],
  search: string,
  columnFilters: ColumnFilters
): CryptoData[] {
  return list.filter((item) => {
    if (!matchesSearch(item, search)) return false;
    if (!matchesColumnExact(item, "rank", columnFilters.rank)) return false;
    if (!matchesColumn(item, "name", columnFilters.name)) return false;
    if (!matchesColumn(item, "symbol", columnFilters.symbol)) return false;
    if (!matchesColumnExact(item, "marketCap", columnFilters.marketCap)) return false;
    if (!matchesColumnExact(item, "price", columnFilters.price)) return false;
    if (!matchesColumnExact(item, "availableSupply", columnFilters.availableSupply))
      return false;
    if (!matchesColumnExact(item, "volume", columnFilters.volume)) return false;
    if (
      !matchesColumnExact(
        item,
        "priceChange1d",
        columnFilters.priceChange1d
      )
    )
      return false;
    if (
      !matchesColumnExact(
        item,
        "priceChange1w",
        columnFilters.priceChange1w
      )
    )
      return false;
    return true;
  });
}
