import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import Nav1 from "./components/Nav1";
import QueryProvider from "./utils/QueryProvider";
import { CartProvider } from "./utils/CartProvider";
const geistSans = Cairo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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
    <html dir="rtl" lang="ar">
      <body className={`${geistSans.className} bg-[#fdf3e7] antialiased`}>
        <QueryProvider>
          <CartProvider>
            <div className="">{children}</div> <Toaster />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
