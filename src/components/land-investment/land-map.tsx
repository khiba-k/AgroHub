"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus, Maximize, Filter } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function LandMap() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            {t("landInvestment.landMap")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("landInvestment.viewAvailableLand")}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" /> {t("landInvestment.filterMap")}
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {/* This would be replaced with an actual map component in a real application */}
            <div className="aspect-[16/9] bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">
                  {t("landInvestment.interactiveMapPlaceholder")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("landInvestment.showingListings")}
                </p>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full shadow-md"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full shadow-md"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full shadow-md"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>

            {/* Map pins - these would be dynamically generated in a real app */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative group">
                <MapPin className="h-6 w-6 text-primary" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-card p-2 rounded-md shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-medium text-sm">
                    {t("landInvestment.fertileFarmland")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    50 {t("landInvestment.hectares")} • $75,000
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative group">
                <MapPin className="h-6 w-6 text-primary" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-card p-2 rounded-md shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-medium text-sm">
                    {t("landInvestment.highlandGrazing")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    120 {t("landInvestment.hectares")} • $96,000
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative group">
                <MapPin className="h-6 w-6 text-primary" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-card p-2 rounded-md shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-medium text-sm">
                    {t("landInvestment.arableLand")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    35 {t("landInvestment.hectares")} • $70,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("landInvestment.landByRegion")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Maseru</span>
                <span className="text-sm font-medium">
                  8 {t("landInvestment.listings")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Leribe</span>
                <span className="text-sm font-medium">
                  5 {t("landInvestment.listings")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Berea</span>
                <span className="text-sm font-medium">
                  4 {t("landInvestment.listings")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mokhotlong</span>
                <span className="text-sm font-medium">
                  3 {t("landInvestment.listings")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {t("landInvestment.otherRegions")}
                </span>
                <span className="text-sm font-medium">
                  4 {t("landInvestment.listings")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("landInvestment.landByType")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {t("landInvestment.arableLand")}
                </span>
                <span className="text-sm font-medium">
                  12 {t("landInvestment.listings")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {t("landInvestment.grazingLand")}
                </span>
                <span className="text-sm font-medium">
                  7 {t("landInvestment.listings")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t("landInvestment.mixedUse")}</span>
                <span className="text-sm font-medium">
                  3 {t("landInvestment.listings")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t("landInvestment.irrigated")}</span>
                <span className="text-sm font-medium">
                  2 {t("landInvestment.listings")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("landInvestment.priceRange")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {t("landInvestment.under")} $50,000
                </span>
                <span className="text-sm font-medium">
                  5 {t("landInvestment.listings")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">$50,000 - $100,000</span>
                <span className="text-sm font-medium">
                  10 {t("landInvestment.listings")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">$100,000 - $200,000</span>
                <span className="text-sm font-medium">
                  6 {t("landInvestment.listings")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {t("landInvestment.over")} $200,000
                </span>
                <span className="text-sm font-medium">
                  3 {t("landInvestment.listings")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
