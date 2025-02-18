"use client";
import React from "react";
import Logo from "./Logo";
import Cart from "./Cart";

import MaxWidthWrapper from "./defaults/MaxWidthWrapper";

const NavBar = () => {
  return (
    <nav className=" bg-white sticky z-50  top-0  inset-0 ">
      <header className=" relative bg-white">
        <MaxWidthWrapper noPadding>
          <div className=" border-b border-gray-200">
            <div className=" flex  items-center">
              <div className=" ml-4 flex lg:ml-0">
                <Logo />
              </div>

              <div className=" ml-auto flex items-center">
                <div className=" flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <div className=" ml-4 flex items-center justify-center text-center ">
                    <Cart />
                  </div>
                </div>
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
