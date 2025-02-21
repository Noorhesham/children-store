"use client";
import { IOrder } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import ModelCustom from "@/app/components/ModelCustom";
import { Button } from "@/components/ui/button";
import DeleteSingle from "@/app/components/DeleteSingle";
import { OrderForm } from "@/app/components/forms/OrderForm";
export const orderColumns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.status.toUpperCase(),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => row.original.paymentStatus.toUpperCase(),
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
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
              content={<OrderForm defaultValues={product} />}
            />
            <DeleteSingle data={product} entity="Order" />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
