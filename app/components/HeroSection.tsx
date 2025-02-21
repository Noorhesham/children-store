import React from "react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import HeroButton from "./ButtonHero";
import AnimatedImage from "./AnimatedImage";

const HeroSection = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/winter.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" h-[82vh]"
    >
      <MaxWidthWrapper className=" flex items-center  justify-between">
        <div className="flex flex-col gap-4">
          <h1 className=" text-7xl font-extrabold text-white">أجعل حياة طفلك لامعة معنا </h1>
          <p className=" text-base text-gray-100">
            هنا يمكنك التسوق و رؤية افضل العاب الاطفال وتعليمه بطريقه صحيحه واسلامية وممتعة
          </p>
          <HeroButton className=" w-fit" tag="تسوق">
            الان
          </HeroButton>
        </div>
        <div className=" h-96  block w-[50%] relative">
          <AnimatedImage className=" w-full absolute inset-0 h-full" data="animate1.json" />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default HeroSection;
