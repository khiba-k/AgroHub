"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, MoreHorizontal, Eye, Check, X } from "lucide-react";
import {
  handleFormAction,
  confirmBookingAction,
  completeBookingAction,
  cancelBookingAction,
} from "@/app/actions";

export function ServiceBookings() {
  // Mock bookings data
  const bookings = [
    {
      id: "BK-001",
      service: "Tractor Rental",
      customer: "John Smith",
      date: "2023-11-15",
      time: "09:00 - 13:00",
      status: "confirmed",
      price: 200,
      location: "Eastern Region Farm",
    },
    {
      id: "BK-002",
      service: "Crop Spraying",
      customer: "Sarah Johnson",
      date: "2023-11-18",
      time: "10:00 - 14:00",
      status: "pending",
      price: 125,
      location: "Central Region Farm",
    },
    {
      id: "BK-003",
      service: "Soil Testing",
      customer: "Michael Brown",
      date: "2023-11-20",
      time: "14:00 - 16:00",
      status: "confirmed",
      price: 75,
      location: "Western Region Farm",
    },
    {
      id: "BK-004",
      service: "Agricultural Consulting",
      customer: "Emily Davis",
      date: "2023-11-22",
      time: "13:00 - 15:00",
      status: "completed",
      price: 200,
      location: "Virtual",
    },
    {
      id: "BK-005",
      service: "Irrigation Installation",
      customer: "David Wilson",
      date: "2023-11-25",
      time: "08:00 - 17:00",
      status: "pending",
      price: 1500,
      location: "Northern Region Farm",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "";
    }
  };

  // Filter bookings based on search query
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bookings..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>
                    {formatDate(booking.date)}
                    <div className="text-xs text-muted-foreground">
                      {booking.time}
                    </div>
                  </TableCell>
                  <TableCell>${booking.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusBadge(booking.status)}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <div className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </div>
                        </DropdownMenuItem>
                        {booking.status === "pending" && (
                          <DropdownMenuItem>
                            <div className="flex items-center">
                              <Check className="mr-2 h-4 w-4" /> Confirm Booking
                            </div>
                          </DropdownMenuItem>
                        )}
                        {booking.status === "confirmed" && (
                          <DropdownMenuItem>
                            <div className="flex items-center">
                              <Check className="mr-2 h-4 w-4" /> Mark as
                              Completed
                            </div>
                          </DropdownMenuItem>
                        )}
                        {(booking.status === "pending" ||
                          booking.status === "confirmed") && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <div className="flex items-center">
                                <X className="mr-2 h-4 w-4" /> Cancel Booking
                              </div>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
