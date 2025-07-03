import {
  BarChart,
  Briefcase,
  Home,
  Leaf,
  Settings,
  ShoppingCart,
  Store,
  Truck
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
      icon: Home,
      href: "/admin/agrohub/listings",
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
      label: "Cart",
      icon: ShoppingCart,
      href: "/admin/agrohub/cart",
      roles: [
          "farmer", "retailer", "logistics", "distributor", "service", "consumer",],
      
  },
  {
      label: "Orders",
      icon: BarChart,
      href: "/admin/agrohub/orders",
      roles: ["farmer", "retailer", "distributor", "consumer"],
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
