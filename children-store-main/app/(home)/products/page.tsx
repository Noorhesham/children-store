import ProductGrid from "@/app/components/ProductGrid";
import ProductList from "@/app/components/ProductList";
import connect from "@/app/utils/clientPromise";
import React, { Suspense } from "react";

const page = async () => {
  await connect();
  return (
    <Suspense>
      <ProductList />
    </Suspense>
  );
};

export default page;
