"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useMemo, useRef, useCallback } from "react";

gsap.registerPlugin(ScrollTrigger);

export const charsTospans = (
  text: string,
  className: string,
  width?: string,
  height?: string,
  selectorClassName?: string
) => {
  return text.split("<br>").map((line, lineIndex) => (
    <div
      className={` ${height || "h-12"} will-change-transform overflow-hidden ${selectorClassName || ""} line flex flex-wrap`}
      key={lineIndex}
    >
      {line.split("").map((char, charIndex) =>
        char === " " ? (
          <span key={charIndex} className={`inline-block ${width || "w-[5px]"} whitespace-nowrap`}>
            {" "}
          </span>
        ) : (
          <span className={` ${className} inline-flex overflow-hidden`} key={charIndex}>
            {char}
          </span>
        )
      )}
    </div>
  ));
};

const Paragraph = React.memo(
  ({
    text,
    className,
    animate = true,
    height,
    playAfterTL,
    timeline,
    width,
    text2,
    delay = 0,
  }: {
    text: string;
    className?: string;
    animate?: boolean;
    height?: string;
    playAfterTL?: boolean;
    timeline?: gsap.core.Timeline;
    text2?: string;
    width?: string;
    delay?: number;
  }) => {
    const paragraphRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);

    const memoizedText = useMemo(
      () =>
        animate
          ? charsTospans(text, animate ? "opacity-0 skew-x-12 translate-y-16" : "", width, height, className)
          : text,
      [text, animate]
    );

    const runAnimation = useCallback(() => {
      if (!animate || !paragraphRef.current) return null;

      const spans = paragraphRef.current.querySelectorAll("span") as NodeListOf<HTMLElement>;
      if (!spans.length) return null;

      const paragraphAnimation = gsap.timeline().to(spans, {
        y: 0,
        skewX: 0,
        stagger: { amount: 0.5 },
        autoAlpha: 1,
        delay,
      });

      return paragraphAnimation;
    }, [animate, delay]);

    useEffect(() => {
      // Wait for locoScroll to be ready before setting up animations

      const ctx = gsap.context(() => {
        const animation = runAnimation();

        if (animation) {
          if (playAfterTL && timeline) {
            timeline.add(animation, "<");
          } else if (playAfterTL) {
            gsap.timeline().add(animation);
          } else {
            ScrollTrigger.create({
              trigger: paragraphRef.current,
              start: "top 94%",
              end: "bottom 40%",
              animation: animation,
              scroller: ".main-container",
            });
          }

          animationRef.current = animation;
        }
      });

      return () => {
        ctx.revert();
        animationRef.current?.kill();
      };
    }, [ runAnimation, playAfterTL, timeline]);

    return (
      <div
        ref={paragraphRef}
        className={`${className || "lg:text-5xl"} flex flex-wrap flex-col max-w-2xl  font-normal`}
      >
        {memoizedText}
      </div>
    );
  }
);

export default Paragraph;
