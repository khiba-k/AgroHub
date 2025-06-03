import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/analytics/charts";
import {
  ArrowUpRight,
  ArrowDownRight,
  Truck,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";

export function DeliveryAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deliveries
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+15.3%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+2.5%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Distance
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 km</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDownRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">-3.8%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8 days</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDownRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">-0.3 days</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Delivery Volume</CardTitle>
                <CardDescription>
                  Number of deliveries over the past 12 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart className="h-[300px]" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Delivery Status</CardTitle>
                <CardDescription>
                  Current status of all deliveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart className="h-[300px]" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Delivery Times</CardTitle>
                <CardDescription>
                  Average delivery times by region
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart className="h-[300px]" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Driver Performance</CardTitle>
                <CardDescription>
                  On-time delivery rates by driver
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Mwangi", deliveries: 42, onTime: 40 },
                    { name: "David Kimani", deliveries: 38, onTime: 35 },
                    { name: "Sarah Ochieng", deliveries: 35, onTime: 34 },
                    { name: "Michael Omondi", deliveries: 30, onTime: 28 },
                    { name: "Grace Akinyi", deliveries: 25, onTime: 24 },
                  ].map((driver, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{driver.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {((driver.onTime / driver.deliveries) * 100).toFixed(
                            1,
                          )}
                          % on-time
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2"
                          style={{
                            width: `${(driver.onTime / driver.deliveries) * 100}%`,
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
        <TabsContent value="routes" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Popular Routes</CardTitle>
                <CardDescription>
                  Most frequently used delivery routes
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart className="h-[300px]" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Route Efficiency</CardTitle>
                <CardDescription>
                  Distance vs. delivery time by route
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      route: "Eastern Region → Nairobi",
                      distance: 45,
                      time: 1.5,
                    },
                    {
                      route: "Central Region → Eastern",
                      distance: 65,
                      time: 2.2,
                    },
                    {
                      route: "Western Region → Central",
                      distance: 85,
                      time: 3.0,
                    },
                    {
                      route: "Nairobi → Western Region",
                      distance: 90,
                      time: 3.2,
                    },
                    {
                      route: "Northern → Central Region",
                      distance: 120,
                      time: 4.5,
                    },
                  ].map((route, i) => (
                    <div key={i} className="space-y-1">
                      <div className="font-medium">{route.route}</div>
                      <div className="flex justify-between text-sm">
                        <span>{route.distance} km</span>
                        <span>{route.time} hours</span>
                        <span>
                          {(route.distance / route.time).toFixed(1)} km/h
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${(route.time / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
