import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className=" w-20 h-20 rounded-full overflow-hidden relative">
      <Image alt="muslim-kids" src={"/logo.jpg"} fill className=" " />
    </Link>
  );
};

export default Logo;
