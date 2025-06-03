import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
} from "@/components/analytics/charts";
import { FarmMetrics } from "@/components/analytics/farm-metrics";
import { MarketTrends } from "@/components/analytics/market-trends";
import { WeatherAnalytics } from "@/components/analytics/weather-analytics";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Farm Analytics
            </h1>
            <p className="text-muted-foreground">
              Track your farm performance and market trends
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Filter by date</span>
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <FarmMetrics />

        <Tabs defaultValue="production">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="weather">Weather Impact</TabsTrigger>
          </TabsList>
          <TabsContent value="production" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Crop Production</CardTitle>
                  <CardDescription>
                    Monthly yield across all crops (in kg)
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart className="h-[300px]" />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Crop Distribution</CardTitle>
                  <CardDescription>
                    Percentage of land allocated to each crop
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart className="h-[300px]" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="sales" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sales Revenue</CardTitle>
                  <CardDescription>
                    Monthly revenue from all sales channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <LineChart className="h-[300px]" />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Sales Channels</CardTitle>
                  <CardDescription>
                    Revenue breakdown by distribution channel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart className="h-[300px]" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="expenses" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>
                    Monthly expenses by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart className="h-[300px]" />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Expense Categories</CardTitle>
                  <CardDescription>
                    Percentage of expenses by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart className="h-[300px]" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="weather" className="space-y-4 pt-4">
            <WeatherAnalytics />
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Yield Forecasts</CardTitle>
              <CardDescription>
                Projected yields based on current conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart className="h-[300px]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>
                Price trends for your main crops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MarketTrends />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
