"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { navItems } from "@/screens/applayout/utils/AgroHubNavData";
import {
    ChevronDown,
    Leaf,
    Menu,
    X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarNavigationProps {
    className?: string;
    userRole?: string;
    avatar?: string;
}

interface NavItem {
    label: string;
    icon: React.ElementType;
    href: string;
    roles: string[];
    badge?: string;
    children?: NavItem[];
}

export default function SideBar({
    className,
    userRole = "farmer",
    avatar,
}: SidebarNavigationProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);


    const filteredNavItems = navItems.filter((item) =>
        item.roles.includes(userRole),
    );

    const user = {
        name: "John Farmer",
        role: "Farmer",
        avatar: avatar,
    };


    return (
        <>
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="rounded-full"
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </Button>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-40 transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}
            >
                <div
                    className="bg-background/80 backdrop-blur-sm absolute inset-0"
                    onClick={() => setMobileOpen(false)}
                ></div>
                <nav className="relative w-3/4 max-w-sm h-full bg-background border-r shadow-lg flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <Leaf className="h-6 w-6 text-primary" />
                            <span className="font-bold text-xl text-primary">AgroHub</span>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.role}</p>
                            </div>
                        </div>
                    </div>
                    <ScrollArea className="flex-1 p-3">
                        <div className="space-y-1">
                            {filteredNavItems.map((item) => {
                                if (item.children) {
                                    return (
                                        <Collapsible key={item.href} className="w-full">
                                            <CollapsibleTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className={cn(
                                                        "w-full justify-between font-normal",
                                                        pathname.startsWith(item.href) &&
                                                        "bg-accent text-accent-foreground",
                                                    )}
                                                >
                                                    <div className="flex items-center">
                                                        <item.icon className="mr-2 h-4 w-4" />
                                                        <span>{item.label}</span>
                                                        {item.badge && (
                                                            <Badge variant="outline" className="ml-2">
                                                                {item.badge}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="pl-6 pt-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className={cn(
                                                            "flex items-center py-2 px-3 text-sm rounded-md hover:bg-accent hover:text-accent-foreground",
                                                            pathname === child.href &&
                                                            "bg-accent text-accent-foreground",
                                                        )}
                                                        onClick={() => setMobileOpen(false)}
                                                    >
                                                        <child.icon className="mr-2 h-4 w-4" />
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </CollapsibleContent>
                                        </Collapsible>
                                    );
                                }
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground",
                                            pathname === item.href &&
                                            "bg-accent text-accent-foreground",
                                        )}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <item.icon className="mr-2 h-4 w-4" />
                                        <span>{item.label}</span>
                                        {item.badge && (
                                            <Badge variant="outline" className="ml-auto">
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </nav>
            </div>

            {/* Desktop Sidebar */}
            <div
                className={cn(
                    "hidden md:flex h-full flex-col bg-background border-r transition-all duration-300",
                    isOpen ? "w-64" : "w-[70px]",
                    className,
                )}
            >
                <div
                    className={cn(
                        "p-4 border-b flex",
                        isOpen ? "justify-between" : "justify-center",
                    )}
                >
                    {isOpen ? (
                        <Link href="/" className="flex items-center space-x-2">
                            <Leaf className="h-6 w-6 text-primary" />
                            <span className="font-bold text-xl text-primary">AgroHub</span>
                        </Link>
                    ) : (
                        <Link href="/" className="flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-primary" />
                        </Link>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        className="h-8 w-8"
                    >
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 transition-transform",
                                isOpen ? "rotate-0" : "rotate-180",
                            )}
                        />
                    </Button>
                </div>

                {isOpen && (
                    <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.role}</p>
                            </div>
                        </div>
                    </div>
                )}

                <ScrollArea className="flex-1 py-3">
                    <div className={cn("space-y-1", isOpen ? "px-3" : "px-2")}>
                        {filteredNavItems.map((item) => {
                            if (item.children && isOpen) {
                                return (
                                    <Collapsible key={item.href} className="w-full">
                                        <CollapsibleTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-between font-normal",
                                                    pathname.startsWith(item.href) &&
                                                    "bg-accent text-accent-foreground",
                                                )}
                                            >
                                                <div className="flex items-center">
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    <span>{item.label}</span>
                                                    {item.badge && (
                                                        <Badge variant="outline" className="ml-2">
                                                            {item.badge}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="pl-6 pt-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className={cn(
                                                        "flex items-center py-2 px-3 text-sm rounded-md hover:bg-accent hover:text-accent-foreground",
                                                        pathname === child.href &&
                                                        "bg-accent text-accent-foreground",
                                                    )}
                                                >
                                                    <child.icon className="mr-2 h-4 w-4" />
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                );
                            }
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center rounded-md hover:bg-accent hover:text-accent-foreground",
                                        isOpen ? "py-2 px-3" : "py-2 justify-center",
                                        pathname === item.href &&
                                        "bg-accent text-accent-foreground",
                                    )}
                                    title={!isOpen ? item.label : undefined}
                                >
                                    <item.icon className={cn("h-4 w-4", isOpen && "mr-2")} />
                                    {isOpen && <span>{item.label}</span>}
                                    {isOpen && item.badge && (
                                        <Badge variant="outline" className="ml-auto">
                                            {item.badge}
                                        </Badge>
                                    )}
                                    {!isOpen && item.badge && (
                                        <Badge
                                            variant="outline"
                                            className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 h-5 w-5 p-0 flex items-center justify-center rounded-full"
                                        >
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
        </>
    );
}
