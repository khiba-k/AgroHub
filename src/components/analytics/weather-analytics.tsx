import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AreaChart, BarChart } from "./charts";
import { Cloud, CloudRain, Droplets, Thermometer } from "lucide-react";

export function WeatherAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Rainfall Impact on Yield</CardTitle>
          <CardDescription>
            Correlation between rainfall and crop yield
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <AreaChart className="h-[300px]" />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Weather Metrics</CardTitle>
          <CardDescription>
            Key weather data affecting your farm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Thermometer className="mr-2 h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium">Temperature</div>
                  <div className="text-sm text-muted-foreground">
                    Average: 24°C
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold">26°C</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CloudRain className="mr-2 h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium">Rainfall</div>
                  <div className="text-sm text-muted-foreground">
                    Monthly: 120mm
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold">15mm</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Droplets className="mr-2 h-5 w-5 text-blue-400" />
                <div>
                  <div className="font-medium">Humidity</div>
                  <div className="text-sm text-muted-foreground">
                    Average: 65%
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold">72%</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Cloud className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">Cloud Cover</div>
                  <div className="text-sm text-muted-foreground">
                    Average: 40%
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold">35%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
