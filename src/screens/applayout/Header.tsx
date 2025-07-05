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
import { Bell, Menu, MessageSquare, Search, } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { useUserStore, useFarmStore } from "@/lib/store/userStores";

interface HeaderProps {
    onMenuToggle?: () => void;
}

export function Header({
    onMenuToggle = () => { },
}: HeaderProps) {
    const router = useRouter();
    
    // Get user data from Zustand store
    const { email, avatar, role, clearUser } = useUserStore();
    const { farmName, clearFarm } = useFarmStore();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (res.ok) {
                // Clear both stores on logout
                clearUser();
                clearFarm();
                router.push('/welcome');
            }
        } catch (error) {
            console.log("Fetch error:", error);
        }
    }

    // Get user name from email (first part before @)
    const userName = email ? email.split('@')[0] : '';

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
{/* 
                <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for farmers, products, posts..."
                            className="w-full pl-8"
                        />
                    </div>
                </div> */}

                {/* <div className="flex items-center gap-3">
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
                    </Button> */}
                  <div className="flex items-center gap-2">
                    <ThemeSwitcher />
                   

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={avatar} alt={userName} />
                                    <AvatarFallback>{email?.charAt(0)?.toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {userName}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {email}
                                    </p>
                                    {farmName && (
                                        <p className="text-xs leading-none text-muted-foreground">
                                            Farm: {farmName}
                                        </p>
                                    )}
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {role && role.charAt(0).toUpperCase() + role.slice(1)}
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
                                console.log("Dropdown item clicked");
                                handleLogout();
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