import React, { useEffect, useState } from "react";
import axios from "axios";
import s from "./Currency.module.css";

const CACHE_KEY = "currencyRates";
const CACHE_TTL = 3600 * 1000;

const Currency = () => {
  /* const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      const now = Date.now();

      if (now - parsed.timestamp < CACHE_TTL) {
        setRates(parsed.data);
        return;
      }
    }
    axios
      .get("https://api.monobank.ua/bank/currency")
      .then((res) => {
        const dataArray = Array.isArray(res.data)
          ? res.data
          : res.data.rates || res.data.data || [];
        const filtered = dataArray.filter(
          (item) =>
            (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
            item.currencyCodeB === 980
        );
        setRates(filtered);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: filtered,
            timestamp: Date.now(),
          })
        );
      })
      .catch((err) => {
        console.error("Currency error:", err);
        setError("Failed to load currency data");
      });
  }, []); */

  const [rates, setRates] = useState(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      const now = Date.now();
      if (now - parsed.timestamp < CACHE_TTL) {
        return parsed.data;
      }
    }
    return [];
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      const now = Date.now();

      if (now - parsed.timestamp < CACHE_TTL) {
        setRates(parsed.data);
        return;
      }
    }

    axios
      .get("https://api.monobank.ua/bank/currency")
      .then((res) => {
        const dataArray = Array.isArray(res.data)
          ? res.data
          : res.data.rates || res.data.data || [];
        const filtered = dataArray.filter(
          (item) =>
            (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
            item.currencyCodeB === 980
        );
        setRates(filtered);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: filtered,
            timestamp: Date.now(),
          })
        );
      })
      .catch((err) => {
        console.error("Currency error:", err);
        setError("Failed to load currency data");
      });
  }, []);

  const formatRate = (rate, field) =>
    typeof rate[field] === "number" ? rate[field].toFixed(2) : "—";

  const getCurrencyLabel = (code) => {
    switch (code) {
      case 840:
        return "USD";
      case 978:
        return "EUR";
      default:
        return code;
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(rates) || rates.length === 0) {
    return <div>Loading currency rates...</div>;
  }

  return (
    <div className={s.exchange}>
      <div className={s.row}>
        <span className={s.titleRow}>Currency</span>
        <span className={s.titleRow}>Purchase</span>
        <span className={s.titleRow}>Sale</span>
      </div>
      {rates.map((rate) => (
        <div
          className={s.currencies}
          key={`${rate.currencyCodeA}-${rate.currencyCodeB}`}
        >
          <span className={s.titleCurrency}>
            {getCurrencyLabel(rate.currencyCodeA)}
          </span>
          <span className={s.titleCurrency}>{formatRate(rate, "rateBuy")}</span>
          <span className={s.titleCurrency}>
            {formatRate(rate, "rateSell")}
          </span>
        </div>
      ))}
      <img
        src="/background-picture/picture1.png"
        alt="Wallet"
        className={s.walletImage}
      />
    </div>
  );
};

export default Currency;
