import type { ComponentProps, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface InputDialogProps extends ComponentProps<typeof Dialog> {
  label: ReactNode;
  title: ReactNode;
  units?: ReactNode;
}

export function InputDialog({
  label,
  units,
  title,
  children,
  ...props
}: InputDialogProps) {
  return (
    <Dialog {...props}>
      <div className="group relative">
        <DialogTrigger className="h-20 w-full rounded-xl border-2 px-4 pb-6 pt-4 text-center text-2xl font-mono transition-all focus:scale-[1.02]">
          {label}
        </DialogTrigger>
        {units ? (
          <div className="pointer-events-none absolute bottom-2 right-3 text-xs font-medium text-muted-foreground/60">
            {units}
          </div>
        ) : null}
      </div>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
