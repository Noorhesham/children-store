// components/CartSheet.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../utils/CartProvider";
import CartItem from "./CartItem";

export function CartSheet() {
  const { items, itemCount, total } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  console.log(items);
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
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>سلة التسوق</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-6 text-gray-500">السلة فارغة</div>
          ) : (
            <>
              {items.map((item, i) => (
                <CartItem item={item} key={i} />
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">المجموع</span>
                  <span className="font-semibold">{total} ريال</span>
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
