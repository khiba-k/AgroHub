"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/lib/i18n";
import {
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  MapPin,
  Ruler,
  DollarSign,
} from "lucide-react";

export function LandAnalytics() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("landInvestment.averageLandPrice")}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,450/ha</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+5.2%</span>
              <span className="ml-1">
                {t("landInvestment.fromLastQuarter")}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("landInvestment.totalListings")}
            </CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="ml-1">{t("landInvestment.fromLastMonth")}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("landInvestment.totalArea")}
            </CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 ha</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+8.3%</span>
              <span className="ml-1">{t("landInvestment.fromLastMonth")}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("landInvestment.investmentInterest")}
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t("landInvestment.high")}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500 font-medium">-2.1%</span>
              <span className="ml-1">{t("landInvestment.fromLastMonth")}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="prices">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="prices">
            {t("landInvestment.landPrices")}
          </TabsTrigger>
          <TabsTrigger value="regions">
            {t("landInvestment.regionalAnalysis")}
          </TabsTrigger>
          <TabsTrigger value="investments">
            {t("landInvestment.investmentTrends")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="prices" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("landInvestment.landPriceTrends")}</CardTitle>
                <CardDescription>
                  {t("landInvestment.averagePricePerHectare")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">
                    {t("landInvestment.chartPlaceholder")}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("landInvestment.priceByLandType")}</CardTitle>
                <CardDescription>
                  {t("landInvestment.averagePriceBreakdown")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">
                    {t("landInvestment.chartPlaceholder")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="regions" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("landInvestment.listingsByRegion")}</CardTitle>
                <CardDescription>
                  {t("landInvestment.numberOfLandListings")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">
                    {t("landInvestment.chartPlaceholder")}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>
                  {t("landInvestment.regionalPriceComparison")}
                </CardTitle>
                <CardDescription>
                  {t("landInvestment.averagePricePerHectareByRegion")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Maseru", price: 1650, change: "+3.2%" },
                    { name: "Leribe", price: 1450, change: "+2.1%" },
                    { name: "Berea", price: 1350, change: "-1.5%" },
                    { name: "Mokhotlong", price: 950, change: "+5.5%" },
                    { name: "Quthing", price: 850, change: "+0.8%" },
                  ].map((region, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{region.name}</span>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">
                            ${region.price}/ha
                          </span>
                          <span
                            className={
                              region.change.startsWith("+")
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {region.change}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2"
                          style={{
                            width: `${(region.price / 1650) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="investments" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("landInvestment.investmentGrowth")}</CardTitle>
                <CardDescription>
                  {t("landInvestment.totalInvestmentOverTime")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">
                    {t("landInvestment.chartPlaceholder")}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("landInvestment.investmentByOrigin")}</CardTitle>
                <CardDescription>
                  {t("landInvestment.breakdownOfInvestmentSources")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">
                    {t("landInvestment.chartPlaceholder")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
