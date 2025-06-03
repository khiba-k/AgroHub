import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function MarketTrends() {
  const trends = [
    {
      crop: "Tomatoes",
      price: "$2.45/kg",
      change: 8.2,
      forecast: "Rising",
    },
    {
      crop: "Maize",
      price: "$1.20/kg",
      change: -3.5,
      forecast: "Stable",
    },
    {
      crop: "Beans",
      price: "$3.10/kg",
      change: 12.4,
      forecast: "Rising",
    },
    {
      crop: "Kale",
      price: "$1.75/kg",
      change: 2.1,
      forecast: "Stable",
    },
    {
      crop: "Potatoes",
      price: "$0.95/kg",
      change: -5.2,
      forecast: "Falling",
    },
  ];

  return (
    <div className="space-y-4">
      {trends.map((trend, i) => (
        <div key={i} className="flex items-center justify-between">
          <div>
            <div className="font-medium">{trend.crop}</div>
            <div className="text-sm text-muted-foreground">{trend.price}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {trend.change > 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span
                className={trend.change > 0 ? "text-green-500" : "text-red-500"}
              >
                {trend.change > 0 ? "+" : ""}
                {trend.change}%
              </span>
            </div>
            <Badge
              variant="outline"
              className={`${trend.forecast === "Rising" ? "border-green-500 text-green-500" : trend.forecast === "Falling" ? "border-red-500 text-red-500" : "border-yellow-500 text-yellow-500"}`}
            >
              {trend.forecast}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
