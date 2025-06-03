"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  MessageSquare,
  ShoppingCart,
  Users,
  BarChart,
  Settings,
  Leaf,
  Truck,
  Store,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
  userRole?: string;
}

export function Sidebar({ className, userRole = "farmer" }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      roles: [
        "farmer",
        "retailer",
        "logistics",
        "distributor",
        "service",
        "consumer",
      ],
    },
    {
      label: "Social Feed",
      icon: Users,
      href: "/social",
      roles: [
        "farmer",
        "retailer",
        "logistics",
        "distributor",
        "service",
        "consumer",
      ],
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/messages",
      roles: [
        "farmer",
        "retailer",
        "logistics",
        "distributor",
        "service",
        "consumer",
      ],
    },
    {
      label: "Marketplace",
      icon: ShoppingCart,
      href: "/marketplace",
      roles: [
        "farmer",
        "retailer",
        "logistics",
        "distributor",
        "service",
        "consumer",
      ],
    },
    {
      label: "Farm Analytics",
      icon: BarChart,
      href: "/analytics",
      roles: ["farmer"],
    },
    {
      label: "My Produce",
      icon: Leaf,
      href: "/produce",
      roles: ["farmer"],
    },
    {
      label: "My Store",
      icon: Store,
      href: "/store",
      roles: ["retailer"],
    },
    {
      label: "Deliveries",
      icon: Truck,
      href: "/deliveries",
      roles: ["logistics"],
    },
    {
      label: "Services",
      icon: Briefcase,
      href: "/services",
      roles: ["service"],
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      roles: [
        "farmer",
        "retailer",
        "logistics",
        "distributor",
        "service",
        "consumer",
      ],
    },
  ];

  const filteredRoutes = routes.filter((route) =>
    route.roles.includes(userRole),
  );

  return (
    <div className={cn("pb-12 h-full bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {filteredRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === route.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
