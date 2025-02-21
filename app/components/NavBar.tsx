"use client";
import React from "react";
import Logo from "./Logo";
import Cart from "./Cart";

import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import HeroButton from "./ButtonHero";
import { CartSheet } from "./CartSheet";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className=" bg-main backdrop-blur-md sticky z-50  top-0  inset-0 ">
      <header className=" relative bg-main">
        <MaxWidthWrapper noPadding>
          <div className=" border-b border-gray-200">
            <div className=" flex flex-row-reverse  justify-between w-full  items-center">
              <div className=" ml-4 flex lg:ml-0">
                <Logo />
              </div>

              <div className=" flex items-center gap-5">
                <CartSheet />
                <Link href={"/products"}>
                  <HeroButton className=" text-sm">الكاتلوج</HeroButton>
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </nav>
  );
};

export default NavBar;
// {auth.loading ? (
//   <Skeleton className=" w-8 h-8 rounded-full" />
// ) : user ? (
//   <User user={user} />
// ) : (
//   <SignButtons />
// )}
