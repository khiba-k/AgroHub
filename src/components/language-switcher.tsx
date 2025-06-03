"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  defaultLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

export function LanguageSwitcher({
  defaultLanguage = "en",
  onLanguageChange = () => {},
}: LanguageSwitcherProps) {
  const [language, setLanguage] = useState(defaultLanguage);

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
      onLanguageChange(savedLanguage);
    }
  }, [onLanguageChange]);

  // Languages from every continent plus Sesotho
  const languages = [
    // Africa
    { id: "en", label: "English", native: "English" },
    { id: "st", label: "Sesotho", native: "Sesotho" },
    { id: "sw", label: "Swahili", native: "Kiswahili" },
    { id: "xh", label: "Xhosa", native: "isiXhosa" },
    { id: "zu", label: "Zulu", native: "isiZulu" },
    { id: "ar", label: "Arabic", native: "العربية" },
    { id: "am", label: "Amharic", native: "አማርኛ" },

    // Europe
    { id: "fr", label: "French", native: "Français" },
    { id: "es", label: "Spanish", native: "Español" },
    { id: "de", label: "German", native: "Deutsch" },
    { id: "pt", label: "Portuguese", native: "Português" },
    { id: "ru", label: "Russian", native: "Русский" },

    // Asia
    { id: "zh", label: "Chinese", native: "中文" },
    { id: "hi", label: "Hindi", native: "हिन्दी" },
    { id: "ja", label: "Japanese", native: "日本語" },
    { id: "ko", label: "Korean", native: "한국어" },

    // North America
    { id: "es-mx", label: "Spanish (Mexico)", native: "Español (México)" },

    // South America
    { id: "pt-br", label: "Portuguese (Brazil)", native: "Português (Brasil)" },

    // Oceania
    { id: "mi", label: "Maori", native: "Te Reo Māori" },
  ];

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    onLanguageChange(value);
    localStorage.setItem("preferredLanguage", value);
    document.documentElement.lang = value;
  };

  const currentLanguage =
    languages.find((l) => l.id === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 px-2 gap-1">
          <Globe className="h-4 w-4" />
          <span>{currentLanguage.native}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] max-h-[400px] overflow-y-auto"
      >
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={handleLanguageChange}
        >
          {languages.map((lang) => (
            <DropdownMenuRadioItem key={lang.id} value={lang.id}>
              <span className="flex justify-between w-full">
                <span>{lang.label}</span>
                <span className="text-muted-foreground">{lang.native}</span>
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
