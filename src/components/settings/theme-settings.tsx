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
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/i18n";
import { Moon, Sun, Monitor, Check } from "lucide-react";

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [selectedTheme, setSelectedTheme] = useState(theme || "system");

  useEffect(() => {
    if (theme) {
      setSelectedTheme(theme);
    }
  }, [theme]);

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
  };

  const handleSave = () => {
    setTheme(selectedTheme);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {selectedTheme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : selectedTheme === "light" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Monitor className="h-5 w-5" />
          )}
          {t("settings.theme")}
        </CardTitle>
        <CardDescription>
          Choose your preferred theme for the interface
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedTheme}
          onValueChange={handleThemeChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div
            className={`flex items-center space-x-2 rounded-md border p-4 ${selectedTheme === "light" ? "border-primary" : ""}`}
          >
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light" className="flex-1 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <span className="font-medium">Light</span>
                </div>
                {selectedTheme === "light" && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            </Label>
          </div>

          <div
            className={`flex items-center space-x-2 rounded-md border p-4 ${selectedTheme === "dark" ? "border-primary" : ""}`}
          >
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark" className="flex-1 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <span className="font-medium">Dark</span>
                </div>
                {selectedTheme === "dark" && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            </Label>
          </div>

          <div
            className={`flex items-center space-x-2 rounded-md border p-4 ${selectedTheme === "system" ? "border-primary" : ""}`}
          >
            <RadioGroupItem value="system" id="system" />
            <Label htmlFor="system" className="flex-1 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span className="font-medium">System</span>
                </div>
                {selectedTheme === "system" && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            </Label>
          </div>
        </RadioGroup>

        <div className="flex justify-end">
          <Button onClick={handleSave}>{t("common.save")}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
