import { Button } from "@/components/ui/button";
import React from "react";
import { useCart } from "../utils/CartProvider";
import { PriceDisplay } from "./PriceDisplay";
import { IProduct } from "../types";

interface CartItemProps {
  item: {
    product: IProduct;
    quantity: number;
  };
  isEgypt: boolean;
}

const CartItem = ({ item, isEgypt }: CartItemProps) => {
  const { updateQuantity } = useCart();
  const itemTotal = isEgypt ? item.product.price * item.quantity : (item.product.priceInUsd || 0) * item.quantity;

  return (
    <div>
      <div key={item.product._id} className="flex gap-4 border-b pb-4">
        <div className="w-20 h-20 relative rounded-lg overflow-hidden">
          <img
            src={
              typeof item.product.images?.[0] === "string"
                ? item.product.images?.[0]
                : item.product.images?.[0].secure_url
            }
            alt={item.product.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{item.product.title}</h3>
          <PriceDisplay
            usdPrice={item.product.priceInUsd || 0}
            basePrice={item.product.price}
            salePrice={item.product.sale || 0}
            isEgypt={isEgypt}
          />
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
            >
              -
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>
        <PriceDisplay
          usdPrice={item.product.priceInUsd || 0}
          basePrice={item.product.price}
          isEgypt={isEgypt}
          className="font-semibold"
        />
      </div>
    </div>
  );
};

export default CartItem;
