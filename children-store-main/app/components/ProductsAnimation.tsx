"use client";
import React, { useEffect } from "react";
import { IProduct } from "../types";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import ProductCard from "./Product";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const ProductsAnimation = ({ products }: { products: IProduct[] }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        animation: gsap.from(".product", { y: 100, opacity: 0, stagger: 0.2 }),
        start: "top 70%",
        toggleActions: "play none none none",
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
  return (
    <div ref={ref}>
      <MaxWidthWrapper className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: IProduct) => (
          <div className="product" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductsAnimation;
