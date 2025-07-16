"use client";

import { useState, useEffect } from "react";
import { ExchangeRate } from "@/types/currency";
import { POPULAR_CURRENCIES } from "@/lib/currencies";

export function useCurrencyRates(baseCurrency: string, amount: number) {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      if (!baseCurrency || !amount) return;

      setLoading(true);
      setError(null);

      try {
        // Using exchangerate-api.com free tier (1500 requests/month)
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }

        const data = await response.json();

        if (!data.rates) {
          throw new Error("Invalid response format");
        }

        // Convert rates to our format and calculate values
        const exchangeRates: ExchangeRate[] = POPULAR_CURRENCIES
          .filter(currency => currency.code !== baseCurrency)
          .map(currency => ({
            currency: currency.code,
            rate: data.rates[currency.code] || 0,
            value: (data.rates[currency.code] || 0) * amount,
          }))
          .filter(rate => rate.rate > 0)
          .sort((a, b) => b.value - a.value);

        setRates(exchangeRates);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency, amount]);

  return { rates, loading, error };
}