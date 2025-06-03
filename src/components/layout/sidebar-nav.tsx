"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Gavel,
  Landmark,
  MessageSquare,
  BarChart,
  User,
  Settings,
  Store,
  Leaf,
  Briefcase,
  Truck,
  Package,
  MapPin,
  DollarSign,
  Activity,
} from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const items = [
    {
      href: "/social",
      title: t("navigation.social"),
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: "/marketplace",
      title: t("navigation.marketplace"),
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
    },
    {
      href: "/auctions",
      title: t("navigation.auctions"),
      icon: <Gavel className="mr-2 h-4 w-4" />,
    },
    {
      href: "/land-investment",
      title: t("navigation.landInvestment"),
      icon: <Landmark className="mr-2 h-4 w-4" />,
    },
    {
      href: "/messages",
      title: t("navigation.messages"),
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      href: "/analytics",
      title: t("navigation.analytics"),
      icon: <BarChart className="mr-2 h-4 w-4" />,
    },
    {
      href: "/store",
      title: t("navigation.store"),
      icon: <Store className="mr-2 h-4 w-4" />,
    },
    {
      href: "/produce",
      title: t("navigation.produce"),
      icon: <Leaf className="mr-2 h-4 w-4" />,
    },
    {
      href: "/services",
      title: t("navigation.services"),
      icon: <Briefcase className="mr-2 h-4 w-4" />,
    },
    {
      href: "/deliveries",
      title: t("navigation.deliveries"),
      icon: <Truck className="mr-2 h-4 w-4" />,
    },
    {
      href: "/orders",
      title: t("navigation.orders"),
      icon: <Package className="mr-2 h-4 w-4" />,
    },
    {
      href: "/shipments",
      title: t("navigation.shipments"),
      icon: <MapPin className="mr-2 h-4 w-4" />,
    },
    {
      href: "/finance",
      title: t("navigation.finance"),
      icon: <DollarSign className="mr-2 h-4 w-4" />,
    },
    {
      href: "/tracking",
      title: t("navigation.tracking"),
      icon: <Activity className="mr-2 h-4 w-4" />,
    },
    {
      href: "/profile",
      title: t("navigation.profile"),
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      href: "/settings",
      title: t("navigation.settings"),
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard",
      title: t("navigation.dashboard"),
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href
              ? "bg-accent text-accent-foreground"
              : "transparent",
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
