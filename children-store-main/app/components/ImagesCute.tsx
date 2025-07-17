"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef, useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ImagesCute = ({ imgs }: { imgs?: string[] }) => {
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftImageRef.current, {
        duration: 2,
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: leftImageRef.current,
          start: "top center",
        },
      });

      gsap.from(rightImageRef.current, {
        duration: 2,
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: rightImageRef.current,
          start: "top center",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div
        ref={leftImageRef}
        className="absolute z-10 left-4 lg:block hidden lg:-left-20 top-0 w-40 h-40 lg:w-64  lg:h-64"
      >
        <Image src={imgs?.[0] || "/monkey.png"} alt="Decorative" className="object-contain object-top" fill />
      </div>
      <div
        ref={rightImageRef}
        className="absolute right-4 lg:block hidden lg:-right-20 top-0  lg:w-64 w-40 h-40 lg:h-64"
      >
        <Image src={imgs?.[1] || "/tiger.png"} alt="Decorative" className="object-contain object-top" fill />
      </div>
    </div>
  );
};

export default ImagesCute;
