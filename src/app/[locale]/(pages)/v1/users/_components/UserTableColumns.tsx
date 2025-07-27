"use client";

import { User } from "@/features/users/types";
import { UserActionDropdown } from "@/v1/users/_components/UserActionsDropdown";
import { ColumnDef } from "@tanstack/react-table";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "accountStatus",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: any }) => {
      const user = row.original;
      return <UserActionDropdown user={user} />;
    },
  },
];

export default userColumns;
