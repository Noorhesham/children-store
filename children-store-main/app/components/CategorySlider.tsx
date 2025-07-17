"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

interface Category {
  name: string;
  image: string;
}

interface CategorySliderProps {
  categories: Category[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  return (
    <div className="relative px-12    my-10 mx-auto">
      {/* Custom Navigation Arrows */}
      <button className="swiper-prev-button absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-[#6B4EFF] flex items-center justify-center">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button className="swiper-next-button absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-[#6B4EFF] flex items-center justify-center">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        breakpoints={{
          1024: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 2,
          },
          420: {
            slidesPerView: 2,
          },
        }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".swiper-prev-button",
          nextEl: ".swiper-next-button",
        }}
        className="category-swiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide
            className=" even:border-2 odd:border-t odd:border-b last:border-r even:border-gray-200"
            key={index}
          >
            <Link href={`/products?category=${category._id}`} className=" h-full">
              <div className="flex flex-col items-center justify-center py-6 px-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-24 h-24 relative rounded-full overflow-hidden mb-3">
                  <Image
                    fill
                    src={category.image.secure_url || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-800 text-center">{category.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
