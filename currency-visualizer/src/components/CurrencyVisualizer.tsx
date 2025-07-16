"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrencyRates } from "@/hooks/useCurrencyRates";
import { POPULAR_CURRENCIES, DEFAULT_BASE_CURRENCY, DEFAULT_AMOUNT } from "@/lib/currencies";
import { CurrencyChart } from "./CurrencyChart";
import { Loader2 } from "lucide-react";

export function CurrencyVisualizer() {
  const [baseCurrency, setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY);
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  
  const { rates, loading, error } = useCurrencyRates(baseCurrency, amount);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAmount(value);
    }
  };

  const selectedCurrency = POPULAR_CURRENCIES.find(c => c.code === baseCurrency);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Global Currency Visualizer
          </CardTitle>
          <CardDescription className="text-center">
            Compare your currency value against currencies worldwide
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
                min="0"
                step="0.01"
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Base Currency</Label>
              <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                <SelectTrigger className="text-lg">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  {POPULAR_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono">{currency.code}</span>
                        <span>-</span>
                        <span>{currency.name}</span>
                        {currency.symbol && (
                          <span className="text-muted-foreground">({currency.symbol})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Current Selection Display */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-lg">
              Showing {amount.toLocaleString()} {selectedCurrency?.symbol || ""} {baseCurrency} compared to other currencies
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Fetching exchange rates...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">Error: {error}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Please try again later or check your internet connection.
              </p>
            </div>
          )}

          {/* Chart */}
          {!loading && !error && rates.length > 0 && (
            <CurrencyChart 
              data={rates} 
              baseCurrency={baseCurrency}
              amount={amount}
            />
          )}

          {/* No Data State */}
          {!loading && !error && rates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No exchange rate data available for the selected currency.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}