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
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Package
} from "lucide-react";

export default function TrackingPage() {
  // Mock tracking data
  const shipments = [
    {
      id: "TRK-001",
      orderId: "ORD-001",
      product: "Organic Tomatoes",
      quantity: "50 kg",
      origin: "Cape Town, South Africa",
      destination: "Johannesburg, South Africa",
      carrier: "FastTrack Logistics",
      status: "in-transit",
      estimatedDelivery: "2023-11-18",
      currentLocation: "Bloemfontein, South Africa",
      lastUpdated: "2023-11-16T14:30:00",
      trackingEvents: [
        {
          date: "2023-11-15T09:00:00",
          location: "Cape Town, South Africa",
          status: "Picked up",
          description: "Shipment picked up by carrier",
        },
        {
          date: "2023-11-15T14:30:00",
          location: "Cape Town, South Africa",
          status: "Departed",
          description: "Shipment has left the origin facility",
        },
        {
          date: "2023-11-16T10:15:00",
          location: "Bloemfontein, South Africa",
          status: "In Transit",
          description: "Shipment arrived at intermediate location",
        },
      ],
    },
    {
      id: "TRK-002",
      orderId: "ORD-002",
      product: "Fresh Maize",
      quantity: "100 kg",
      origin: "Nairobi, Kenya",
      destination: "Mombasa, Kenya",
      carrier: "Kenya Express",
      status: "delivered",
      estimatedDelivery: "2023-11-16",
      actualDelivery: "2023-11-15T16:45:00",
      currentLocation: "Mombasa, Kenya",
      lastUpdated: "2023-11-15T16:45:00",
      trackingEvents: [
        {
          date: "2023-11-14T08:30:00",
          location: "Nairobi, Kenya",
          status: "Picked up",
          description: "Shipment picked up by carrier",
        },
        {
          date: "2023-11-14T11:45:00",
          location: "Nairobi, Kenya",
          status: "Departed",
          description: "Shipment has left the origin facility",
        },
        {
          date: "2023-11-15T09:20:00",
          location: "Mtito Andei, Kenya",
          status: "In Transit",
          description: "Shipment arrived at intermediate location",
        },
        {
          date: "2023-11-15T14:30:00",
          location: "Mombasa, Kenya",
          status: "Out for Delivery",
          description: "Shipment is out for delivery",
        },
        {
          date: "2023-11-15T16:45:00",
          location: "Mombasa, Kenya",
          status: "Delivered",
          description: "Shipment has been delivered",
        },
      ],
    },
    {
      id: "TRK-003",
      orderId: "ORD-003",
      product: "Wool Products",
      quantity: "30 kg",
      origin: "Maseru, Lesotho",
      destination: "Durban, South Africa",
      carrier: "Cross Border Logistics",
      status: "processing",
      estimatedDelivery: "2023-11-20",
      currentLocation: "Maseru, Lesotho",
      lastUpdated: "2023-11-13T15:20:00",
      trackingEvents: [
        {
          date: "2023-11-13T15:20:00",
          location: "Maseru, Lesotho",
          status: "Processing",
          description: "Shipment is being processed for dispatch",
        },
      ],
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
      case "delayed":
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

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Selected shipment for detailed view
  const selectedShipment = shipments[0];

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Tracking</h1>
              <p className="text-muted-foreground">
                Track and monitor your shipments in real-time
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Track Shipment</CardTitle>
                <CardDescription>
                  Enter tracking number to get real-time updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Enter tracking number" />
                    <Button>Track</Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Recent searches:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="cursor-pointer">
                        TRK-001
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer">
                        TRK-002
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shipments.map((shipment) => (
                    <div
                      key={shipment.id}
                      className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{shipment.product}</p>
                          <p className="text-sm text-muted-foreground">
                            {shipment.id} • {shipment.orderId}
                          </p>
                        </div>
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
                      </div>
                      <div className="mt-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {shipment.currentLocation}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            ETA: {formatDate(shipment.estimatedDelivery)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Shipment Details</CardTitle>
                    <CardDescription>
                      {selectedShipment.product} • {selectedShipment.id}
                    </CardDescription>
                  </div>
                  <Badge
                    className={getStatusColor(selectedShipment.status)}
                    variant="outline"
                  >
                    {selectedShipment.status
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="font-medium">{selectedShipment.origin}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">To</p>
                      <p className="font-medium">
                        {selectedShipment.destination}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Carrier</p>
                      <p className="font-medium">{selectedShipment.carrier}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Estimated Delivery
                      </p>
                      <p className="font-medium">
                        {formatDate(selectedShipment.estimatedDelivery)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <p className="font-medium">Current Location</p>
                    </div>
                    <div className="pl-6">
                      <p>{selectedShipment.currentLocation}</p>
                      <p className="text-sm text-muted-foreground">
                        Last updated:{" "}
                        {formatDateTime(selectedShipment.lastUpdated)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <p className="font-medium">Tracking History</p>
                    </div>
                    <div className="pl-6 space-y-4">
                      {selectedShipment.trackingEvents
                        .slice()
                        .reverse()
                        .map((event, index) => (
                          <div
                            key={index}
                            className="relative pl-6 pb-4 border-l border-muted-foreground/20 last:border-0"
                          >
                            <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
                            <div className="space-y-1">
                              <p className="font-medium">{event.status}</p>
                              <p className="text-sm">{event.description}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{event.location}</span>
                                <span className="mx-1">•</span>
                                <span>{formatDateTime(event.date)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Shipment Map</CardTitle>
            <CardDescription>
              Real-time location of your active shipments
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
                  Showing 3 active shipments across Africa
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Delivery Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>On-Time Deliveries</span>
                  </div>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                    <span>Delayed Shipments</span>
                  </div>
                  <span className="font-medium">8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-primary mr-2" />
                    <span>Total Shipments</span>
                  </div>
                  <span className="font-medium">25</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Carrier Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>FastTrack Logistics</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">4.8</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-4 w-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Kenya Express</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">4.5</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-4 w-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cross Border Logistics</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">4.2</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-4 w-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Popular Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cape Town → Johannesburg</p>
                    <p className="text-sm text-muted-foreground">
                      South Africa
                    </p>
                  </div>
                  <Badge>12 shipments</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Nairobi → Mombasa</p>
                    <p className="text-sm text-muted-foreground">Kenya</p>
                  </div>
                  <Badge>8 shipments</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Maseru → Durban</p>
                    <p className="text-sm text-muted-foreground">
                      Lesotho → South Africa
                    </p>
                  </div>
                  <Badge>5 shipments</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
