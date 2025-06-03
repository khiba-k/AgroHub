"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/lib/i18n";
import { MapPin, Ruler, Droplets, Landmark, Phone, Mail } from "lucide-react";

interface LandDetailsProps {
  land: any;
}

export function LandDetails({ land }: LandDetailsProps) {
  const { t } = useTranslation();

  // Function to get currency symbol
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "ZAR":
        return "R";
      case "KES":
        return "KSh";
      case "LSL":
        return "M";
      case "USD":
        return "$";
      default:
        return "$";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="rounded-lg overflow-hidden">
            <img
              src={land.image}
              alt={land.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="md:w-1/2 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{land.title}</h2>
            <p className="text-muted-foreground flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" /> {land.location}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Badge>{land.investmentType}</Badge>
            <Badge variant="outline">
              {land.soilType} {t("landInvestment.soil")}
            </Badge>
            {land.waterAccess && (
              <Badge
                variant="outline"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              >
                {t("landInvestment.waterAccess")}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t("landInvestment.size")}
              </p>
              <p className="font-medium flex items-center">
                <Ruler className="h-4 w-4 mr-1" /> {land.size}{" "}
                {t("landInvestment.hectares")}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t("landInvestment.price")}
              </p>
              <p className="font-medium">
                {getCurrencySymbol(land.currency)}
                {land.price.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t("landInvestment.pricePerHectare")}
              </p>
              <p className="font-medium">
                {getCurrencySymbol(land.currency)}
                {land.pricePerHectare.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t("landInvestment.waterAccess")}
              </p>
              <p className="font-medium flex items-center">
                <Droplets className="h-4 w-4 mr-1" />{" "}
                {land.waterAccess ? t("common.yes") : t("common.no")}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">
              {t("landInvestment.ownerInformation")}
            </h3>
            <p className="text-sm">{land.owner.name}</p>
            <p className="text-sm flex items-center">
              <Phone className="h-4 w-4 mr-1" /> {land.owner.contact}
            </p>
          </div>

          <div className="pt-4 flex space-x-3">
            <Button className="flex-1">
              <Landmark className="mr-2 h-4 w-4" />{" "}
              {t("landInvestment.investNow")}
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="mr-2 h-4 w-4" />{" "}
              {t("landInvestment.contactOwner")}
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">
            {t("landInvestment.description")}
          </TabsTrigger>
          <TabsTrigger value="location">
            {t("landInvestment.location")}
          </TabsTrigger>
          <TabsTrigger value="investment">
            {t("landInvestment.investmentDetails")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="p-4 border rounded-md mt-2">
          <p>{land.description}</p>
        </TabsContent>
        <TabsContent value="location" className="p-4 border rounded-md mt-2">
          <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">
              {t("landInvestment.mapViewPlaceholder")}
            </p>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">
              {t("landInvestment.locationDetails")}
            </h4>
            <p className="mt-2">
              {t("landInvestment.locationDescription", {
                location: land.location,
              })}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="investment" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">
                {t("landInvestment.investmentType")}
              </h4>
              <p className="mt-1">{land.investmentType}</p>
            </div>
            <div>
              <h4 className="font-semibold">
                {t("landInvestment.investmentTerms")}
              </h4>
              <p className="mt-1">
                {land.investmentType === "Full Purchase"
                  ? t("landInvestment.fullPurchaseTerms")
                  : land.investmentType.includes("Lease")
                    ? t("landInvestment.leaseTerms")
                    : t("landInvestment.partnershipTerms")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">
                {t("landInvestment.potentialReturns")}
              </h4>
              <p className="mt-1">{t("landInvestment.returnsDescription")}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="pt-4 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              {t("landInvestment.scheduleVisit")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("landInvestment.scheduleVisit")}</DialogTitle>
              <DialogDescription>
                {t("landInvestment.scheduleVisitDescription")}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-muted-foreground">
                {t("landInvestment.schedulingPlaceholder")}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
