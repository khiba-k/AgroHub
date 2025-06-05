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
import { Calendar as CalendarIcon, Plus, Wrench } from "lucide-react";
import { useState } from "react";
import { ServiceForm } from "./service-form";

export function ServiceCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  // Mock service events
  const serviceEvents = [
    {
      id: "1",
      title: "Tractor Rental - John Smith",
      date: new Date(2023, 10, 15),
      type: "equipment",
      location: "Eastern Region Farm",
    },
    {
      id: "2",
      title: "Crop Spraying - Sarah Johnson",
      date: new Date(2023, 10, 18),
      type: "pest-control",
      location: "Central Region Farm",
    },
    {
      id: "3",
      title: "Soil Testing - Michael Brown",
      date: new Date(2023, 10, 20),
      type: "consulting",
      location: "Western Region Farm",
    },
    {
      id: "4",
      title: "Agricultural Consulting - Emily Davis",
      date: new Date(2023, 10, 22),
      type: "consulting",
      location: "Virtual",
    },
    {
      id: "5",
      title: "Irrigation Installation - David Wilson",
      date: new Date(2023, 10, 25),
      type: "installation",
      location: "Northern Region Farm",
    },
  ];

  // Function to render calendar day contents
  const renderDay = (day: Date) => {
    const dayEvents = serviceEvents.filter(
      (event) => event.date.toDateString() === day.toDateString(),
    );

    if (dayEvents.length === 0) return null;

    return (
      <div className="relative h-full w-full p-2">
        <div className="absolute bottom-1 right-1 flex flex-wrap gap-1 justify-end">
          {dayEvents.map((event, i) => (
            <Badge
              key={i}
              variant="outline"
              className={`${event.type === "equipment"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                  : event.type === "pest-control"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : event.type === "consulting"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                      : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                }`}
            >
              {event.type === "equipment"
                ? "E"
                : event.type === "pest-control"
                  ? "P"
                  : event.type === "consulting"
                    ? "C"
                    : "I"}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  // Get events for the selected date
  const selectedDateEvents = date
    ? serviceEvents.filter(
      (event) => event.date.toDateString() === date.toDateString(),
    )
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Service Calendar</CardTitle>
            <CardDescription>
              Track your service bookings and appointments
            </CardDescription>
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
                  <Plus className="mr-2 h-4 w-4" /> Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                  <DialogDescription>
                    Schedule a new service appointment
                  </DialogDescription>
                </DialogHeader>
                <ServiceForm />
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
                E
              </Badge>
              <span className="text-sm">Equipment</span>
            </div>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 mr-2"
              >
                P
              </Badge>
              <span className="text-sm">Pest Control</span>
            </div>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 mr-2"
              >
                C
              </Badge>
              <span className="text-sm">Consulting</span>
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
            {selectedDateEvents.length > 0
              ? `${selectedDateEvents.length} service${selectedDateEvents.length > 1 ? "s" : ""} scheduled`
              : "No services scheduled"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Badge
                    variant="outline"
                    className={`${event.type === "equipment"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        : event.type === "pest-control"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : event.type === "consulting"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                      }`}
                  >
                    {event.type === "equipment"
                      ? "Equipment"
                      : event.type === "pest-control"
                        ? "Pest Control"
                        : event.type === "consulting"
                          ? "Consulting"
                          : "Installation"}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      <Wrench className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                No services scheduled for this date
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                    <DialogDescription>
                      Schedule a new service appointment
                    </DialogDescription>
                  </DialogHeader>
                  <ServiceForm />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
