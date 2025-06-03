"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { Globe, Check } from "lucide-react";

export function LanguageSettings() {
  const { language, changeLanguage, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

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
  ];

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleSave = () => {
    changeLanguage(selectedLanguage);
  };

  // Group languages by continent
  const africanLanguages = languages.slice(0, 7);
  const europeanLanguages = languages.slice(7);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          {t("settings.language")}
        </CardTitle>
        <CardDescription>
          Choose your preferred language for the interface
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">African Languages</h3>
            <RadioGroup
              value={selectedLanguage}
              onValueChange={handleLanguageChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              {africanLanguages.map((lang) => (
                <div
                  key={lang.id}
                  className={`flex items-center space-x-2 rounded-md border p-3 ${selectedLanguage === lang.id ? "border-primary" : ""}`}
                >
                  <RadioGroupItem value={lang.id} id={lang.id} />
                  <Label htmlFor={lang.id} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{lang.label}</span>
                        <span className="text-muted-foreground ml-2 text-sm">
                          ({lang.native})
                        </span>
                      </div>
                      {selectedLanguage === lang.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">European Languages</h3>
            <RadioGroup
              value={selectedLanguage}
              onValueChange={handleLanguageChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              {europeanLanguages.map((lang) => (
                <div
                  key={lang.id}
                  className={`flex items-center space-x-2 rounded-md border p-3 ${selectedLanguage === lang.id ? "border-primary" : ""}`}
                >
                  <RadioGroupItem value={lang.id} id={lang.id} />
                  <Label htmlFor={lang.id} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{lang.label}</span>
                        <span className="text-muted-foreground ml-2 text-sm">
                          ({lang.native})
                        </span>
                      </div>
                      {selectedLanguage === lang.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>{t("common.save")}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
