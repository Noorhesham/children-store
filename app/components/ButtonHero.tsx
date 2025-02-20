"use client";

import type React from "react";

interface HeroButtonProps {
  children: React.ReactNode;
  tag?: string;
  onClick?: () => void;
  className?: string;
}

const HeroButton = ({ children, tag, onClick, className = "" }: HeroButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`group relative duration-150    inline-flex items-center justify-center bg-white border-2 border-black rounded-[100px] px-8 py-2 text-lg font-bold transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] ${className}`}
    >
      <div className="relative z-10 flex items-center gap-3">
        {" "}
        {tag && (
          <span
            className="bg-[#FFD600] text-black text-sm px-4 py-1.5 rounded-[100px] font-medium whitespace-nowrap"
            style={{ fontFamily: "system-ui" }}
          >
            {tag}
          </span>
        )}
        <span className=" group-hover:text-white duration-150 text-black">{children}</span>
      </div>
      {/* Black shadow effect */}
      <span className="absolute inset-0 duration-150 bg-black rounded-[100px] translate-x-2 translate-y-2 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-200" />
    </button>
  );
};

export default HeroButton;
