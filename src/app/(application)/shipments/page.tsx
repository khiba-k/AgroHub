import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Filter, MapPin, Package, Search, Truck } from "lucide-react";

export default function ShipmentsPage() {
  // Mock shipments data
  const shipments = [
    {
      id: "SHP-001",
      orderId: "ORD-001",
      date: "2023-11-15",
      customer: "Thabo Mofokeng",
      origin: "Cape Town, South Africa",
      destination: "Johannesburg, South Africa",
      carrier: "FastTrack Logistics",
      trackingNumber: "FTL-12345678",
      status: "in-transit",
      estimatedDelivery: "2023-11-18",
    },
    {
      id: "SHP-002",
      orderId: "ORD-002",
      date: "2023-11-14",
      customer: "Wanjiku Kamau",
      origin: "Nairobi, Kenya",
      destination: "Mombasa, Kenya",
      carrier: "Kenya Express",
      trackingNumber: "KE-87654321",
      status: "delivered",
      estimatedDelivery: "2023-11-16",
      actualDelivery: "2023-11-15",
    },
    {
      id: "SHP-003",
      orderId: "ORD-003",
      date: "2023-11-13",
      customer: "Lindiwe Dlamini",
      origin: "Maseru, Lesotho",
      destination: "Durban, South Africa",
      carrier: "Cross Border Logistics",
      trackingNumber: "CBL-23456789",
      status: "processing",
      estimatedDelivery: "2023-11-20",
    },
    {
      id: "SHP-004",
      orderId: "ORD-004",
      date: "2023-11-12",
      customer: "Sipho Nkosi",
      origin: "Johannesburg, South Africa",
      destination: "Gaborone, Botswana",
      carrier: "Southern African Freight",
      trackingNumber: "SAF-34567890",
      status: "pending",
      estimatedDelivery: "2023-11-22",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "in-transit":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
              <p className="text-muted-foreground">
                Track and manage your product shipments
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">All Shipments</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="in-transit">In Transit</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center mt-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search shipments..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <TabsContent value="all" className="space-y-4 mt-4">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Shipment ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Order ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Customer
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Destination
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Est. Delivery
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {shipments.map((shipment) => (
                      <tr
                        key={shipment.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle font-medium">
                          {shipment.id}
                        </td>
                        <td className="p-4 align-middle">{shipment.orderId}</td>
                        <td className="p-4 align-middle">
                          {formatDate(shipment.date)}
                        </td>
                        <td className="p-4 align-middle">
                          {shipment.customer}
                        </td>
                        <td className="p-4 align-middle">
                          {shipment.destination}
                        </td>
                        <td className="p-4 align-middle">
                          <Badge
                            className={getStatusColor(shipment.status)}
                            variant="outline"
                          >
                            {shipment.status
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          {formatDate(shipment.estimatedDelivery)}
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Package className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Similar content for other tabs */}
          <TabsContent value="in-transit" className="space-y-4 mt-4">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Shipment ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Order ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Customer
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Destination
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Est. Delivery
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {shipments
                      .filter((shipment) => shipment.status === "in-transit")
                      .map((shipment) => (
                        <tr
                          key={shipment.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle font-medium">
                            {shipment.id}
                          </td>
                          <td className="p-4 align-middle">
                            {shipment.orderId}
                          </td>
                          <td className="p-4 align-middle">
                            {formatDate(shipment.date)}
                          </td>
                          <td className="p-4 align-middle">
                            {shipment.customer}
                          </td>
                          <td className="p-4 align-middle">
                            {shipment.destination}
                          </td>
                          <td className="p-4 align-middle">
                            <Badge
                              className={getStatusColor(shipment.status)}
                              variant="outline"
                            >
                              {shipment.status
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(" ")}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            {formatDate(shipment.estimatedDelivery)}
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Package className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Shipment Map</CardTitle>
            <CardDescription>
              View the real-time location of your shipments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-muted rounded-md flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">
                  Interactive map would be displayed here
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Showing 4 active shipments across Africa
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
