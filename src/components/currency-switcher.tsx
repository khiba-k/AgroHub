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
import { DollarSign } from "lucide-react";

interface CurrencySwitcherProps {
  defaultCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
}

export function CurrencySwitcher({
  defaultCurrency = "USD",
  onCurrencyChange = () => {},
}: CurrencySwitcherProps) {
  // Try to get currency from localStorage first, otherwise use default
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("preferredCurrency") || defaultCurrency;
    }
    return defaultCurrency;
  });

  const currencies = [
    { id: "USD", label: "USD ($)", symbol: "$" },
    { id: "ZAR", label: "ZAR (R)", symbol: "R" },
    { id: "KES", label: "KES (KSh)", symbol: "KSh" },
    { id: "LSL", label: "LSL (M)", symbol: "M" },
  ];

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    onCurrencyChange(value);
    // In a real app, this would update a global state or context
    // and potentially save the preference to localStorage
    localStorage.setItem("preferredCurrency", value);
  };

  const currentCurrency =
    currencies.find((c) => c.id === currency) || currencies[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 px-2 gap-1">
          <DollarSign className="h-4 w-4" />
          <span>{currentCurrency.symbol}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuRadioGroup
          value={currency}
          onValueChange={handleCurrencyChange}
        >
          {currencies.map((curr) => (
            <DropdownMenuRadioItem key={curr.id} value={curr.id}>
              {curr.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
