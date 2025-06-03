"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/i18n";
import { Shield, Key, Smartphone } from "lucide-react";

export function SecuritySettings() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock security settings
  const [settings, setSettings] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    passwordExpiry: true,
  });

  const handleToggleChange = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success message or notification
      alert("Password updated successfully");

      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            {t("settings.changePassword")}
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                {t("settings.currentPassword")}
              </Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">{t("settings.newPassword")}</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("settings.confirmPassword")}
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("settings.updating")
                  : t("settings.updatePassword")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t("settings.securitySettings")}
          </CardTitle>
          <CardDescription>
            Manage your account security preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactorEnabled" className="text-base">
                  {t("settings.twoFactorAuth")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  Secure your account with two-factor authentication
                </p>
              </div>
              <Switch
                id="twoFactorEnabled"
                checked={settings.twoFactorEnabled}
                onCheckedChange={() => handleToggleChange("twoFactorEnabled")}
              />
            </div>

            {settings.twoFactorEnabled && (
              <div className="ml-6 p-4 border rounded-md bg-muted/50">
                <div className="flex items-center gap-4">
                  <Smartphone className="h-12 w-12 text-primary" />
                  <div>
                    <h4 className="font-medium">
                      Set up two-factor authentication
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Use an authenticator app to generate verification codes
                    </p>
                    <Button size="sm" className="mt-2">
                      Set up now
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="loginNotifications" className="text-base">
                  {t("settings.loginNotifications")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for new login attempts
                </p>
              </div>
              <Switch
                id="loginNotifications"
                checked={settings.loginNotifications}
                onCheckedChange={() => handleToggleChange("loginNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="passwordExpiry" className="text-base">
                  {t("settings.passwordExpiry")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  Require password change every 90 days
                </p>
              </div>
              <Switch
                id="passwordExpiry"
                checked={settings.passwordExpiry}
                onCheckedChange={() => handleToggleChange("passwordExpiry")}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {t("settings.sessionManagement")}
            </h3>
            <p className="text-sm text-muted-foreground">
              You are currently logged in on 2 devices
            </p>

            <Button variant="outline" className="w-full">
              {t("settings.logoutAllDevices")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
