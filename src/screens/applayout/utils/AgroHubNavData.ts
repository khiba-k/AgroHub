import {
  BarChart,
  Briefcase,
  Home,
  Leaf,
  Settings,
  ShoppingCart,
  Store,
  Truck,
  List
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  roles: string[];
  badge?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
      label: "Listings",
      icon: List,
      href: "/admin/agrohub/listings",
      roles: [
          "agrohub",
      ],
  },

  
 
  {
      label: "Cart",
      icon: ShoppingCart,
      href: "/admin/agrohub/cart",
      roles: [
          "agrohub",],
      
  },
  {
      label: "Orders",
      icon: BarChart,
      href: "/admin/agrohub/orders",
      roles: ["agrohub"],
  },

  {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        roles: [
            "agrohub",
        ],
    },
  
];
