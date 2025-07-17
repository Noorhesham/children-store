import React from "react";
import { IProduct } from "../types";
import ImagesCute from "./ImagesCute";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import ProductsAnimation from "./ProductsAnimation";

const NewArrivals = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="overflow-hidden">
      <div className="border-t w-full  overflow-hidden relative border-b border-black ">
        <MaxWidthWrapper className="flex flex-col gap-4 items-center relative  ">
          <ImagesCute imgs={["/tutule.png", "/cloud.png"]} />{" "}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold">منتجات ذات الطلب العالي </h2>
            <p className=" text-base mt-8 max-w-sm text-muted-foreground">
              أفضل المنتجات وعليها طلب عالي يمكنك ان تجدها هنا{" "}
            </p>
          </div>
        </MaxWidthWrapper>
      </div>{" "}
      <ProductsAnimation products={products} />
    </div>
  );
};

export default NewArrivals;
