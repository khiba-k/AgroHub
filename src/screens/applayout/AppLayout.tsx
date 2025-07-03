"use client";

import { getUserObj } from "@/actions/auth/BasicAuthActions";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import SideBar from "./SideBar";
import { getFarmerInfoRequest } from "./utils/Requests";
import { useUserStore, useFarmStore } from "@/lib/store/userStores";

interface DashboardLayoutProps {
    children: ReactNode;
    userRole?: string;
    onRoleChange?: (role: string) => void;
}

export function AppLayout({
    children,
}: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    // Zustand stores
    const { setUser, setLoading: setUserLoading } = useUserStore();
    const { setFarm, setLoading: setFarmLoading } = useFarmStore();

    // Fetch user and farm data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setUserLoading(true);
                setFarmLoading(true);

                const user = await getUserObj();
                if (user) {
                    // Store user data in Zustand
                    setUser({
                        userId: user.id,
                        email: user.email,
                        avatar: user.metadata?.avatar_url || "",
                        role: user.metadata?.role || "",
                    });

                    // Fetch and store farmer-specific info
                    const farmerDetails = await getFarmerInfoRequest();
                    if (farmerDetails) {
                        setFarm({
                            farmId: farmerDetails.farmId,
                            farmName: farmerDetails.farmName,
                            farmDetails: farmerDetails,
                        });
                    } else {
                        console.log("No farmer details found.");
                    }
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setUserLoading(false);
                setFarmLoading(false);
            }
        };

        fetchUserData();
    }, [setUser, setFarm, setUserLoading, setFarmLoading]);
    // const toggleSidebar = () => {
    //     setSidebarOpen(!sidebarOpen);
    // };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // const handleRoleChange = (newRole: string) => {
    //     setRole(newRole);
    //     // Call parent handler if provided
    //     if (onRoleChange) {
    //         onRoleChange(newRole);
    //     }
    // };


    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <SideBar className="hidden md:block"
                
            />

            {/* Mobile sidebar */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={toggleMobileMenu}
                    ></div>
                    <div className="fixed inset-y-0 left-0 w-[240px] bg-background">
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    onMenuToggle={toggleMobileMenu}
                    // onRoleChange={handleRoleChange}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="container mx-auto max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
}