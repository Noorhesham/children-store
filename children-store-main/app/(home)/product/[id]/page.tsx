// app/product/[id]/page.tsx
import { getEntities, getEntity } from "@/app/actions/actions";
import { notFound } from "next/navigation";
import ImageSlider from "@/app/components/ImageSlider";
import { AddToCart } from "@/app/components/AddToCart";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import ProductsAnimation from "@/app/components/ProductsAnimation";
import product from "@/app/models/Product";
import { PriceDisplay } from "@/app/components/PriceDisplay";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const productData = await getEntity("Product", params.id);

  if (!productData?.data) {
    return {
      title: "المنتج غير موجود",
      description: "عذراً، لم يتم العثور على المنتج المطلوب",
    };
  }

  return {
    title: `${productData.data.title} | مسلم كيدز`,
    description: productData.data.description,
    openGraph: {
      images: [{ url: productData.data.images[0].secure_url }],
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productData = await getEntity("Product", params.id, "en", ["category"]);
  if (!productData?.data) {
    notFound();
  }
  const category = productData.data.category._id;

  // Exclude the current product from similar products
  const similarProducts = await product
    .find({ category, _id: { $ne: productData.data._id } })
    .limit(4)
    .lean();

  const showSalePrice = productData.data.sale > 0 && productData.data.sale < productData.data.price;

  return (
    <MaxWidthWrapper className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 p-6">
        <ImageSlider
          urls={productData.data.images.map((image: any) => image.secure_url)}
          alt={productData.data.title}
        />

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{productData.data.title}</h1>
          <p className="text-gray-600">{productData.data.description}</p>
          <div className="flex items-center gap-4">
            <PriceDisplay
              usdPrice={productData.data.priceInUsd || 0}
              basePrice={productData.data.price}
              salePrice={productData.data.sale}
            />
          </div>
          <AddToCart product={productData.data} />
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="flex mt-4 flex-col items-start">
          <h2 className="text-4xl font-bold mb-4">منتجات مشابه</h2>
          <ProductsAnimation products={JSON.parse(JSON.stringify(similarProducts))} />
        </div>
      )}
    </MaxWidthWrapper>
  );
}
