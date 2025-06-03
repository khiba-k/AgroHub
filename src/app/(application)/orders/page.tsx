import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package, Search, Filter, Eye, TruckIcon } from "lucide-react";

export default function OrdersPage() {
  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      date: "2023-11-15",
      customer: "Thabo Mofokeng",
      items: [
        { name: "Organic Tomatoes", quantity: 10, unit: "kg", price: 5.99 },
        { name: "Fresh Lettuce", quantity: 5, unit: "kg", price: 3.49 },
      ],
      total: 89.35,
      status: "processing",
      paymentStatus: "paid",
    },
    {
      id: "ORD-002",
      date: "2023-11-14",
      customer: "Wanjiku Kamau",
      items: [
        { name: "Maize Seeds", quantity: 20, unit: "kg", price: 7.99 },
        { name: "Fertilizer", quantity: 2, unit: "bag", price: 45.0 },
      ],
      total: 249.8,
      status: "shipped",
      paymentStatus: "paid",
    },
    {
      id: "ORD-003",
      date: "2023-11-13",
      customer: "Lindiwe Dlamini",
      items: [{ name: "Wool Fabric", quantity: 15, unit: "m", price: 12.5 }],
      total: 187.5,
      status: "delivered",
      paymentStatus: "paid",
    },
    {
      id: "ORD-004",
      date: "2023-11-12",
      customer: "Sipho Nkosi",
      items: [
        { name: "Irrigation Pipes", quantity: 10, unit: "pcs", price: 18.75 },
        { name: "Water Pump", quantity: 1, unit: "pcs", price: 125.0 },
      ],
      total: 312.5,
      status: "pending",
      paymentStatus: "awaiting",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "shipped":
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "awaiting":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "refunded":
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
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
              <p className="text-muted-foreground">
                Track and manage your marketplace orders
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center mt-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
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
                        Order ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Customer
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Total
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Payment
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle font-medium">
                          {order.id}
                        </td>
                        <td className="p-4 align-middle">
                          {formatDate(order.date)}
                        </td>
                        <td className="p-4 align-middle">{order.customer}</td>
                        <td className="p-4 align-middle">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="p-4 align-middle">
                          <Badge
                            className={getStatusColor(order.status)}
                            variant="outline"
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge
                            className={getPaymentStatusColor(
                              order.paymentStatus,
                            )}
                            variant="outline"
                          >
                            {order.paymentStatus.charAt(0).toUpperCase() +
                              order.paymentStatus.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {order.status === "processing" && (
                              <Button variant="ghost" size="icon">
                                <TruckIcon className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="processing" className="space-y-4 mt-4">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
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
                        Total
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Payment
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {orders
                      .filter((order) => order.status === "processing")
                      .map((order) => (
                        <tr
                          key={order.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle font-medium">
                            {order.id}
                          </td>
                          <td className="p-4 align-middle">
                            {formatDate(order.date)}
                          </td>
                          <td className="p-4 align-middle">{order.customer}</td>
                          <td className="p-4 align-middle">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle">
                            <Badge
                              className={getStatusColor(order.status)}
                              variant="outline"
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge
                              className={getPaymentStatusColor(
                                order.paymentStatus,
                              )}
                              variant="outline"
                            >
                              {order.paymentStatus.charAt(0).toUpperCase() +
                                order.paymentStatus.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <TruckIcon className="h-4 w-4" />
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
          <TabsContent value="shipped" className="space-y-4 mt-4">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
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
                        Total
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Payment
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {orders
                      .filter((order) => order.status === "shipped")
                      .map((order) => (
                        <tr
                          key={order.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle font-medium">
                            {order.id}
                          </td>
                          <td className="p-4 align-middle">
                            {formatDate(order.date)}
                          </td>
                          <td className="p-4 align-middle">{order.customer}</td>
                          <td className="p-4 align-middle">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="p-4 align-middle">
                            <Badge
                              className={getStatusColor(order.status)}
                              variant="outline"
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge
                              className={getPaymentStatusColor(
                                order.paymentStatus,
                              )}
                              variant="outline"
                            >
                              {order.paymentStatus.charAt(0).toUpperCase() +
                                order.paymentStatus.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
