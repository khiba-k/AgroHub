"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Leaf,
  Store,
  Truck,
  Package,
  Briefcase,
  ShoppingBag,
  ChevronDown,
  Landmark,
} from "lucide-react";

interface RoleSwitcherProps {
  currentRole?: string;
  onRoleChange?: (role: string) => void;
}

export function RoleSwitcher({
  currentRole = "farmer",
  onRoleChange = () => {},
}: RoleSwitcherProps) {
  const roles = [
    { id: "farmer", label: "Farmer", icon: Leaf },
    { id: "retailer", label: "Retailer", icon: Store },
    { id: "logistics", label: "Logistics Partner", icon: Truck },
    { id: "distributor", label: "Distributor", icon: Package },
    { id: "service", label: "Service Provider", icon: Briefcase },
    { id: "investor", label: "Investor", icon: Landmark },
    { id: "consumer", label: "Consumer", icon: ShoppingBag },
  ];

  const currentRoleObj =
    roles.find((role) => role.id === currentRole) || roles[0];
  const Icon = currentRoleObj.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{currentRoleObj.label}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={currentRole}
          onValueChange={onRoleChange}
        >
          {roles.map((role) => {
            const RoleIcon = role.icon;
            return (
              <DropdownMenuRadioItem
                key={role.id}
                value={role.id}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <RoleIcon className="h-4 w-4" />
                  <span>{role.label}</span>
                </div>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
