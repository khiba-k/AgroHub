"use client";

import { getUserObj } from "@/actions/auth/BasicAuthActions";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import SideBar from "./SideBar";

interface DashboardLayoutProps {
    children: ReactNode;
    userRole?: string;
    onRoleChange?: (role: string) => void;
}

export function AppLayout({
    children,
    onRoleChange,
}: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [role, setRole] = useState<string>("");
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState<string>("");
    const router = useRouter();

    // Update local state when prop changes

    // Fetch user email and avatar on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserObj();
                if (user) {
                    setEmail(user.email);
                    setAvatar(user.metadata?.avatar_url);
                    setRole(user.metadata?.role)
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleRoleChange = (newRole: string) => {
        setRole(newRole);
        // Call parent handler if provided
        if (onRoleChange) {
            onRoleChange(newRole);
        }
    };


    // Generate name based on role
    const getName = () => {
        const nameMap: Record<string, string> = {
            farmer: "Khiba Farmer",
            retailer: "Sarah Retailer",
            logistics: "Michael Logistics",
            distributor: "David Distributor",
            service: "Emma Provider",
            consumer: "Lisa Consumer",
        };
        return nameMap[role] || "John Farmer";
    };

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <SideBar className="hidden md:block" userRole={role} avatar={avatar} />

            {/* Mobile sidebar */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={toggleMobileMenu}
                    ></div>
                    <div className="fixed inset-y-0 left-0 w-[240px] bg-background">
                        <SideBar userRole={role} avatar={avatar} />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    onMenuToggle={toggleMobileMenu}
                    onRoleChange={handleRoleChange}
                    user={{
                        name: getName(),
                        email: email,
                        avatar: avatar,
                        role: role,
                    }}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="container mx-auto max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
}