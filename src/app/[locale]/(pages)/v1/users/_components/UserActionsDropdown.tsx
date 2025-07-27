"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MapPinned,
  Download,
  Pencil,
  Trash2,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import ConfirmDialog from "@/app/[locale]/_components/ui/confirm-dialog";
import { useState } from "react";
import { useUserActionHandlers } from "@/features/users/hooks/useUserActionHandlers";
import type { User } from "@/features/users/types";
import { useTranslations, useLocale } from "next-intl";

export const UserActionDropdown = ({ user }: { user: User }) => {
  const [openDialog, setOpenDialog] = useState<null | "delete" | "export">(
    null
  );
  const locale = useLocale();

  const { onEdit, onDelete, onExport } = useUserActionHandlers(user);
  const t = useTranslations("Translation");

  const dialogConfig = {
    delete: {
      title: t("delete"),
      description: t("confirmDialogText"),
      method: onDelete,
    },
    export: {
      title: t("export"),
      description: t("confirmDialogText"),
      method: onExport,
    },
  };

  const currentDialog = openDialog ? dialogConfig[openDialog] : null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>{t("setting")}</DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link
              href={`/${locale}/users/${user.id}/location`}
              className="w-full"
            >
              <MapPinned className="mr-2 h-4 w-4" />
              {t("requestLocation")}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setOpenDialog("export")}>
            <Download className="mr-2 h-4 w-4" />
            {t("export")}
          </DropdownMenuItem>

          {/* {(role === "ADMIN" || role === "SUPER_ADMIN") && ( */}
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={onEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              {t("edit")}
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>{t("dangerZone")}</DropdownMenuLabel>

            <DropdownMenuItem
              onSelect={() => setOpenDialog("delete")}
              className="text-red-500 focus:text-red-500"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t("delete")}
            </DropdownMenuItem>
          </>
          {/* )} */}
        </DropdownMenuContent>
      </DropdownMenu>

      {currentDialog && (
        <ConfirmDialog
          open={!!openDialog}
          setOpen={(open) => setOpenDialog(open ? openDialog : null)}
          title={currentDialog.title}
          description={currentDialog.description}
          method={currentDialog.method}
          t={t}
        />
      )}
    </>
  );
};
