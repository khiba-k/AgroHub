"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Role =
  | "farmer"
  | "retailer"
  | "logistics"
  | "distributor"
  | "service"
  | "consumer"
  | "investor";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  userName: string;
  userEmail: string;
  userAvatar: string;
}

const defaultContext: RoleContextType = {
  role: "farmer",
  setRole: () => {},
  userName: "John Farmer",
  userEmail: "john@agrohub.com",
  userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
};

const RoleContext = createContext<RoleContextType>(defaultContext);

export function useRole() {
  return useContext(RoleContext);
}

interface RoleProviderProps {
  children: ReactNode;
  initialRole?: Role;
}

export function RoleProvider({
  children,
  initialRole = "farmer",
}: RoleProviderProps) {
  const [role, setRole] = useState<Role>(initialRole);

  // Generate avatar seed based on role
  const getAvatarSeed = (currentRole: Role) => {
    const roleMap: Record<Role, string> = {
      farmer: "john",
      retailer: "sarah",
      logistics: "michael",
      distributor: "david",
      service: "emma",
      consumer: "lisa",
      investor: "alex",
    };
    return roleMap[currentRole] || "john";
  };

  // Generate name based on role
  const getName = (currentRole: Role) => {
    const nameMap: Record<Role, string> = {
      farmer: "John Farmer",
      retailer: "Sarah Retailer",
      logistics: "Michael Logistics",
      distributor: "David Distributor",
      service: "Emma Provider",
      consumer: "Lisa Consumer",
      investor: "Alex Investor",
    };
    return nameMap[currentRole] || "John Farmer";
  };

  const userName = getName(role);
  const userEmail = `${role}@agrohub.com`;
  const userAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(role)}`;

  return (
    <RoleContext.Provider
      value={{ role, setRole, userName, userEmail, userAvatar }}
    >
      {children}
    </RoleContext.Provider>
  );
}
