import AnimatedImage from "@/app/components/AnimatedImage";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import React from "react";

const page = () => {
  return (
    <MaxWidthWrapper className="flex flex-col items-center">
      <div className=" w-96 h-96 relative">
        {" "}
        <AnimatedImage data="animate2.json" className=" w-full h-full absolute inset-0" />
      </div>
      <p className=" text-xl font-semibold">لقد تم وضع طلبك بنجاح ! كلها مسألة وقت بسيط حتي نتواصل معك يا صديقي 😀</p>
    </MaxWidthWrapper>
  );
};

export default page;
