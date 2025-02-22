"use client";

interface PriceDisplayProps {
  basePrice: number; // Price in EGP
  usdPrice: number; // Price in USD
  salePrice?: number; // Sale price in EGP
  saleUsdPrice?: number; // Sale price in USD
  className?: string;
  isEgypt?: boolean; // If true, display EGP prices; if false, display USD prices
}

const CURRENCY_CONFIG = {
  EGP: { symbol: "ج.م" },
  USD: { symbol: "$" },
};

export const PriceDisplay = ({
  basePrice,
  usdPrice,
  salePrice,
  saleUsdPrice,
  className,
  isEgypt = true, // default to true if not provided
}: PriceDisplayProps) => {
  const currency: "EGP" | "USD" = isEgypt ? "EGP" : "USD";
  const displayPrices = isEgypt ? { base: basePrice, sale: salePrice } : { base: usdPrice, sale: saleUsdPrice };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {displayPrices.sale && displayPrices.sale > 0 ? (
        <>
          <span className="text-gray-400 line-through">
            {displayPrices.base.toFixed(2)} {CURRENCY_CONFIG[currency].symbol}
          </span>
          <span className="text-[#6B4EFF] font-semibold">
            {displayPrices.sale.toFixed(2)} {CURRENCY_CONFIG[currency].symbol}
          </span>
        </>
      ) : (
        <span className="text-[#6B4EFF] font-semibold">
          {displayPrices.base.toFixed(2)} {CURRENCY_CONFIG[currency].symbol}
        </span>
      )}
    </div>
  );
};
