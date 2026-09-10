import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Page,
  PageHeader,
  Panel,
  StatCard,
  EmptyState,
  StatusBadge,
  LiveDot,
  Button,
  TableFrame,
} from "@/components/cc/primitives";
import {
  Activity,
  BadgeCheck,
  Bike,
  Building2,
  ClipboardList,
  CreditCard,
  Map as MapIcon,
  Siren,
  Store,
  Truck,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — Chapamaji Command Center" },
      {
        name: "description",
        content:
          "Real-time overview of Chapamaji platform operations: users, riders, vendors, orders, deliveries and alerts.",
      },
      { property: "og:title", content: "Overview — Chapamaji Command Center" },
      {
        property: "og:description",
        content: "Real-time overview of Chapamaji platform operations.",
      },
    ],
  }),
  component: Overview,
});

const services = [
  "API",
  "Database",
  "Authentication",
  "Realtime",
  "Storage",
  "Notifications",
  "Payments (KCB Buni)",
  "GPS pipeline",
];

function Overview() {
  return (
    <Page>
      <PageHeader
        title="Overview"
        subtitle="Live state of the Chapamaji platform. All figures read from the platform database — no placeholder values are shown."
        actions={
          <>
            <Button variant="outline">Last 24h</Button>
            <Link
              to="/operations/live-map"
              className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              <MapIcon className="size-4" /> Open live map
            </Link>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Total users" value={0} icon={Users} hint="All registered accounts" />
        <StatCard label="Active now" value={0} tone="primary" live hint="Presence in last 5 min" />
        <StatCard label="Riders online" value={0} tone="primary" live hint="Reporting GPS" />
        <StatCard label="Active vendors" value={0} icon={Store} hint="Verified & trading" />
        <StatCard label="Active branches" value={0} icon={Building2} hint="Open branches" />
        <StatCard label="Orders today" value={0} icon={ClipboardList} hint="Created since 00:00" />
        <StatCard label="Active deliveries" value={0} tone="accent" icon={Truck} hint="In transit" />
        <StatCard
          label="Pending verifications"
          value={0}
          tone="warning"
          icon={BadgeCheck}
          hint="Riders + vendors awaiting review"
        />
        <StatCard
          label="Failed payments"
          value={0}
          tone="danger"
          icon={CreditCard}
          hint="Last 24 hours"
        />
        <StatCard label="System alerts" value={0} tone="danger" icon={Siren} hint="Unresolved" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Live operations feed"
          description="Order, delivery and verification events streamed from the platform"
          actions={
            <span className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
              <LiveDot tone="warning" /> Awaiting realtime connection
            </span>
          }
          bodyClassName="p-0"
        >
          <EmptyState
            title="No events yet"
            message="Once the Command Center is connected to the platform realtime channel, order, rider and verification events stream here as they happen."
            icon={Activity}
          />
        </Panel>

        <Panel title="Active users" description="By role, from presence signals">
          <ul className="space-y-2.5">
            {[
              { label: "Customers", icon: Users },
              { label: "Riders", icon: Bike },
              { label: "Vendors", icon: Store },
              { label: "Staff", icon: Building2 },
            ].map((r) => (
              <li
                key={r.label}
                className="flex items-center justify-between rounded-md border border-border bg-surface-2 px-3 py-2.5"
              >
                <span className="flex items-center gap-2 text-sm">
                  <r.icon className="size-4 text-muted-foreground" />
                  {r.label}
                </span>
                <span className="numeric text-sm font-semibold">0</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            A user counts as active only when a session or activity signal was recorded recently.
          </p>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel
          title="Verification queue"
          description="Oldest pending submissions first"
          className="xl:col-span-2"
          bodyClassName="p-0"
          actions={
            <Link
              to="/verification/riders"
              className="text-xs font-medium text-primary hover:underline"
            >
              Open verification
            </Link>
          }
        >
          <TableFrame
            columns={["Applicant", "Type", "Submitted", "Documents", "Status"]}
            empty={
              <EmptyState
                title="Queue is clear"
                message="No rider or vendor applications are waiting for review."
                icon={BadgeCheck}
              />
            }
          />
        </Panel>

        <Panel title="System health" description="Measured signals only">
          <ul className="space-y-1.5">
            {services.map((s) => (
              <li
                key={s}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-surface-2"
              >
                <span>{s}</span>
                <StatusBadge tone="neutral">Not measured</StatusBadge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Page>
  );
}
