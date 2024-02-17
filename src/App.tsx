import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface IData {
  name: string;
  rank: number;
  websiteUrl: string;
  icon: string;
  symbol: string;
  marketCap: string;
  price: number;
  availableSupply: string;
  volume: number;
}

function App() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState([]);

  console.log(currency);

  useEffect(() => {
    axios
      .get("https://openapiv1.coinstats.app/coins?currency=INR", {
        headers: {
          accept: "application/json",
          "X-API-KEY": "AZWaeZc15DM4jlf5pfyn89QeTJOPi1VGkr2etOEFjt8=",
        },
      })
      .then((res) => {
        setCurrency(res?.data?.result);
      })
      .catch((error: Error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <h2>Crypo Currency App</h2>
      <input
        type="text"
        className=""
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Available Supply</th>
            <th>Volume (24hr)</th>
          </tr>
        </thead>
        <tbody>
          {currency
            .filter((val: IData) => {
              return val?.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((v: IData) => {
              return (
                <tr>
                  <td className="rank">{v.rank}</td>
                  <td className="logo">
                    <a href={v.websiteUrl}>
                      <img src={v.icon} />
                    </a>
                    <p>{v.name}</p>
                  </td>
                  <td className="symbol">{v.symbol}</td>
                  <td className="symbol">${v.marketCap}</td>
                  <td className="symbol">${v.price.toFixed(2)}</td>
                  <td className="symbol">${v.availableSupply}</td>
                  <td className="symbol">${v.volume.toFixed(0)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
