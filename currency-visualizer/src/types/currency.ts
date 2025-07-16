export interface Currency {
  code: string;
  name: string;
  symbol?: string;
}

export interface ExchangeRate {
  currency: string;
  rate: number;
  value: number;
}

export interface CurrencyApiResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}