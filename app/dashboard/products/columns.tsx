"use client";
import { IProduct } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import ModelCustom from "@/app/components/ModelCustom";
import { ProductForm } from "@/app/components/forms/ProductForm";
import DeleteSingle from "@/app/components/DeleteSingle";

export const productColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "images",
    header: "الصور",
    cell: ({ row }) => {
      const images = row.original.images;
      const firstImage = images[0];

      return (
        <div className="w-20 h-20 relative">
          <Image src={firstImage.secure_url} alt={row.original.title} fill className="object-cover rounded" />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "العنوان",
  },
  {
    accessorKey: "category",
    header: "الفئة",
    cell: ({ row }) => row.original.category?.name,
  },
  {
    accessorKey: "price",
    header: "السعر",
    cell: ({ row }) => `${row.original.price.toFixed(2)}ج.م `,
  },
  {
    accessorKey: "stock",
    header: "المخزون",
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الإنشاء",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">فتح القائمة</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-2" align="end">
            <DropdownMenuItem asChild>
              <Link href={`/product/${product._id}`}>عرض المنتج</Link>
            </DropdownMenuItem>
            <ModelCustom
              btn={<Button className=" w-full">تعديل</Button>}
              title="تعديل المنتج"
              content={<ProductForm defaultValues={product} />}
            />
            <DeleteSingle data={product} entity="product" />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Placeholder functions - implement these in your component
