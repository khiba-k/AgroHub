"use client";

import { Button } from "@/components/ui/button";
import { Plus, MenuIcon, Leaf } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import AgroHubAddProductForm from "../listings/components/AgroHubAddProductForm";
import InviteForm from "@/screens/invite/InviteForm";
import { useFarmStore, useUserStore } from "@/lib/store/userStores";

const AgroHubHeader = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { email, avatar, role, clearUser } = useUserStore();
  const { farmName, clearFarm } = useFarmStore();
  const router = useRouter();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        clearUser();
        clearFarm();
        router.push("/welcome");
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  const userName = email ? email.split("@")[0] : "";

  return (
    <>
      <header className="border-b border-gray-200">
        <div className="mx-auto px-6 py-3 flex items-center justify-between">
          {/* 🧭 Sidebar Icon + AgroHub */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              {/* <MenuIcon className="w-6 h-6" /> */}
            </Button>
            <Leaf className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">AgroHub</h1>
          </div>

          {/* 🧑‍💼 Right Actions - Includes Add Produce for Small Screens, Theme, Profile */}
          <div className="flex items-center gap-2">
            {/* Plus icon for 'Add New Produce' - Visible only on small screens */}
            <Button
              onClick={() => setShowAddProduct(true)}
              className="sm:hidden bg-black hover:bg-gray-800 text-white rounded-full p-2 h-8 w-8"
              size="icon"
            >
              <Plus className="w-4 h-4" />
            </Button>

            {/* Full 'Add New Produce' button - Hidden on small screens */}
            <Button
              onClick={() => setShowAddProduct(true)}
              className="hidden sm:flex bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Produce</span>
            </Button>

            <ThemeSwitcher />

            {/* Profile Dropdown */}
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
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{email}</p>
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

                {/* ✅ Invite User Trigger */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Invite User
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="max-w-md border-none">
                    <InviteForm closeDialog={handleDialogClose} />
                  </DialogContent>
                </Dialog>

                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Add Produce Dialog */}
      <AgroHubAddProductForm
        showAddProduct={showAddProduct}
        setShowAddProduct={setShowAddProduct}
      />
    </>
  );
};

export default AgroHubHeader;
