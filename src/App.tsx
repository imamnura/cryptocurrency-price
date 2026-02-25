import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import type { CryptoData, SortField, SortOrder, ColumnFilters } from "./domain/types/crypto";
import { DEFAULT_COLUMN_FILTERS } from "./domain/types/crypto";
import { filterCryptoList } from "./domain/specs/filterCrypto";
import { sortCryptoList } from "./domain/specs/sortCrypto";
import { formatNumber, getPriceChangeClass, formatPriceChange } from "./utils/formatters";

function App() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState<CryptoData[]>([]);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>(DEFAULT_COLUMN_FILTERS);
  const [loading, setLoading] = useState(true);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          tableContainerRef.current;

        // Add 'scrolled' class when scrolled right
        if (scrollLeft > 10) {
          tableContainerRef.current.classList.add("scrolled");
        } else {
          tableContainerRef.current.classList.remove("scrolled");
        }

        // Add 'scrolled-end' class when reached the end
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          tableContainerRef.current.classList.add("scrolled-end");
        } else {
          tableContainerRef.current.classList.remove("scrolled-end");
        }
      }
    };

    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://openapiv1.coinstats.app/coins?currency=IDR", {
        headers: {
          accept: "application/json",
          "X-API-KEY": import.meta.env.VITE_XAIKEY || "",
        },
      })
      .then((res) => {
        setCurrency(res?.data?.result || []);
        setLoading(false);
      })
      .catch((error: Error) => {
        console.error(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleColumnFilterChange = (
    column: keyof ColumnFilters,
    value: string
  ) => {
    setColumnFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    const filtered = filterCryptoList(currency, search, columnFilters);
    return sortCryptoList(filtered, sortField, sortOrder);
  }, [currency, search, sortField, sortOrder, columnFilters]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return " ⇅";
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">💰 Cryptocurrency Price Tracker</h1>
        <p className="subtitle">
          Monitor harga mata uang kripto terpopuler secara real-time
        </p>
      </header>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Cari cryptocurrency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Memuat data...</p>
        </div>
      ) : (
        <div className="table-container" ref={tableContainerRef}>
          <table className="crypto-table">
            <thead>
              <tr className="header-row">
                <th onClick={() => handleSort("rank")} className="sortable">
                  Rank{getSortIcon("rank")}
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="sortable name-column"
                >
                  Nama{getSortIcon("name")}
                </th>
                <th onClick={() => handleSort("symbol")} className="sortable">
                  Symbol{getSortIcon("symbol")}
                </th>
                <th
                  onClick={() => handleSort("marketCap")}
                  className="sortable"
                >
                  Market Cap{getSortIcon("marketCap")}
                </th>
                <th onClick={() => handleSort("price")} className="sortable">
                  Harga (IDR){getSortIcon("price")}
                </th>
                <th
                  onClick={() => handleSort("priceChange1d")}
                  className="sortable"
                >
                  Prb 24J{getSortIcon("priceChange1d")}
                </th>
                <th
                  onClick={() => handleSort("priceChange1w")}
                  className="sortable"
                >
                  Prb 7H{getSortIcon("priceChange1w")}
                </th>
                <th
                  onClick={() => handleSort("availableSupply")}
                  className="sortable"
                >
                  Available Supply{getSortIcon("availableSupply")}
                </th>
                <th onClick={() => handleSort("volume")} className="sortable">
                  Volume (24hr){getSortIcon("volume")}
                </th>
              </tr>
              <tr className="filter-row">
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter..."
                    value={columnFilters.rank}
                    onChange={(e) =>
                      handleColumnFilterChange("rank", e.target.value)
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter..."
                    value={columnFilters.name}
                    onChange={(e) =>
                      handleColumnFilterChange("name", e.target.value)
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter..."
                    value={columnFilters.symbol}
                    onChange={(e) =>
                      handleColumnFilterChange("symbol", e.target.value)
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter..."
                    value={columnFilters.marketCap}
                    onChange={(e) =>
                      handleColumnFilterChange("marketCap", e.target.value)
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter..."
                    value={columnFilters.price}
                    onChange={(e) =>
                      handleColumnFilterChange("price", e.target.value)
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter..."
                    value={columnFilters.priceChange1d}
                    onChange={(e) =>
                      handleColumnFilterChange("priceChange1d", e.target.value)
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter..."
                    value={columnFilters.priceChange1w}
                    onChange={(e) =>
                      handleColumnFilterChange("priceChange1w", e.target.value)
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter..."
                    value={columnFilters.availableSupply}
                    onChange={(e) =>
                      handleColumnFilterChange(
                        "availableSupply",
                        e.target.value
                      )
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter..."
                    value={columnFilters.volume}
                    onChange={(e) =>
                      handleColumnFilterChange("volume", e.target.value)
                    }
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="no-data">
                    Tidak ada data yang ditemukan
                  </td>
                </tr>
              ) : (
                filteredAndSortedData.map((v: CryptoData, index) => (
                  <tr key={`${v.symbol}-${index}`} className="data-row">
                    <td className="rank">{v.rank}</td>
                    <td className="logo">
                      <a
                        href={v.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={v.icon} alt={v.name} />
                      </a>
                      <span>{v.name}</span>
                    </td>
                    <td className="symbol">{v.symbol}</td>
                    <td className="number">Rp {formatNumber(v.marketCap)}</td>
                    <td className="number price">Rp {formatNumber(v.price)}</td>
                    <td
                      className={`number ${getPriceChangeClass(
                        v.priceChange1d
                      )}`}
                    >
                      {formatPriceChange(v.priceChange1d)}
                    </td>
                    <td
                      className={`number ${getPriceChangeClass(
                        v.priceChange1w
                      )}`}
                    >
                      {formatPriceChange(v.priceChange1w)}
                    </td>
                    <td className="number">
                      {formatNumber(v.availableSupply)}
                    </td>
                    <td className="number">Rp {formatNumber(v.volume)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <footer className="footer">
        <p>Data dari CoinStats API • Updated setiap refresh</p>
      </footer>
    </div>
  );
}

export default App;
