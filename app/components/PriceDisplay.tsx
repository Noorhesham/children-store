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
    // Detect the user's country using IP geolocation
    const detectCurrency = async (): Promise<CurrencyCode> => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const countryCode = data.country; // e.g., "US", "FR", "SA", etc.

        // Determine the currency based on country code
        if (countryCode === "US") return "USD";
        if (["FR", "DE", "IT", "ES"].includes(countryCode)) return "EUR";
        if (countryCode === "SA") return "SAR";
        if (countryCode === "AE") return "AED";
        return "EGP";
      } catch (error) {
        console.error("Error detecting location:", error);
        return "EGP";
      }
    };

    const updatePrices = async () => {
      const detectedCurrency = await detectCurrency();
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
            {convertedPrices.base.toFixed(2)}
            {CURRENCY_CONFIG[currency].symbol}
          </span>
          <span className="text-[#6B4EFF] font-semibold">
            {convertedPrices.sale?.toFixed(2)}
            {CURRENCY_CONFIG[currency].symbol}
          </span>
        </>
      ) : (
        <span className="text-[#6B4EFF] font-semibold">
          {convertedPrices.base.toFixed(2)}
          {CURRENCY_CONFIG[currency].symbol}
        </span>
      )}
    </div>
  );
};
