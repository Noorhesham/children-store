import React from "react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import AnimatedImage from "./AnimatedImage";
import Link from "next/link";

const Empty = () => {
  return (
    <MaxWidthWrapper className="flex items-center flex-col relative">
      <div className=" w-96 h-96 relative">
        <AnimatedImage data="animate4.json" className=" " />
      </div>
      <div className="flex items-center gap-2">
        <p>لا يوجد نتائج لهذا التصنيف بعد 😀 جرب تصنيفا اخر او </p>
        <Link className="text-blue-500 underline" href="/">
          اعرض الكل
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default Empty;
