"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Link from "next/link";

const products = [
  {
    title: "القرآن التفاعلي للأطفال",
    price: 199,
    image: "/Screenshot 2025-02-21 094114 (1).png",
    tag: "جديد",
    discount: "15%",
    color: "bg-green-100",
  },
  {
    title: "مجموعة القصص النبوية",
    price: 149,
    image: "/Screenshot 2025-02-21 094114 (2).png",
    tag: "الأكثر مبيعاً",
    discount: "20%",
    color: "bg-pink-100",
  },
  {
    title: "ألعاب تعليمية إسلامية",
    price: 99,
    image: "/Screenshot 2025-02-21 094114.png",
    tag: "متميز",
    discount: "10%",
    color: "bg-purple-100",
  },
];

const FeaturedProducts = () => {
  return (
    <MaxWidthWrapper className=" ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">منتجاتنا المميزة</h2>
          <p className="text-lg text-gray-600">اكتشف مجموعتنا من الألعاب والكتب التعليمية الإسلامية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rtl">
          {products.map((product, index) => (
            <div key={index} className={`overflow-hidden shadow-md  rounded-2xl transition-transform hover:scale-105 ${product.color}`}>
              <div className="relative h-48">
                <Image src={product.image} alt={product.title} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white text-primary">{product.tag}</Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white">خصم {product.discount}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <div className="flex justify-between items-center">
                  <Link href="/products">
                    <button className="bg-primary mr-auto mt-2 text-white px-4 py-2 rounded-full hover:bg-primary/90 transition">
                      تصفح المزيد
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default FeaturedProducts;
