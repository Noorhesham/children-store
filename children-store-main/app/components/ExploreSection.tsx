"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Paragraph from "./Paragraph";
import gsap from "gsap";
import { FollowingEyes } from "./FollowingEyes";
import HeroButton from "./ButtonHero";
import InfiniteMoveSection from "./IfinteTechStack";
const specialities = [
  { text: "ألعاب تعليمية", color: "!text-green-400" },
  {
    text: "كتب اطفال",
    color: "!text-pink-400",
  },
  {
    text: "لوحات وكتب ",
    color: "!text-red-400",
  },
];
const ExploreSection = () => {
  const [index, setIndex] = useState(0);

  const animateHeader = React.useCallback(() => {
    const t = setTimeout(
      () =>
        gsap.timeline().to(".header", {
          y: -110,

          onComplete: () => {
            setIndex((prev) => (prev + 1) % 3);
          },
        }),
      1700
    );
    return t;
  }, []);
  useEffect(() => {
    const timer = animateHeader();
    const ctx = gsap.context(() => {
      gsap.fromTo(".header", { y: 40 }, { y: 0, duration: 0.5 });
    });
    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [animateHeader, index]);
  return (
    <section
      style={{
        backgroundImage: "url('/pf-s104-kt-0372.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <MaxWidthWrapper className="  !pt-32  relative flex justify-center items-center ">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col font-extrabold  relative z-10 text-center text-white text-3xl lg:text-7xl items-start">
            <h1 className=" ">اكتشف عالم مسلم كيدز الملئ</h1>{" "}
            <div className="flex mt-8  items-center gap-4">
              بالتعلم <FollowingEyes />و المرح !
            </div>
          </div>
          <div className="flex flex-row-reverse  head-1 lg:w-full w-full  font-extrabold  items-start justify-between  gap-4">
            <div></div>
            <div className="flex flex-col gap-2">
              <div className="overflow-hidden relative  !w-fit h-[8.9rem] font-extrabold">
                <Paragraph
                  height=" h-10 lg:h-[8.9rem]  !font-extrabold"
                  animate={false}
                  text={specialities[index].text}
                  className={`header !mr-auto  bg-gradient-to-br from-purple-400 to-pink-400 via-violet-600
               text-transparent bg-clip-text  !text-center  !flex-nowrap text-nowrap !font-extrabold
                !w-fit`}
                />
              </div>
              <p className=" z-20 relative text-gray-50 text-base mt-4 font-semibold">
                يلتقي التعلُّم والترفيه في عالمٍ ممتع ونافع لأطفالك
              </p>
            </div>
            <div className=" w-36 h-36 bottom-10 z-[1]  right-32 absolute  rotate-animation">
              <Image src={"/rotate.svg"} alt="" fill />
            </div>
            <div className=" w-36 h-36 top-20 z-[1]  left-32 absolute  ">
              <Image src={"/bomb.svg"} alt="" fill />
            </div>
          </div>
          <HeroButton tag="اكتشف">منتجاتنا</HeroButton>
        </div>
      </MaxWidthWrapper>
      {/* <InfiniteMoveSection /> */}
    </section>
  );
};

export default ExploreSection;
