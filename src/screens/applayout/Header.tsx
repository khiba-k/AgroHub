"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { Bell, Menu, MessageSquare, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { RoleSwitcher } from "./components/RoleSwitcher";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

interface HeaderProps {
    user?: {
        name: string;
        email: string;
        avatar: string;
        role: string;
    };
    onMenuToggle?: () => void;
    onRoleChange?: (role: string) => void;
}

export function Header({
    user = {
        name: "John Farmer",
        email: "john@agrohub.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        role: "farmer",
    },
    onMenuToggle = () => { },
    onRoleChange = () => { },
}: HeaderProps) {
    const router = useRouter();

    const handleLogout = async () => {
        try {

            const res = await fetch('/api/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })


            if (res.ok) {
                router.push('/welcome')
            }
        } catch (error) {
            console.log("Fetch error:", error);
        }
    }

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2 md:gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={onMenuToggle}
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                    <Logo size="md" />
                </div>

                <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for farmers, products, posts..."
                            className="w-full pl-8"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:block">
                        <RoleSwitcher currentRole={user.role} onRoleChange={onRoleChange} />
                    </div>

                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Search className="h-5 w-5 md:hidden" />
                        <span className="sr-only">Search</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                        onClick={() => router.push("/messages")}
                    >
                        <MessageSquare className="h-5 w-5" />
                        <span className="sr-only">Messages</span>
                    </Button>

                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>

                    <ThemeSwitcher />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {user.name}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user.email}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push("/profile")}>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push("/settings")}>
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                console.log("Dropdown item clicked") // Add this
                                handleLogout()
                            }}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
