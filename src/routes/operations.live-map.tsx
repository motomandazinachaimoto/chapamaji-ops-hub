import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, LiveDot, Panel, StatusBadge } from "@/components/cc/primitives";
import { cn } from "@/lib/utils";
import { Layers, Locate, RadioTower, Search } from "lucide-react";

export const Route = createFileRoute("/operations/live-map")({
  head: () => ({
    meta: [
      { title: "Live Operations Map — Chapamaji Command Center" },
      {
        name: "description",
        content:
          "Full-screen live map of Chapamaji riders, deliveries, vendors and branches with layer controls.",
      },
      { property: "og:title", content: "Live Operations Map — Chapamaji Command Center" },
      {
        property: "og:description",
        content: "Live map of riders, deliveries, vendors and branches.",
      },
    ],
  }),
  component: LiveMap,
});

const layers = [
  { key: "riders", label: "Active riders", on: true },
  { key: "deliveries", label: "Active deliveries", on: true },
  { key: "vendors", label: "Vendors", on: true },
  { key: "branches", label: "Branches", on: true },
  { key: "trails", label: "Rider location trails", on: true },
  { key: "offline", label: "Offline riders", on: false },
  { key: "suspended", label: "Suspended accounts", on: false },
];

function LiveMap() {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(layers.map((l) => [l.key, l.on])),
  );

  return (
    <div className="relative h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Map canvas placeholder — replaced by the live map once the location feed is connected */}
      <div className="grid-backdrop absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,var(--surface-2),var(--background)_70%)]">
        <div className="absolute inset-x-0 top-1/3 h-px overflow-hidden">
          <div className="sweep-line h-px w-1/3 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <RadioTower className="size-6 text-muted-foreground" />
          <p className="text-sm font-medium">No live positions</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            The map renders rider positions, delivery routes, vendors and branches from the
            platform location feed. Nothing is plotted until that feed reports data.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="absolute top-4 left-4 z-10 w-72">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Find rider, order or branch"
            className="h-10 w-full rounded-md border border-border bg-surface/90 pr-3 pl-9 text-sm backdrop-blur focus:border-primary/60 focus:outline-none"
          />
        </div>
      </div>

      {/* Layer control */}
      <div className="panel absolute top-4 right-4 z-10 w-64 bg-surface/92 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <Layers className="size-4 text-primary" />
          <span className="text-sm font-semibold">Layers</span>
        </div>
        <ul className="p-2">
          {layers.map((l) => (
            <li key={l.key}>
              <label className="flex cursor-pointer items-center justify-between rounded px-2 py-1.5 text-[13px] hover:bg-surface-2">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={state[l.key]}
                    onChange={() =>
                      setState((s) => ({ ...s, [l.key]: !s[l.key] }))
                    }
                    className="size-3.5 accent-[var(--primary)]"
                  />
                  {l.label}
                </span>
                <span className="numeric text-xs text-muted-foreground">0</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Status strip */}
      <div className="panel absolute bottom-4 left-4 z-10 flex items-center gap-4 bg-surface/92 px-4 py-2.5 backdrop-blur">
        <span className="flex items-center gap-2 text-xs">
          <LiveDot tone="warning" /> Location feed offline
        </span>
        <span className="text-xs text-muted-foreground">
          Riders <span className="numeric text-foreground">0</span>
        </span>
        <span className="text-xs text-muted-foreground">
          Deliveries <span className="numeric text-foreground">0</span>
        </span>
        <span className="text-xs text-muted-foreground">
          Branches <span className="numeric text-foreground">0</span>
        </span>
      </div>

      {/* Selection panel */}
      <div className="absolute inset-y-0 right-0 z-20 hidden w-80 border-l border-border bg-surface/95 backdrop-blur xl:block">
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <span className="label-caps">Selection</span>
          <StatusBadge tone="neutral">Nothing selected</StatusBadge>
        </div>
        <div className="space-y-4 p-4">
          <p className="text-xs text-muted-foreground">
            Select a rider or branch on the map to inspect it. The panel shows identity, status,
            current delivery, last location update and the actions permitted by your admin role.
          </p>

          <Panel title="Rider panel fields" bodyClassName="p-3">
            <ul className="space-y-1 text-xs text-muted-foreground">
              {[
                "Name & phone",
                "Status & vehicle",
                "Current delivery / order",
                "Last location update",
                "Coordinates & speed",
              ].map((f) => (
                <li key={f} className="flex justify-between gap-3">
                  <span>{f}</span>
                  <span className="text-foreground/50">—</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="outline" disabled>
                View rider
              </Button>
              <Button variant="outline" disabled>
                View order
              </Button>
              <Button variant="danger" className="col-span-2" disabled>
                Restrict account
              </Button>
            </div>
          </Panel>

          <Panel title="Branch panel fields" bodyClassName="p-3">
            <ul className="space-y-1 text-xs text-muted-foreground">
              {[
                "Vendor & branch name",
                "Status & location",
                "Active staff",
                "Active riders",
                "Current orders",
              ].map((f) => (
                <li key={f} className="flex justify-between gap-3">
                  <span>{f}</span>
                  <span className="text-foreground/50">—</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="outline" disabled>
                View branch
              </Button>
              <Button variant="danger" disabled>
                Suspend
              </Button>
            </div>
          </Panel>
        </div>
      </div>

      <button
        className={cn(
          "panel absolute right-4 bottom-4 z-10 grid size-10 place-items-center bg-surface/92 backdrop-blur",
          "text-muted-foreground hover:text-foreground xl:right-[21.5rem]",
        )}
        aria-label="Recenter map"
      >
        <Locate className="size-4" />
      </button>
    </div>
  );
}
