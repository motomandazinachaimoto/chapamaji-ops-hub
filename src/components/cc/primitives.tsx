import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Inbox, Loader2, Lock } from "lucide-react";

/* ---------------------------------- Page --------------------------------- */

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="space-y-6 p-6 xl:p-8">{children}</div>;
}

/* --------------------------------- Panel ---------------------------------- */

export function Panel({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("panel overflow-hidden", className)}>
      {title ? (
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
            {description ? (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions}
        </div>
      ) : null}
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </section>
  );
}

/* --------------------------------- States --------------------------------- */

export function EmptyState({
  title = "No data",
  message = "Nothing to show yet. Data appears here once the platform records activity.",
  icon: Icon = Inbox,
}: {
  title?: string;
  message?: string;
  icon?: typeof Inbox;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <div className="rounded-full border border-border bg-surface-2 p-3">
        <Icon className="size-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">{title}</p>
      <p className="max-w-sm text-xs text-muted-foreground">{message}</p>
    </div>
  );
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 px-6 py-14 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" /> {label}…
    </div>
  );
}

export function ErrorState({
  message = "This panel could not load. Check the connection to the platform backend and retry.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <AlertTriangle className="size-5 text-destructive" />
      <p className="text-sm font-medium">Failed to load</p>
      <p className="max-w-sm text-xs text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button className="mt-2" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}

export function UnauthorizedState({ permission }: { permission: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <Lock className="size-5 text-warning" />
      <p className="text-sm font-medium">Not authorised</p>
      <p className="max-w-sm text-xs text-muted-foreground">
        Your admin role does not include{" "}
        <span className="numeric text-foreground">{permission}</span>.
      </p>
    </div>
  );
}

/* --------------------------------- Button --------------------------------- */

type ButtonVariant = "primary" | "outline" | "ghost" | "danger" | "accent";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:brightness-110",
  accent: "bg-accent text-accent-foreground hover:brightness-110",
  outline: "border border-border-strong bg-transparent hover:bg-surface-2",
  ghost: "hover:bg-surface-2 text-muted-foreground hover:text-foreground",
  danger: "bg-destructive text-destructive-foreground hover:brightness-110",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-all",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

/* --------------------------------- Badges --------------------------------- */

export type StatusTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary"
  | "accent";

const toneClasses: Record<StatusTone, string> = {
  neutral: "border-border-strong text-muted-foreground",
  success: "border-success/40 text-success bg-success/10",
  warning: "border-warning/40 text-warning bg-warning/10",
  danger: "border-destructive/40 text-destructive bg-destructive/10",
  info: "border-info/40 text-info bg-info/10",
  primary: "border-primary/40 text-primary bg-primary/10",
  accent: "border-accent/40 text-accent bg-accent/10",
};

export function StatusBadge({
  tone = "neutral",
  dot = true,
  children,
  className,
}: {
  tone?: StatusTone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
    >
      {dot ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

export function LiveDot({ tone = "success" }: { tone?: "success" | "warning" | "danger" }) {
  const color =
    tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-destructive";
  return <span className={cn("live-dot size-2 rounded-full bg-current", color)} />;
}

/* --------------------------------- Metrics -------------------------------- */

export function StatCard({
  label,
  value,
  hint,
  tone = "neutral",
  icon: Icon,
  live,
}: {
  label: string;
  value: number | string | null;
  hint?: string;
  tone?: StatusTone;
  icon?: typeof Inbox;
  live?: boolean;
}) {
  const accent =
    tone === "primary"
      ? "text-primary"
      : tone === "accent"
        ? "text-accent"
        : tone === "danger"
          ? "text-destructive"
          : tone === "warning"
            ? "text-warning"
            : tone === "success"
              ? "text-success"
              : "text-foreground";

  return (
    <div className="panel group relative overflow-hidden p-4">
      <div className="flex items-start justify-between">
        <span className="label-caps">{label}</span>
        {live ? <LiveDot /> : Icon ? <Icon className="size-4 text-muted-foreground" /> : null}
      </div>
      <p className={cn("numeric mt-3 text-3xl leading-none font-semibold", accent)}>
        {value ?? "—"}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{hint ?? "No data source connected"}</p>
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}

/* --------------------------------- Tables --------------------------------- */

export function TableFrame({
  columns,
  children,
  empty,
}: {
  columns: string[];
  children?: ReactNode;
  empty?: ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((c) => (
              <th key={c} className="label-caps px-4 py-2.5 text-left whitespace-nowrap">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {children ? null : (empty ?? <EmptyState />)}
    </div>
  );
}

/* --------------------------------- Filters -------------------------------- */

export function FilterTabs({ tabs }: { tabs: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-md border border-border bg-surface-2 p-1">
      {tabs.map((t, i) => (
        <button
          key={t}
          className={cn(
            "rounded px-3 py-1.5 text-xs font-medium transition-colors",
            i === 0
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:bg-surface hover:text-foreground",
          )}
        >
          {t}
          <span className="numeric ml-2 opacity-60">0</span>
        </button>
      ))}
    </div>
  );
}

export function SearchInput({ placeholder = "Search…" }: { placeholder?: string }) {
  return (
    <input
      type="search"
      placeholder={placeholder}
      className="h-9 w-full rounded-md border border-border bg-input px-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none sm:w-64"
    />
  );
}
