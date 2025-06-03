"use client";

import { ReactNode, useState, useEffect } from "react";
import { Header } from "./header";
import SidebarNavigation from "./sidebar-navigation";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: string;
  onRoleChange?: (role: string) => void;
}

export function DashboardLayout({
  children,
  userRole = "farmer",
  onRoleChange,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(userRole);
  const router = useRouter();

  // Update local state when prop changes
  useEffect(() => {
    setRole(userRole);
  }, [userRole]);

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

  // Generate avatar seed based on role
  const getAvatarSeed = () => {
    const roleMap: Record<string, string> = {
      farmer: "john",
      retailer: "sarah",
      logistics: "michael",
      distributor: "david",
      service: "emma",
      consumer: "lisa",
    };
    return roleMap[role] || "john";
  };

  // Generate name based on role
  const getName = () => {
    const nameMap: Record<string, string> = {
      farmer: "John Farmer",
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
      <SidebarNavigation className="hidden md:block" userRole={role} />

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={toggleMobileMenu}
          ></div>
          <div className="fixed inset-y-0 left-0 w-[240px] bg-background">
            <SidebarNavigation userRole={role} />
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
            email: `${role}@agrohub.com`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed()}`,
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
