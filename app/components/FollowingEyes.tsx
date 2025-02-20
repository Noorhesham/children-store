"use client";

import { useEffect, useState } from "react";

export const FollowingEyes = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eyes = document.querySelector(".eyes-container");
      if (!eyes) return;

      const rect = eyes.getBoundingClientRect();
      const eyesCenterX = rect.left + rect.width / 2;
      const eyesCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyesCenterY, e.clientX - eyesCenterX);

      const rotation = angle * (180 / Math.PI);
      setRotation({ x: Math.cos(angle) * 10, y: Math.sin(angle) * 10 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="eyes-container relative w-48 h-20 border-2 border-black bg-pink-300 rounded-2xl flex items-center justify-center gap-4 p-4">
      <div className="eye w-14 h-14 bg-white border border-black rounded-full flex items-center justify-center">
        <div
          className="pupil w-7 border-1 h-7 border-1 bg-black rounded-full relative"
          style={{
            transform: `translate(${rotation.x}px, ${rotation.y}px)`,
          }}
        >
          <div className="absolute w-3 h-3 bg-white  rounded-full top-1 left-1" />
        </div>
      </div>
      <div className="eye w-14 h-14 bg-white border border-black rounded-full flex items-center justify-center">
        <div
          className="pupil w-7 border-1 h-7 border-1 bg-black rounded-full relative"
          style={{
            transform: `translate(${rotation.x}px, ${rotation.y}px)`,
          }}
        >
          <div className="absolute w-3 h-3 bg-white rounded-full top-1 left-1" />
        </div>
      </div>
    </div>
  );
};
