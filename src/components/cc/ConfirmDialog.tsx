import { useState, type ReactNode } from "react";
import { Button } from "./primitives";
import { AlertTriangle } from "lucide-react";

/**
 * Reusable confirmation dialog for sensitive actions.
 * Requires an explicit reason before the confirm button becomes available.
 */
export function ConfirmAction({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  requireReason = true,
  destructive = true,
  onConfirm,
}: {
  trigger: (open: () => void) => ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  requireReason?: boolean;
  destructive?: boolean;
  onConfirm?: (reason: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const blocked = requireReason && reason.trim().length < 4;

  return (
    <>
      {trigger(() => setOpen(true))}
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="panel relative w-full max-w-md p-5 shadow-2xl">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-md border border-destructive/40 bg-destructive/10">
                <AlertTriangle className="size-4 text-destructive" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{description}</p>
              </div>
            </div>

            {requireReason ? (
              <div className="mt-4">
                <label className="label-caps" htmlFor="confirm-reason">
                  Reason (required, stored in audit log)
                </label>
                <textarea
                  id="confirm-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full resize-none rounded-md border border-border bg-input p-2.5 text-sm focus:border-primary/60 focus:outline-none"
                  placeholder="Describe why this action is being taken"
                />
              </div>
            ) : null}

            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant={destructive ? "danger" : "primary"}
                disabled={blocked}
                onClick={() => {
                  onConfirm?.(reason);
                  setReason("");
                  setOpen(false);
                }}
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
