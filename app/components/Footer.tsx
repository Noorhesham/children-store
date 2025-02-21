import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Globe } from "lucide-react";

const footerImages = ["/kid1.avif", "/kid2.jpg", "/kid3.jpg", "/kid4.jpg", "/kid5.webp", "/kid6.jpg"];

const usefulLinks = [
  { title: "Contact us", href: "/contact" },
  { title: "About Us", href: "/about" },
  { title: "Shipping & Returns", href: "/shipping" },
  { title: "Refund Policy", href: "/refund" },
];

const customerServices = [
  { title: "Orders", href: "/orders" },
  { title: "Addresses", href: "/addresses" },
  { title: "Account Details", href: "/account" },
  { title: "24x7 Calls", href: "/support" },
];

export default function Footer() {
  return (
    <footer className="relative">
      {/* Scalloped Border */}
      <div className="h-24 relative">
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
            <path
              d="M0,0 C150,120 350,0 500,120 C650,0 850,120 1000,0 C1150,120 1350,0 1500,120 L1500,120 L0,120 Z"
              className="fill-violet-600"
            />
          </svg>
        </div>
      </div>

      {/* Image Grid */}
      <div className="bg-violet-600 px-4 pt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-4">
          {footerImages.map((image, index) => (
            <div key={index} className="aspect-square rounded-2xl overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Footer image ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-violet-600 text-white px-4 py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        {/* <Image src="/sun.svg" alt="Sun" width={60} height={60} className="absolute top-20 left-[20%]" />
        <Image src="/star.svg" alt="Star" width={40} height={40} className="absolute top-40 left-[40%]" />
        <Image src="/rainbow.svg" alt="Rainbow" width={100} height={100} className="absolute bottom-40 left-20" />
        <Image src="/cloud.svg" alt="Cloud" width={80} height={80} className="absolute top-20 right-[20%]" /> */}

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          {/* <div className="space-y-4">
            <Image src="/logo.svg" alt="Titoo" width={150} height={50} />
            <p className="text-sm">1245, North Western Street</p>
            <p className="text-sm">Europia, Lumbia</p>
            <p className="text-sm">Call Us:+31 (0) 123 456 789</p>
            <p className="text-sm">chocolatier@admin.com</p>
          </div> */}

          {/* Useful Links */}
          {/* <div>
            <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Customer Services */}
          {/* <div>
            <h3 className="text-xl font-semibold mb-4">Customer Services</h3>
            <ul className="space-y-2">
              {customerServices.map((service) => (
                <li key={service.title}>
                  <Link href={service.href} className="text-sm hover:underline">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Need Help */}
          {/* <div>
            <h3 className="text-xl font-semibold mb-4">Need Help</h3>
            <div className="space-y-2">
              <p className="text-lg">+123 - 589 - 45895</p>
              <p className="text-lg">+123 - 589 - 45264</p>
              <div className="mt-4">
                <p className="font-semibold">Monday - Friday</p>
                <p className="text-sm">9am - 6pm</p>
              </div>
              <div>
                <p className="font-semibold">Saturday</p>
                <p className="text-sm">9am - 3pm</p>
              </div>
              <p className="text-sm">Sunday - Closed</p>
            </div>
          </div> */}
        </div>

        {/* Social Media & Delivery */}
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Delivery</h3>
            <div className="space-y-2">
              <Link href="/delivery" className="text-sm block hover:underline">
                Free Delivery
              </Link>
              <Link href="/faq" className="text-sm block hover:underline">
                FAQ
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Social Media</h3>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-yellow-300 transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="hover:text-yellow-300 transition-colors">
                <Globe size={24} />
              </Link>
              <Link href="#" className="hover:text-yellow-300 transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="hover:text-yellow-300 transition-colors">
                <Instagram size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Payment Methods */}
      <div className="bg-[#FFD93D] px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2023 titoo. All Rights Reserved.</p>
          <div className="flex gap-2">
            <Image src="/visa.svg" alt="Visa" width={40} height={25} />
            <Image src="/mastercard.svg" alt="Mastercard" width={40} height={25} />
            <Image src="/paypal.svg" alt="PayPal" width={40} height={25} />
            <Image src="/skrill.svg" alt="Skrill" width={40} height={25} />
            <Image src="/neteller.svg" alt="Neteller" width={40} height={25} />
            <Image src="/google-pay.svg" alt="Google Pay" width={40} height={25} />
          </div>
        </div>
      </div>
    </footer>
  );
}
