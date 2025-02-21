import { Button } from "@/components/ui/button";
import React from "react";
import { useCart } from "../utils/CartProvider";

const CartItem = ({ item }: { item: any }) => {
  const { updateQuantity } = useCart();

  return (
    <div>
      <div key={item.product._id} className="flex gap-4 border-b pb-4">
        <div className="w-20 h-20 relative rounded-lg overflow-hidden">
          <img
            src={item.product.images?.[0].secure_url}
            alt={item.product.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{item.product.title}</h3>
          <div className="text-sm text-gray-500">{item.price} ج.م</div>
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
        <div className="text-right">{item.price * item.quantity} ريال</div>
      </div>
    </div>
  );
};

export default CartItem;
