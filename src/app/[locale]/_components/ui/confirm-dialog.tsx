"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  title?: string;
  description?: string;
  method: () => void;
  t: any;
};

const ConfirmDialog = ({
  open,
  setOpen,
  title = "Confirm",
  description = "Are you sure?",
  method,
  t,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-2 text-sm text-muted-foreground">{description}</div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            {t("cancel") ?? "Cancel"}
          </Button>
          <Button
            onClick={() => {
              method();
              setOpen(false);
            }}
          >
            {t("confirm") ?? "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
