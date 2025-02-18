import { ColumnDef } from "@tanstack/react-table";
import { ICategory } from "@/app/types";

export const categoryColumns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];
