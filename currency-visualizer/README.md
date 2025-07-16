# Global Currency Visualizer

A modern, interactive web application built with Next.js and shadcn/ui that allows users to compare currency values worldwide through beautiful charts and real-time exchange rates.

## Features

- 🌍 **Global Currency Support**: Compare 20+ major world currencies
- 📊 **Interactive Charts**: Beautiful bar charts with hover tooltips showing detailed exchange rate information
- 🔄 **Real-time Exchange Rates**: Live data from exchangerate-api.com
- 💱 **Flexible Amount Input**: Enter any amount to see equivalent values across currencies
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Built with Next.js App Router for optimal performance

## Supported Currencies

- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- JPY (Japanese Yen)
- AUD (Australian Dollar)
- CAD (Canadian Dollar)
- CHF (Swiss Franc)
- CNY (Chinese Yuan)
- SEK (Swedish Krona)
- NZD (New Zealand Dollar)
- MXN (Mexican Peso)
- SGD (Singapore Dollar)
- HKD (Hong Kong Dollar)
- NOK (Norwegian Krone)
- ZAR (South African Rand)
- TRY (Turkish Lira)
- BRL (Brazilian Real)
- INR (Indian Rupee)
- RUB (Russian Ruble)
- KRW (South Korean Won)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd currency-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Select Base Currency**: Choose your base currency from the dropdown menu
2. **Enter Amount**: Input the amount you want to convert
3. **View Results**: See the equivalent values in other currencies displayed in:
   - Interactive bar chart with hover tooltips
   - Top currencies summary cards with rates

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **API**: exchangerate-api.com
- **Language**: TypeScript

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── CurrencyChart.tsx  # Chart component
│   └── CurrencyVisualizer.tsx # Main visualizer component
├── hooks/
│   └── useCurrencyRates.ts # Exchange rates hook
├── lib/
│   ├── currencies.ts      # Currency data and constants
│   └── utils.ts          # Utility functions
└── types/
    └── currency.ts       # TypeScript type definitions
```

## API

This project uses the free tier of [exchangerate-api.com](https://exchangerate-api.com/) which provides:
- 1,500 requests per month
- Real-time exchange rates
- No authentication required for basic usage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Recharts](https://recharts.org/) for the charting library
- [exchangerate-api.com](https://exchangerate-api.com/) for the currency data API
