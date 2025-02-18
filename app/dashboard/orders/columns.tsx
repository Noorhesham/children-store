import { IOrder } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";

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
];
