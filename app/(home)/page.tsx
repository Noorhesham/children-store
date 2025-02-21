import { Suspense } from "react";
import HeroSection from "../components/HeroSection";
import InfiniteMoveSection from "../components/IfinteTechStack";
import CategorySlider from "../components/CategorySlider";
import ProductGrid from "../components/ProductGrid";
import category from "../models/Category.ts";
import FeaturedProducts from "../components/Featured";
import connect from "../utils/clientPromise";
import StoreBenefits from "../components/Benefits";
import NewArrivals from "../components/NewArrivals";
import product from "../models/Product";
import ExploreSection from "../components/ExploreSection";

interface PageProps {
  searchParams: { category?: string; page?: string };
}

export default async function Home({ searchParams }: PageProps) {
  await connect();
  const categories = await category.find({}).lean();
  const categoriesObj = JSON.parse(JSON.stringify(categories));
  const page = searchParams.page || 1;
  const limit = 8;
  const query = searchParams.category ? { category: searchParams.category } : {};
  const productsAboutTOFinish = await product.find({}).limit(4).sort({ stock: 1 }).lean();

  return (
    <section className="">
      <HeroSection />
      <InfiniteMoveSection
        list={[
          { img: "/c1.webp", text: "ألعاب اسلامية" },
          { img: "/c2.png", text: "كتب اطفال" },
          { img: "/c3.png", text: "لوحات وكتب" },
        ]}
      />
      <CategorySlider categories={categoriesObj} />

      <div className=" mx-auto px-4 py-16">
        <div className="relative  ">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductGrid page={page} limit={limit} query={query} categories={categoriesObj} />
          </Suspense>
        </div>
      </div>
      <FeaturedProducts />
      <StoreBenefits />
      <NewArrivals products={JSON.parse(JSON.stringify(productsAboutTOFinish))} />
      <ExploreSection />
    </section>
  );
}
