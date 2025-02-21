"use client";

import React from "react";
import { Truck, ShieldCheck, HeadphonesIcon, BookOpen, HelpingHand as PrayingHands, Heart } from "lucide-react";

const benefits = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
    title: "منتجات آمنة",
    description: "جميع منتجاتنا مطابقة للمعايير الإسلامية والتربوية",
  },
  {
    icon: <Truck className="w-10 h-10 text-blue-600" />,
    title: "توصيل سريع",
    description: "توصيل مجاني لجميع الطلبات داخل المملكة",
  },
  //   {
  //     icon: <HeadphonesIcon className="w-10 h-10 text-purple-600" />,
  //     title: "دعم متواصل",
  //     description: "فريق دعم متخصص لمساعدتك في اختيار الأفضل لأطفالك",
  //   },
  {
    icon: <BookOpen className="w-10 h-10 text-yellow-600" />,
    title: "محتوى تعليمي",
    description: "محتوى تربوي يجمع بين المتعة والتعليم",
  },
  {
    icon: <PrayingHands className="w-10 h-10 text-teal-600" />,
    title: "قيم إسلامية",
    description: "نغرس القيم الإسلامية من خلال اللعب والتعلم",
  },
  //   {
  //     icon: <Heart className="w-10 h-10 text-red-600" />,
  //     title: "ضمان الجودة",
  //     description: "ضمان استبدال لمدة 30 يوماً على جميع المنتجات",
  //   },
];

const StoreBenefits = () => {
  return (
    <section className="border-t border-gray-200 bg-[#FDF7F2]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-6 ${
                index !== benefits.length - 1 ? "border-b md:border-b-0 md:border-r" : "border-b md:border-b-0"
              } border-gray-200`}
            >
              <div className="flex-shrink-0">{benefit.icon}</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-500">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreBenefits;
