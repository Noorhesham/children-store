// components/CartSheet.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../utils/CartProvider";
import CartItem from "./CartItem";

// Egypt's approximate coordinates
const EGYPT_BOUNDS = {
  north: 31.8, // Northernmost point
  south: 22.0, // Southernmost point
  east: 36.9, // Easternmost point
  west: 24.7, // Westernmost point
};

export function CartSheet() {
  const { items, itemCount, total, totalUsd } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isEgypt, setIsEgypt] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Check if coordinates are within Egypt's bounds
          const isInEgypt =
            latitude >= EGYPT_BOUNDS.south &&
            latitude <= EGYPT_BOUNDS.north &&
            longitude >= EGYPT_BOUNDS.west &&
            longitude <= EGYPT_BOUNDS.east;

          setIsEgypt(isInEgypt);
        },
        (error) => {
          // If error or permission denied, default to Egypt
          console.log("Geolocation error:", error);
          setIsEgypt(true);
        }
      );
    } else {
      // If geolocation is not supported, default to Egypt
      setIsEgypt(true);
    }
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-scroll sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>سلة التسوق</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-6 text-gray-500">السلة فارغة</div>
          ) : (
            <>
              {items.map((item, i) => (
                <CartItem item={item} key={i} isEgypt={isEgypt} />
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">المجموع</span>
                  <span className="font-semibold">{isEgypt ? `${total} ج.م` : `$${totalUsd.toFixed(2)}`}</span>
                </div>
                <Button className="w-full" onClick={() => setIsOpen(false)} asChild>
                  <Link href="/orders">إتمام الطلب</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
