"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ICategory } from "@/app/types";
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
import { Button } from "@/components/ui/button";
import CategoryForm from "@/app/components/forms/CategoryForm";
import Image from "next/image";
export const categoryColumns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "images",
    header: "الصور",
    cell: ({ row }) => {
      const firstImage = row.original.image;

      return (
        <div className="w-20 h-20 relative">
          <Image src={firstImage.secure_url} alt={row.original.name} fill className="object-cover rounded" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
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
            <ModelCustom
              btn={<Button className=" w-full">تعديل</Button>}
              title="تعديل التصنيف"
              content={<CategoryForm defaultValues={product} />}
            />
            <DeleteSingle data={product} entity="category" />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
