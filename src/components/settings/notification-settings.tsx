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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/i18n";
import { Bell } from "lucide-react";

export function NotificationSettings() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock notification settings
  const [settings, setSettings] = useState({
    // Email notifications
    emailOrders: true,
    emailShipments: true,
    emailMarketing: false,
    emailSocial: true,
    emailSecurity: true,

    // Push notifications
    pushOrders: true,
    pushShipments: true,
    pushMarketing: false,
    pushSocial: true,
    pushSecurity: true,

    // SMS notifications
    smsOrders: false,
    smsShipments: false,
    smsMarketing: false,
    smsSocial: false,
    smsSecurity: true,
  });

  const handleToggleChange = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success message or notification
      alert("Notification settings updated successfully");
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          {t("settings.notifications")}
        </CardTitle>
        <CardDescription>
          Manage how you receive notifications and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailOrders" className="flex-1">
                  Order updates
                </Label>
                <Switch
                  id="emailOrders"
                  checked={settings.emailOrders}
                  onCheckedChange={() => handleToggleChange("emailOrders")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="emailShipments" className="flex-1">
                  Shipment updates
                </Label>
                <Switch
                  id="emailShipments"
                  checked={settings.emailShipments}
                  onCheckedChange={() => handleToggleChange("emailShipments")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="emailMarketing" className="flex-1">
                  Marketing and promotions
                </Label>
                <Switch
                  id="emailMarketing"
                  checked={settings.emailMarketing}
                  onCheckedChange={() => handleToggleChange("emailMarketing")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="emailSocial" className="flex-1">
                  Social activity
                </Label>
                <Switch
                  id="emailSocial"
                  checked={settings.emailSocial}
                  onCheckedChange={() => handleToggleChange("emailSocial")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="emailSecurity" className="flex-1">
                  Security alerts
                </Label>
                <Switch
                  id="emailSecurity"
                  checked={settings.emailSecurity}
                  onCheckedChange={() => handleToggleChange("emailSecurity")}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Push Notifications</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="pushOrders" className="flex-1">
                  Order updates
                </Label>
                <Switch
                  id="pushOrders"
                  checked={settings.pushOrders}
                  onCheckedChange={() => handleToggleChange("pushOrders")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="pushShipments" className="flex-1">
                  Shipment updates
                </Label>
                <Switch
                  id="pushShipments"
                  checked={settings.pushShipments}
                  onCheckedChange={() => handleToggleChange("pushShipments")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="pushMarketing" className="flex-1">
                  Marketing and promotions
                </Label>
                <Switch
                  id="pushMarketing"
                  checked={settings.pushMarketing}
                  onCheckedChange={() => handleToggleChange("pushMarketing")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="pushSocial" className="flex-1">
                  Social activity
                </Label>
                <Switch
                  id="pushSocial"
                  checked={settings.pushSocial}
                  onCheckedChange={() => handleToggleChange("pushSocial")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="pushSecurity" className="flex-1">
                  Security alerts
                </Label>
                <Switch
                  id="pushSecurity"
                  checked={settings.pushSecurity}
                  onCheckedChange={() => handleToggleChange("pushSecurity")}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">SMS Notifications</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="smsOrders" className="flex-1">
                  Order updates
                </Label>
                <Switch
                  id="smsOrders"
                  checked={settings.smsOrders}
                  onCheckedChange={() => handleToggleChange("smsOrders")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="smsShipments" className="flex-1">
                  Shipment updates
                </Label>
                <Switch
                  id="smsShipments"
                  checked={settings.smsShipments}
                  onCheckedChange={() => handleToggleChange("smsShipments")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="smsSecurity" className="flex-1">
                  Security alerts
                </Label>
                <Switch
                  id="smsSecurity"
                  checked={settings.smsSecurity}
                  onCheckedChange={() => handleToggleChange("smsSecurity")}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("settings.saving") : t("common.save")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
