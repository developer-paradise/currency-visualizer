"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ExchangeRate } from '@/types/currency';
import { POPULAR_CURRENCIES } from '@/lib/currencies';

interface CurrencyChartProps {
  data: ExchangeRate[];
  baseCurrency: string;
  amount: number;
}

// Generate colors for each currency
const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#8dd1e1',
  '#d084d0',
  '#ffb347',
  '#87ceeb',
  '#dda0dd',
  '#f0e68c',
  '#e6e6fa',
  '#ffa07a',
  '#20b2aa',
  '#87cefa',
  '#778899'
];

export function CurrencyChart({ data, baseCurrency, amount }: CurrencyChartProps) {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const currencyInfo = POPULAR_CURRENCIES.find(c => c.code === label);
      const value = payload[0].value;
      const rate = data.find(d => d.currency === label)?.rate;
      
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{currencyInfo?.name || label}</p>
          <p className="text-sm text-muted-foreground">
            {amount} {baseCurrency} = {value.toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })} {label}
          </p>
          <p className="text-xs text-muted-foreground">
            Rate: {rate?.toFixed(4)} {label} per {baseCurrency}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label formatter for X-axis
  const formatXAxisLabel = (tickItem: string) => {
    return tickItem;
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Currency Comparison Chart</h3>
        <p className="text-sm text-muted-foreground">
          Values shown are equivalent amounts in each currency
        </p>
      </div>
      
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="currency" 
              tickFormatter={formatXAxisLabel}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis 
              tickFormatter={(value) => 
                new Intl.NumberFormat('en', { notation: 'compact' }).format(value)
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 5 currencies table */}
      <div className="mt-6">
        <h4 className="text-lg font-medium mb-3">Top Currency Values</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.slice(0, 6).map((rate, index) => {
            const currencyInfo = POPULAR_CURRENCIES.find(c => c.code === rate.currency);
            return (
              <div 
                key={rate.currency} 
                className="flex justify-between items-center p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-mono font-medium">{rate.currency}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {currencyInfo?.symbol}{rate.value.toLocaleString(undefined, { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Rate: {rate.rate.toFixed(4)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}