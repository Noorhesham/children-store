import { PaginationDemo } from "./Pagination";
import Filters1 from "./Filters1";
import product from "../models/Product";
import { ICategory } from "../types";
import HeroButton from "./ButtonHero";
import Link from "next/link";
import Empty from "./Empty";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import ImagesCute from "./ImagesCute";
import ProductsAnimation from "./ProductsAnimation";
import { Suspense } from "react";

interface ProductGridProps {
  categories: ICategory[];
  query: any;
  page: string;
  limit: number;
}

export default async function ProductGrid({ categories, query, page, limit }: ProductGridProps) {
  const products = await product
    .find(query)
    .skip((+page - 1) * limit)
    .limit(limit)
    .populate("category")
    .lean();
  const productsObj = JSON.parse(JSON.stringify(products));
  const totalPages = Math.ceil((await product.countDocuments(query).lean()) / limit);
  return (
    <div className="space-y-8 flex overflow-hidden flex-col items-center ">
      <div className="border-t w-full  relative border-b border-black ">
        <MaxWidthWrapper className=" relative  ">
          <ImagesCute />{" "}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold">تصفح منتجتنا</h2>
          </div>
          <Suspense>
            <Filters1 categories={categories} />
          </Suspense>
        </MaxWidthWrapper>
      </div>

      {productsObj.length > 0 ? <ProductsAnimation products={productsObj} /> : <Empty />}
      <PaginationDemo totalPages={totalPages} />
      <div className=" flex flex-col items-center bg-violet-300/50 border-t border-b border-black py-2 w-full">
        <Link className=" mx-auto self-center w-fit my-5" href="/products">
          <HeroButton tag="تصفح">كل المنتجات</HeroButton>
        </Link>
      </div>
    </div>
  );
}
