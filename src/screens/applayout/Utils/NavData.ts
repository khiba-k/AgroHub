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

    
    /*
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
        badge: "New",
        children: [
            {
                label: "My Feed",
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
                label: "Trending",
                icon: Users,
                href: "/social/trending",
                roles: [
                    "farmer",
                    "retailer",
                    "logistics",
                    "distributor",
                    "service",
                    "consumer",
                ],
            },
        ],
    },
    */
   /*
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
        badge: "3",
    },
    */
    {
        label: "Marketplace",
        icon: ShoppingCart,
        href: "/marketplace",
        roles: [
            "farmer", "retailer", "logistics", "distributor", "service", "consumer",],
        /*
        children: [
            {
                label: "Browse Products",
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
                label: "My Orders",
                icon: ShoppingCart,
                href: "/marketplace/orders",
                roles: ["farmer", "retailer", "consumer"],
            },
            
        ],
        */
    },
    {
        label: "Auctions",
        icon: BarChart,
        href: "/auctions",
        roles: ["farmer", "retailer", "distributor", "consumer"],
    },
    /*
    {
        label: "Farm Analytics",
        icon: BarChart,
        href: "/analytics",
        roles: ["farmer"],
    },
    */
    {
        label: "My Produce",
        icon: Leaf,
        href: "/produce",
        roles: [
            "farmer"
        ],
        children: [
            {
                label: "Listings",
                icon: ShoppingCart,
                href: "/produce",
                roles: [
                    "farmer",
                    "retailer",
                    "logistics",
                    "distributor",
                    "service",
                ],
            },
        
            {
                label: "Orders",
                icon: ShoppingCart,
                href: "/produce/orders",
                roles: ["farmer", "retailer"],
            },
        
        ],
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
