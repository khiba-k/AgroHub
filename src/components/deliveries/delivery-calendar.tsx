"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Plus, Truck } from "lucide-react";
import { useState } from "react";
import { DeliveryForm } from "./delivery-form";

export function DeliveryCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  // Mock delivery events
  const deliveries = [
    {
      id: "1",
      title: "Organic Tomatoes Delivery",
      date: new Date(2023, 10, 15),
      type: "pickup",
      location: "Green Valley Farm",
    },
    {
      id: "2",
      title: "Maize Bulk Delivery",
      date: new Date(2023, 10, 18),
      type: "pickup",
      location: "Central Region Farm",
    },
    {
      id: "3",
      title: "Mixed Vegetables Delivery",
      date: new Date(2023, 10, 10),
      type: "delivery",
      location: "Local Supermarket Chain",
    },
    {
      id: "4",
      title: "Dairy Products Delivery",
      date: new Date(2023, 10, 14),
      type: "delivery",
      location: "Urban Retailers",
    },
    {
      id: "5",
      title: "Fresh Produce Delivery",
      date: new Date(2023, 10, 22),
      type: "delivery",
      location: "Nairobi Central Market",
    },
  ];

  // Function to render calendar day contents
  const renderDay = (day: Date) => {
    const dayDeliveries = deliveries.filter(
      (delivery) => delivery.date.toDateString() === day.toDateString(),
    );

    if (dayDeliveries.length === 0) return null;

    return (
      <div className="relative h-full w-full p-2">
        <div className="absolute bottom-1 right-1 flex flex-wrap gap-1 justify-end">
          {dayDeliveries.map((delivery, i) => (
            <Badge
              key={i}
              variant="outline"
              className={`${delivery.type === "pickup" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"}`}
            >
              {delivery.type === "pickup" ? "P" : "D"}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  // Get deliveries for the selected date
  const selectedDateDeliveries = date
    ? deliveries.filter(
      (delivery) => delivery.date.toDateString() === date.toDateString(),
    )
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Delivery Calendar</CardTitle>
            <CardDescription>Track your pickups and deliveries</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select
              value={view}
              onValueChange={(value) => setView(value as "month" | "week")}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Delivery
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Delivery</DialogTitle>
                  <DialogDescription>
                    Schedule a new pickup or delivery
                  </DialogDescription>
                </DialogHeader>
                <DeliveryForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            components={{
              Day: ({ day, ...props }) => (
                <div {...props}>
                  {day.date.getDate()}
                  {renderDay(day.date)}
                </div>
              ),
            }}
          />
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <Badge
                variant="outline"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 mr-2"
              >
                P
              </Badge>
              <span className="text-sm">Pickup</span>
            </div>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 mr-2"
              >
                D
              </Badge>
              <span className="text-sm">Delivery</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {date
              ? date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
              : "Select a date"}
          </CardTitle>
          <CardDescription>
            {selectedDateDeliveries.length > 0
              ? `${selectedDateDeliveries.length} delivery/pickup${selectedDateDeliveries.length > 1 ? "s" : ""} scheduled`
              : "No deliveries scheduled"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDateDeliveries.length > 0 ? (
            <div className="space-y-4">
              {selectedDateDeliveries.map((delivery, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Badge
                    variant="outline"
                    className={`${delivery.type === "pickup" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"}`}
                  >
                    {delivery.type === "pickup" ? "Pickup" : "Delivery"}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{delivery.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {delivery.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {delivery.date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      <Truck className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                No deliveries scheduled for this date
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Delivery
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Delivery</DialogTitle>
                    <DialogDescription>
                      Schedule a new pickup or delivery
                    </DialogDescription>
                  </DialogHeader>
                  <DeliveryForm />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
