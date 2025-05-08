import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";

const Nav1 = () => {
  return (
    <div className="bg-[#FFE872] py -2 px-4">
      <MaxWidthWrapper noPadding className=" py-2 mx-auto flex items-center justify-center">
        {/* Social Links */}
        <div className="flex items-center  gap-3">
          <Link href="https://instagram.com/muslim_kids_muslimkids" className="text-rose-400 hover:opacity-75">
            <FaInstagram className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.facebook.com/share/12J6vPgbB4V/
"
            className="text-rose-400 hover:opacity-75"
          >
            <FaFacebook className="w-4 h-4" />
          </Link>

          <Link href="https://t.me/MUSLIM_KIDS_EG" className="text-rose-400 hover:opacity-75">
            <FaTelegram className="w-4 h-4" />
          </Link>
        </div>

        <div className="hidden w-full self-center mx-auto md:block text-center">
          <p className="text-sm font-medium">المتجر المثالي لجعل تعلم طفلك ممتعا </p>
        </div>

        {/* <div className="flex flex-1  gap-2  items-center ">
          <Button size={"sm"} className="" variant={"outline"}>
            EGP
          </Button>
          <div className="flex items-center bg-white rounded-md">
            <input type="text" placeholder="Search" className="px-3 py-1 rounded-l-md outline-none text-sm" />
            <button className="p-2">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div> */}
      </MaxWidthWrapper>
    </div>
  );
};

export default Nav1;
