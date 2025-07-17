import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import ImageSlider from "./ImageSlider";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { IProduct } from "../types";
import { PriceDisplay } from "./PriceDisplay";

export default function ProductCard({ product }: { product: IProduct }) {
  const salePrice = product.price - product.sale || 0;
  const { toast } = useToast();
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/product/${product._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title} on Muslim Kids`,
          url,
        });
      } catch (err) {
        await navigator.clipboard.writeText(url);
        toast({
          title: "تم نسخ الرابط",
          description: "تم نسخ رابط المنتج إلى الحافظة",
        });
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "تم نسخ الرابط",
        description: "تم نسخ رابط المنتج إلى الحافظة",
      });
    }
  };
  return (
    <Link
      href={`/product/${product._id}`}
      className="group block  relative border-2 border-dashed border-gray-900 rounded-3xl p-4 transition-all hover:border-[#6B4EFF]"
    >
      {" "}
      {salePrice > 0 && (
        <div className="absolute top-4 left-[-30px] bg-red-500 text-white font-bold px-3 py-1 transform -rotate-45 shadow-lg">
          تخفيض
        </div>
      )}
      <div className="absolute z-50 top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
          <Heart className="w-4 h-4 text-gray-600" />
        </button> */}
        <button
          onClick={handleShare}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
        >
          <Share2 className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <ImageSlider urls={product.images.map((image) => image.secure_url)} />
      <div className="space-y-2">
        <div className="text-sm text-gray-500 uppercase">{product.category.name}</div>
        <h3 className="font-semibold truncate">{product.title}</h3>
        <PriceDisplay usdPrice={product.priceInUsd || 0} basePrice={product.price} salePrice={salePrice} />
      </div>
    </Link>
  );
}
