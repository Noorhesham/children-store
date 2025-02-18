import React from "react";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";

const HeroSection = () => {
  return (
    <div className=" h-screen bg-main">
      <MaxWidthWrapper>
        {/* Hero Section */}
        <div className="relative">
          <div>
            <div className="grid md:grid-cols-2 gap-8 items-center py-12">
              <div className="space-y-6">
                <h1 className="text-[#00B3B0] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Nurturing little ones with love and care.
                </h1>
                <p className="text-gray-700 text-lg md:text-xl max-w-lg">
                  Introducing the softest and most absorbent diapers for your little one's ultimate comfort!
                </p>
                <button className="bg-[#FF6B95] text-white px-8 py-3 rounded-md hover:bg-[#FF6B95]/90 transition-colors">
                  Pregnancy Tools
                </button>
              </div>
              <div className="relative">
                <Image src="/item.png" alt="Mother and baby" width={600} height={500} className="object-contain" />
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0">
                  <div className="text-[#00B3B0] opacity-20">{/* Rocket and planet illustrations would go here */}</div>
                </div>
                <div className="absolute bottom-10 left-10">
                  <div className="text-[#FF6B95]">{/* Star decorations */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="bg-[#00B3B0] py-8">
          <MaxWidthWrapper>
            <div className="grid md:grid-cols-3 gap-8 text-white text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-white p-3 rounded-full">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Pure Protection"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold">Pure Protection</h3>
                <p className="text-sm">Hypoallergenic, fragrance free diapers.</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-white p-3 rounded-full">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Paraben-free"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold">Paraben-free</h3>
                <p className="text-sm">Perfectly soft on your baby's delicate skin.</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-white p-3 rounded-full">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="The Best"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold">The Best</h3>
                <p className="text-sm">A touch of comfort for your little one.</p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default HeroSection;
