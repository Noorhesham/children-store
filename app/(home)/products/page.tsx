import ProductGrid from "@/app/components/ProductGrid";
import ProductList from "@/app/components/ProductList";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <ProductList />
    </Suspense>
  );
};

export default page;
