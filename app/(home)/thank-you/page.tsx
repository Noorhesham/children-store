import AnimatedImage from "@/app/components/AnimatedImage";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const page = () => {
  return (
    <MaxWidthWrapper className="flex flex-col items-center">
      <div className="w-96 h-96 relative">
        <AnimatedImage data="animate2.json" className="w-full h-full absolute inset-0" />
      </div>
      <p className="text-xl font-semibold text-center mt-4">
        لقد تم وضع طلبك بنجاح ! كلها مسألة وقت بسيط حتي نتواصل معك يا صديقي 😀
      </p>
      <a
        href="https://wa.me/201552269233?text=أهلاً، أود متابعة طلبي."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mt-6"
      >
        <FaWhatsapp size={24} />
        <span>تتبع طلبك عبر واتساب</span>
      </a>
    </MaxWidthWrapper>
  );
};

export default page;
