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
import { Search, Filter, MoreHorizontal, Eye, Truck, X } from "lucide-react";

export function StoreOrders() {
  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      date: "2023-11-10",
      total: 125.99,
      status: "processing",
      items: [
        { name: "Organic Tomatoes", quantity: 5, price: 2.99 },
        { name: "Fresh Maize", quantity: 10, price: 1.49 },
        { name: "Organic Kale", quantity: 3, price: 3.29 },
      ],
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      date: "2023-11-09",
      total: 78.5,
      status: "shipped",
      items: [
        { name: "Free-Range Eggs", quantity: 2, price: 4.99 },
        { name: "Raw Honey", quantity: 1, price: 8.99 },
        { name: "Fresh Avocados", quantity: 4, price: 5.49 },
      ],
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      date: "2023-11-08",
      total: 45.75,
      status: "delivered",
      items: [
        { name: "Dairy Milk", quantity: 3, price: 2.49 },
        { name: "Fresh Carrots", quantity: 2, price: 1.99 },
        { name: "Organic Tomatoes", quantity: 4, price: 2.99 },
      ],
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-11-07",
      total: 112.3,
      status: "processing",
      items: [
        { name: "Fresh Maize", quantity: 15, price: 1.49 },
        { name: "Organic Kale", quantity: 5, price: 3.29 },
        { name: "Free-Range Eggs", quantity: 3, price: 4.99 },
      ],
    },
    {
      id: "ORD-005",
      customer: "David Wilson",
      date: "2023-11-06",
      total: 67.85,
      status: "cancelled",
      items: [
        { name: "Raw Honey", quantity: 2, price: 8.99 },
        { name: "Fresh Avocados", quantity: 3, price: 5.49 },
        { name: "Dairy Milk", quantity: 2, price: 2.49 },
      ],
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
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "shipped":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "";
    }
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
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
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusBadge(order.status)}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
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
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        {order.status === "processing" && (
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" /> Mark as Shipped
                          </DropdownMenuItem>
                        )}
                        {(order.status === "processing" ||
                          order.status === "shipped") && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" /> Cancel Order
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
