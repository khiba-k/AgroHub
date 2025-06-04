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
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";

export function ProduceCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [view, setView] = useState<"month" | "year">("month");

    // Mock calendar events
    const events = [
        { date: new Date(2023, 9, 5), type: "harvest", crop: "Tomatoes" },
        { date: new Date(2023, 9, 10), type: "harvest", crop: "Maize" },
        { date: new Date(2023, 9, 15), type: "planting", crop: "Kale" },
        { date: new Date(2023, 9, 20), type: "harvest", crop: "Beans" },
        { date: new Date(2023, 9, 25), type: "planting", crop: "Carrots" },
    ];

    // Function to render calendar day contents
    const renderDay = (day: Date) => {
        const dayEvents = events.filter(
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
                            className={`${event.type === "harvest" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"}`}
                        >
                            {event.type === "harvest" ? "H" : "P"}
                        </Badge>
                    ))}
                </div>
            </div>
        );
    };

    // Get events for the selected date
    const selectedDateEvents = date
        ? events.filter(
            (event) => event.date.toDateString() === date.toDateString(),
        )
        : [];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                        <CardTitle>Planting & Harvest Calendar</CardTitle>
                        <CardDescription>
                            Track your planting and harvesting schedule
                        </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select
                            value={view}
                            onValueChange={(value) => setView(value as "month" | "year")}
                        >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="View" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="month">Month</SelectItem>
                                <SelectItem value="year">Year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <Plus className="mr-2 h-4 w-4" /> Add Event
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Calendar Event</DialogTitle>
                                    <DialogDescription>
                                        Schedule a planting or harvesting event
                                    </DialogDescription>
                                </DialogHeader>
                                {/* Calendar event form would go here */}
                                <div className="space-y-4 py-4">
                                    <p className="text-center text-muted-foreground">
                                        Calendar event form would go here
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <Button>Add Event</Button>
                                </div>
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
                                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 mr-2"
                            >
                                H
                            </Badge>
                            <span className="text-sm">Harvest</span>
                        </div>
                        <div className="flex items-center">
                            <Badge
                                variant="outline"
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 mr-2"
                            >
                                P
                            </Badge>
                            <span className="text-sm">Planting</span>
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
                            ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? "s" : ""} scheduled`
                            : "No events scheduled"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedDateEvents.length > 0 ? (
                        <div className="space-y-4">
                            {selectedDateEvents.map((event, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                    <Badge
                                        variant="outline"
                                        className={`${event.type === "harvest" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"}`}
                                    >
                                        {event.type === "harvest" ? "Harvest" : "Planting"}
                                    </Badge>
                                    <div>
                                        <h4 className="font-medium">{event.crop}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {event.date.toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground mb-2">
                                No events scheduled for this date
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                        <Plus className="mr-2 h-4 w-4" /> Add Event
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Calendar Event</DialogTitle>
                                        <DialogDescription>
                                            Schedule a planting or harvesting event
                                        </DialogDescription>
                                    </DialogHeader>
                                    {/* Calendar event form would go here */}
                                    <div className="space-y-4 py-4">
                                        <p className="text-center text-muted-foreground">
                                            Calendar event form would go here
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button>Add Event</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
