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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Truck, Search, Filter } from "lucide-react";

export function DeliveryMap() {
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

  // Mock delivery data
  const deliveries = [
    {
      id: "1",
      title: "Organic Tomatoes Delivery",
      from: "Green Valley Farm",
      to: "Nairobi Central Market",
      status: "active",
      driver: "John Mwangi",
      vehicle: "Refrigerated Truck",
      eta: "2 hours",
      progress: 65,
      coordinates: { lat: -1.286389, lng: 36.817223 },
    },
    {
      id: "2",
      title: "Dairy Products Delivery",
      from: "Highland Dairy Farm",
      to: "Urban Retailers",
      status: "active",
      driver: "Michael Omondi",
      vehicle: "Refrigerated Van",
      eta: "45 minutes",
      progress: 80,
      coordinates: { lat: -1.292066, lng: 36.821945 },
    },
    {
      id: "3",
      title: "Fresh Vegetables Delivery",
      from: "Sunrise Farm",
      to: "Local Restaurants",
      status: "active",
      driver: "Sarah Ochieng",
      vehicle: "Delivery Van",
      eta: "3 hours",
      progress: 30,
      coordinates: { lat: -1.3, lng: 36.83 },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search deliveries..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium">Active Deliveries</h3>
          {deliveries.map((delivery) => (
            <Card
              key={delivery.id}
              className={`cursor-pointer hover:border-primary transition-colors ${selectedDelivery === delivery.id ? "border-primary" : ""}`}
              onClick={undefined}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{delivery.title}</h4>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Active
                  </Badge>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      From: {delivery.from}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      To: {delivery.to}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {delivery.driver} • {delivery.vehicle}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{delivery.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${delivery.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground mt-1">
                    ETA: {delivery.eta}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Delivery Tracking Map</CardTitle>
              <CardDescription>
                Real-time location of active deliveries
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-0 relative">
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interactive map would display here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Showing real-time locations of all active deliveries
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
