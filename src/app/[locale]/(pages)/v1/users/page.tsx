"use client";

import { useTranslations } from "next-intl";
import UserTable from "@/v1/users/_components/UserTable";

const UserPage = () => {
  const t = useTranslations("Translation");
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">User Lists</h1>
      <UserTable />
    </div>
  );
};

export default UserPage;
