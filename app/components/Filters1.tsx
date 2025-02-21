"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ICategory } from "../types";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useEffect } from "react";

interface Filters1Props {
  categories: ICategory[];
}

const Filters1 = ({ categories }: Filters1Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleCategoryChange = (categoryId: string | null) => {
    if (categoryId) {
      router.push(`/?category=${categoryId}`, { scroll: false });
    } else {
      router.push("/");
    }
  };

  const allCategories = [{ _id: null, name: "شاهد الكل" }, ...categories];

  const renderCategoryButton = (category: ICategory) => (
    <button
      key={category._id || "all"}
      onClick={() => handleCategoryChange(category._id)}
      className={`px-6 py-2 min-w-[120px] rounded-full text-sm transition-all transform hover:scale-105 ${
        (category._id === null && !currentCategory) || currentCategory === category._id
          ? "bg-[#6B4EFF] text-white"
          : "border-2 border-dashed border-gray-900 hover:border-[#6B4EFF]"
      }`}
    >
      {category.name.toUpperCase()}
    </button>
  );

  return (
    <div className="relative max-w-6xl mx-auto px-4 md:px-12 my-8">
      {isMobile ? (
        <div className="relative">
          <button className="swiper-prev-button absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="swiper-next-button absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={10}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".swiper-prev-button",
              nextEl: ".swiper-next-button",
            }}
            className="filters-swiper"
          >
            {allCategories.map((category) => (
              <SwiperSlide className=" text-nowrap" key={category._id || "all"}>{renderCategoryButton(category)}</SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex flex-wrap max-w-6xl justify-center gap-4">{allCategories.map(renderCategoryButton)}</div>
      )}
    </div>
  );
};

export default Filters1;
