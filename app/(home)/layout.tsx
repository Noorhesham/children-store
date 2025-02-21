import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Nav1 from "../components/Nav1";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "مسلم كيدز - متجر الأطفال الإسلامي",
  description: "متجر مسلم كيدز - تسوق أفضل المنتجات للأطفال المسلمين",
  keywords: ["مسلم كيدز", "متجر إسلامي", "منتجات أطفال", "ألعاب تعليمية إسلامية"],
  openGraph: {
    title: "مسلم كيدز - متجر الأطفال الإسلامي",
    description: "متجر مسلم كيدز - تسوق أفضل المنتجات للأطفال المسلمين",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Nav1 />
      <NavBar />
      <Suspense>
        <div>{children}</div>
      </Suspense>{" "}
      <Toaster />
      <Footer />
    </main>
  );
}
