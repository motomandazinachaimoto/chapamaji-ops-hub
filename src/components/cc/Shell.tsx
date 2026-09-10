import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { navGroups } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { LiveDot } from "./primitives";
import { Menu, Search, ShieldCheck, X } from "lucide-react";

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-8 place-items-center rounded-md bg-primary/15 ring-1 ring-primary/40">
        <span className="size-3 rounded-sm bg-primary" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold tracking-tight">CHAPAMAJI</span>
        <span className="label-caps block text-[10px]">Command Center</span>
      </span>
    </div>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="space-y-5 px-3 pb-8">
      {navGroups.map((group) => (
        <div key={group.title}>
          <p className="label-caps px-2 pb-1.5">{group.title}</p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    className={cn(
                      "group relative flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                      active
                        ? "bg-primary/12 text-primary"
                        : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                    )}
                  >
                    {active ? (
                      <span className="absolute top-1.5 bottom-1.5 -left-3 w-0.5 rounded-r bg-primary" />
                    ) : null}
                    <item.icon className="size-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur xl:px-6">
      <button
        onClick={onMenu}
        className="rounded-md p-2 text-muted-foreground hover:bg-surface-2 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-4" />
      </button>

      <div className="relative hidden flex-1 md:block">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search users, orders, riders, branches…"
          className="h-9 w-full max-w-md rounded-md border border-border bg-input pr-3 pl-9 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <span className="hidden items-center gap-2 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground sm:inline-flex">
          <LiveDot /> Realtime not connected
        </span>
        <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1">
          <ShieldCheck className="size-4 text-primary" />
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-medium">Not signed in</p>
            <p className="label-caps text-[10px]">No role</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-surface lg:flex">
        <div className="flex h-14 items-center border-b border-border px-4">
          <Wordmark />
        </div>
        <div className="flex-1 overflow-y-auto pt-4">
          <SidebarNav />
        </div>
        <div className="border-t border-border px-4 py-3">
          <p className="label-caps text-[10px]">Control plane</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Changes here affect the Chapamaji mobile app.
          </p>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-border bg-surface">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-surface-2"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pt-4">
              <SidebarNav onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="lg:pl-60">
        <TopBar onMenu={() => setOpen(true)} />
        <main>{children}</main>
      </div>
    </div>
  );
}
