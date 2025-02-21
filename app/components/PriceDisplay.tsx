// components/PriceDisplay.tsx
"use client";

import { useEffect, useState } from "react";

// Types
interface PriceDisplayProps {
  basePrice: number; // Price in EGP
  salePrice?: number; // Sale price in EGP
  className?: string;
}

// Updated and more precise conversion rates
const CURRENCY_CONFIG = {
  EGP: { symbol: "ج.م", rate: 1 },
  USD: { symbol: "$", rate: 0.032 }, // 1 EGP ≈ 0.032 USD
  EUR: { symbol: "€", rate: 0.029 }, // 1 EGP ≈ 0.029 EUR
  SAR: { symbol: "﷼", rate: 0.2 }, // 1 EGP ≈ 0.20 SAR
  AED: { symbol: "د.إ", rate: 0.2 }, // 1 EGP ≈ 0.20 AED
};

type CurrencyCode = keyof typeof CURRENCY_CONFIG;

export const PriceDisplay = ({ basePrice, salePrice, className }: PriceDisplayProps) => {
  const [currency, setCurrency] = useState<CurrencyCode>("EGP");
  const [convertedPrices, setConvertedPrices] = useState<{ base: number; sale?: number }>({
    base: basePrice,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectCurrency = (): CurrencyCode => {
      const locale = navigator.language || "ar-EG";
      console.log(locale)
      // Check for specific country codes in the locale string
      if (locale.includes("US")) return "USD";
      if (locale.includes("FR") || locale.includes("DE") || locale.includes("ES") || locale.includes("IT"))
        return "EUR";
      if (locale.includes("SA")) return "SAR";
      if (locale.includes("AE")) return "AED";
      return "EGP";
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
      {salePrice && salePrice > 0 ? (
        <>
          <span className="text-gray-400 line-through">
            {CURRENCY_CONFIG[currency].symbol}
            {convertedPrices.base.toFixed(2)}
          </span>
          <span className="text-[#6B4EFF] font-semibold">
            {CURRENCY_CONFIG[currency].symbol}
            {convertedPrices.sale?.toFixed(2)}
          </span>
        </>
      ) : (
        <span className="text-[#6B4EFF] font-semibold">
          {CURRENCY_CONFIG[currency].symbol}
          {convertedPrices.base.toFixed(2)}
        </span>
      )}
    </div>
  );
};
