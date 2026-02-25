export interface CryptoData {
  name: string;
  rank: number;
  websiteUrl: string;
  icon: string;
  symbol: string;
  marketCap: string;
  price: number;
  availableSupply: string;
  volume: number;
  priceChange1d?: number;
  priceChange1w?: number;
}

export type SortField = keyof CryptoData | null;
export type SortOrder = "asc" | "desc";

export interface ColumnFilters {
  rank: string;
  name: string;
  symbol: string;
  marketCap: string;
  price: string;
  availableSupply: string;
  volume: string;
  priceChange1d: string;
  priceChange1w: string;
}

export const DEFAULT_COLUMN_FILTERS: ColumnFilters = {
  rank: "",
  name: "",
  symbol: "",
  marketCap: "",
  price: "",
  availableSupply: "",
  volume: "",
  priceChange1d: "",
  priceChange1w: "",
};
