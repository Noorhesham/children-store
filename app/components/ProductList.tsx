"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getEntities } from "../actions/actions";
import ProductCard from "./Product";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Loader from "./Loader";

export default function ProductList() {
  const [ref, inView] = useInView();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // Add a search state for backend filtering
  const [search, setSearch] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading } = useInfiniteQuery({
    queryKey: ["products", category, search],
    queryFn: ({ pageParam = 1 }) => getEntities("Product", { page: pageParam, category, search, locale: "en" }),
    getNextPageParam: (lastPage, pages) => (lastPage.hasMore ? pages.length + 1 : undefined),
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);
  console.log(data);
  return (
    <div className="space-y-8 relative">
      <div className="mb-4 mt-4 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="ابحث عن المنتجات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <MaxWidthWrapper className="grid relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <Loader />
        ) : status === "error" ? (
          <div>Error fetching products</div>
        ) : (
          data?.pages.map((page: any) =>
            page.products?.map((product: any) => <ProductCard key={product._id} product={product} />)
          )
        )}
      </MaxWidthWrapper>
      <div ref={ref}>{isFetchingNextPage && <Loader />}</div>
      {!hasNextPage && !isLoading && (
        <h2 className="text-center mx-auto font-semibold text-4xl text-purple-600">لقد انتهى الكاتالوج 😀</h2>
      )}
    </div>
  );
}
