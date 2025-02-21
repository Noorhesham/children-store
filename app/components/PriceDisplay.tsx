// components/PriceDisplay.tsx
"use client";

import { useEffect, useState } from "react";

// Types
interface PriceDisplayProps {
  basePrice: number; // Price in EGP
  salePrice?: number; // Sale price in EGP
  className?: string;
}

// Currency configuration
const CURRENCY_CONFIG = {
  EGP: {
    symbol: "ج.م",
    rate: 1,
  },
  USD: {
    symbol: "$",
    rate: 0.021,
  },
  EUR: {
    symbol: "€",
    rate: 0.019,
  },
  SAR: {
    symbol: "﷼",
    rate: 0.078,
  },
  AED: {
    symbol: "د.إ",
    rate: 0.077,
  },
};

type CurrencyCode = keyof typeof CURRENCY_CONFIG;

export const PriceDisplay = ({ basePrice, salePrice, className }: PriceDisplayProps) => {
  const [currency, setCurrency] = useState<CurrencyCode>("EGP");
  const [convertedPrices, setConvertedPrices] = useState<{
    base: number;
    sale?: number;
  }>({ base: basePrice });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectCurrency = () => {
      // Implement your currency detection logic here
      // This is a simplified example using browser locale
      const userLocale = navigator.language.split("-")[1] || "EG";

      switch (userLocale) {
        case "US":
          return "USD";
        case "EU":
          return "EUR";
        case "SA":
          return "SAR";
        case "AE":
          return "AED";
        default:
          return "EGP";
      }
    };

    const updatePrices = () => {
      const detectedCurrency = detectCurrency();
      const conversionRate = CURRENCY_CONFIG[detectedCurrency].rate;

      setCurrency(detectedCurrency);
      setConvertedPrices({
        base: basePrice * conversionRate,
        sale: salePrice ? salePrice * conversionRate : undefined,
      });
      setLoading(false);
    };

    updatePrices();
  }, [basePrice, salePrice]);

  if (loading) {
    return <span className={className}>جاري التحميل...</span>;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {salePrice && (
        <span className="text-gray-400 line-through">
          {CURRENCY_CONFIG[currency].symbol}
          {convertedPrices.base.toFixed(2)}
        </span>
      )}
      <span className="text-[#6B4EFF] font-semibold">
        {CURRENCY_CONFIG[currency].symbol}
        {(convertedPrices.sale || convertedPrices.base).toFixed(2)}
      </span>
    </div>
  );
};
