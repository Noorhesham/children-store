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
      <div ref={leftImageRef} className="absolute z-10 -left-20 top-0 w-64 h-64">
        <Image src={imgs?.[0] || "/monkey.png"} alt="Decorative" className="object-contain object-top" fill />
      </div>
      <div ref={rightImageRef} className="absolute -right-20 top-0 w-64 h-64">
        <Image src={imgs?.[1] || "/tiger.png"} alt="Decorative" className="object-contain object-top" fill />
      </div>
    </div>
  );
};

export default ImagesCute;
