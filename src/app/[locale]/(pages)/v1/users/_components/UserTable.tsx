"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userColumns } from "./UserTableColumns";
import { useState } from "react";
import { useUsersQuery } from "@/features/users/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale } from "next-intl";

const UserTable = () => {
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [searchFilter, setSearchFilter] = useState("");
  const locale = useLocale();

  const { data, isLoading, refetch } = useUsersQuery(page, {
    role: roleFilter,
    search: searchFilter,
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("User data:", data);

  if (isLoading) return <div>Loading users...</div>;

  if (!data || !data.data?.length) return <div>No users found.</div>;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search by name or email"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            onBlur={() => refetch()}
          />

          <Select
            value={roleFilter}
            onValueChange={(val) => {
              setRoleFilter(val || undefined);
              refetch();
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="MEMBER">Member</SelectItem>
              <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              <SelectItem value="clear">All Roles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link
          href={`/${locale}/v1/users/create`}
          className="inline-flex items-center"
        >
          <Button>Create User</Button>
        </Link>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <Button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Page {data?.meta.currentPage} of {data?.meta.totalPages}
        </div>

        <Button
          disabled={page >= (data?.meta.totalPages ?? 1)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default UserTable;
