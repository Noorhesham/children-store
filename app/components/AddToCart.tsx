// components/AddToCart.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "../utils/CartProvider";
import { IProduct } from "../types";

export function AddToCart({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 border rounded-md">
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          className="px-3 py-1 border rounded-md"
        >
          +
        </button>
      </div>

      <Button
        onClick={() => addItem({ ...product, description: "" }, quantity)}
        className="w-full"
        disabled={product.stock < 1}
      >
        {product.stock < 1 ? "نفذت الكمية" : "إضافة إلى السلة"}
      </Button>
    </div>
  );
}
