import {
  LayoutDashboard,
  Map,
  ClipboardList,
  Truck,
  Users,
  Bike,
  Store,
  Building2,
  UserCog,
  BadgeCheck,
  FileCheck2,
  Files,
  ToggleRight,
  CreditCard,
  Settings2,
  Bell,
  Wallet,
  ArrowLeftRight,
  Banknote,
  BarChart3,
  ShieldBan,
  UserMinus,
  ScrollText,
  Siren,
  Activity,
  Power,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    title: "Command",
    items: [{ label: "Overview", to: "/", icon: LayoutDashboard }],
  },
  {
    title: "Operations",
    items: [
      { label: "Live Map", to: "/operations/live-map", icon: Map },
      { label: "Orders", to: "/operations/orders", icon: ClipboardList },
      { label: "Deliveries", to: "/operations/deliveries", icon: Truck },
    ],
  },
  {
    title: "Users",
    items: [
      { label: "Customers", to: "/users/customers", icon: Users },
      { label: "Riders", to: "/users/riders", icon: Bike },
      { label: "Vendors", to: "/users/vendors", icon: Store },
      { label: "Branches", to: "/users/branches", icon: Building2 },
      { label: "Staff", to: "/users/staff", icon: UserCog },
    ],
  },
  {
    title: "Verification",
    items: [
      { label: "Rider Verification", to: "/verification/riders", icon: BadgeCheck },
      { label: "Vendor Verification", to: "/verification/vendors", icon: FileCheck2 },
      { label: "Documents", to: "/verification/documents", icon: Files },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "Features", to: "/platform/features", icon: ToggleRight },
      { label: "Subscriptions", to: "/platform/subscriptions", icon: CreditCard },
      { label: "System Settings", to: "/platform/settings", icon: Settings2 },
      { label: "Notifications", to: "/platform/notifications", icon: Bell },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Payments", to: "/finance/payments", icon: Wallet },
      { label: "Transactions", to: "/finance/transactions", icon: ArrowLeftRight },
      { label: "Settlements", to: "/finance/settlements", icon: Banknote },
    ],
  },
  {
    title: "Analytics",
    items: [{ label: "Analytics", to: "/analytics", icon: BarChart3 }],
  },
  {
    title: "Security",
    items: [
      { label: "Restrictions", to: "/security/restrictions", icon: ShieldBan },
      { label: "Suspensions", to: "/security/suspensions", icon: UserMinus },
      { label: "Audit Logs", to: "/security/audit-logs", icon: ScrollText },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Alerts", to: "/system/alerts", icon: Siren },
      { label: "System Health", to: "/system/health", icon: Activity },
      { label: "Emergency Controls", to: "/system/emergency", icon: Power },
    ],
  },
];
