import AnimatedImage from "@/app/components/AnimatedImage";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Order from "@/app/models/Order";
import connect from "@/app/utils/clientPromise";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const page = async ({ searchParams }: { searchParams: { orderId?: string } }) => {
  await connect();
  const order = await Order.findById(searchParams.orderId);
  console.log(order);
  return (
    <MaxWidthWrapper className="flex flex-col items-center">
      <div className="w-96 h-96 relative">
        <AnimatedImage data="animate2.json" className="w-full h-full absolute inset-0" />
      </div>
      <p className="text-xl font-semibold text-center mt-4">
        لقد تم وضع طلبك بنجاح ! كلها مسألة وقت بسيط حتي نتواصل معك يا صديقي 😀
      </p>
      <a
        href={`https://wa.me/201552269233?text=${encodeURIComponent(
          `أهلا، أنا ${order?.firstName}\nرقم: ${order?.phone}\nالإيميل: ${order?.email}\nالعنوان: ${order?.address}\nأود متابعة الأوردر`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mt-6"
      >
        <FaWhatsapp size={24} />
        <span>تتبع طلبك عبر واتساب</span>
      </a>
    </MaxWidthWrapper>
  );
};

export default page;
