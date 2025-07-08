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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Filter, Package, Search, ShoppingCart } from "lucide-react";

export default function Orders() {
    // Mock orders data
    const orders = [
        {
            id: "ORD-001",
            date: "2023-11-10",
            total: 125.99,
            status: "processing",
            currency: "ZAR",
            seller: "Green Valley Farm",
            items: [
                { name: "Organic Tomatoes", quantity: 5, price: 2.99 },
                { name: "Fresh Maize", quantity: 10, price: 1.49 },
                { name: "Organic Kale", quantity: 3, price: 3.29 },
            ],
        },
        {
            id: "ORD-002",
            date: "2023-11-09",
            total: 78.5,
            status: "shipped",
            currency: "KES",
            seller: "Nairobi Fresh Produce",
            items: [
                { name: "Free-Range Eggs", quantity: 2, price: 4.99 },
                { name: "Raw Honey", quantity: 1, price: 8.99 },
                { name: "Fresh Avocados", quantity: 4, price: 5.49 },
            ],
        },
        {
            id: "ORD-003",
            date: "2023-11-08",
            total: 45.75,
            status: "delivered",
            currency: "LSL",
            seller: "Lesotho Highland Farms",
            items: [
                { name: "Dairy Milk", quantity: 3, price: 2.49 },
                { name: "Fresh Carrots", quantity: 2, price: 1.99 },
                { name: "Organic Tomatoes", quantity: 4, price: 2.99 },
            ],
        },
        {
            id: "ORD-004",
            date: "2023-11-07",
            total: 112.3,
            status: "processing",
            currency: "USD",
            seller: "Cape Town Organics",
            items: [
                { name: "Fresh Maize", quantity: 15, price: 1.49 },
                { name: "Organic Kale", quantity: 5, price: 3.29 },
                { name: "Free-Range Eggs", quantity: 3, price: 4.99 },
            ],
        },
        {
            id: "ORD-005",
            date: "2023-11-06",
            total: 67.85,
            status: "cancelled",
            currency: "ZAR",
            seller: "Johannesburg Market",
            items: [
                { name: "Raw Honey", quantity: 2, price: 8.99 },
                { name: "Fresh Avocados", quantity: 3, price: 5.49 },
                { name: "Dairy Milk", quantity: 2, price: 2.49 },
            ],
        },
    ];

    // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Function to get currency symbol
    const getCurrencySymbol = (currency: string) => {
        switch (currency) {
            case "ZAR":
                return "R";
            case "KES":
                return "KSh";
            case "LSL":
                return "M";
            case "USD":
                return "$";
            default:
                return "$";
        }
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

    return (
        <>
            <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pl-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
                        <p className="text-muted-foreground">
                            Track and manage your marketplace orders
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between pl-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search orders..."
                            className="pl-8"
                        />
                    </div>
                    
                    <Button variant="outline" size="icon" >
                        <Filter className="h-4 w-4"  />
                    </Button>
                    
                </div>

                <Tabs defaultValue="all">
                <div className="px-4 md:px-4"> 
                    <TabsList className="w-full justify-start pl-4">
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="processing">Processing</TabsTrigger>
                        <TabsTrigger value="shipped">Shipped</TabsTrigger>
                        <TabsTrigger value="delivered">Delivered</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                   </div> 

                    <TabsContent value="all" className="space-y-4 pl-4 ">
                    
                        <Card>
                            <CardContent className="p-0">
                            <div className="overflow-x-auto">  
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Seller</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right pr-12">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">
                                                    {order.id}
                                                </TableCell>
                                                <TableCell>{formatDate(order.date)}</TableCell>
                                                <TableCell>{order.seller}</TableCell>
                                                <TableCell>
                                                    {getCurrencySymbol(order.currency)}
                                                    {order.total.toFixed(2)}
                                                </TableCell>
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
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="mr-2 h-4 w-4" /> Details
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {["processing", "shipped", "delivered", "cancelled"].map((status) => (
                        <TabsContent key={status} value={status} className="space-y-4 pt-4">
                            <Card>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Order ID</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Seller</TableHead>
                                                <TableHead>Total</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders
                                                .filter((order) => order.status === status)
                                                .map((order) => (
                                                    <TableRow key={order.id}>
                                                        <TableCell className="font-medium">
                                                            {order.id}
                                                        </TableCell>
                                                        <TableCell>{formatDate(order.date)}</TableCell>
                                                        <TableCell>{order.seller}</TableCell>
                                                        <TableCell>
                                                            {getCurrencySymbol(order.currency)}
                                                            {order.total.toFixed(2)}
                                                        </TableCell>
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
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="mr-2 h-4 w-4" /> Details
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            {orders.filter((order) => order.status === status)
                                                .length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="text-center py-8">
                                                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                                {status === "processing" ? (
                                                                    <Package className="h-12 w-12 mb-2" />
                                                                ) : status === "shipped" ? (
                                                                    <Package className="h-12 w-12 mb-2" />
                                                                ) : status === "delivered" ? (
                                                                    <Package className="h-12 w-12 mb-2" />
                                                                ) : (
                                                                    <ShoppingCart className="h-12 w-12 mb-2" />
                                                                )}
                                                                <p>No {status} orders found</p>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
                <div className="px-4 md:px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        <CardDescription>
                            Overview of your order history and spending
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="pt-6 ">
                                    <div className="text-2xl font-bold">{orders.length}</div>
                                    <p className="text-sm text-muted-foreground">Total Orders</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6 ">
                                    <div className="text-2xl font-bold">
                                        {orders.filter((o) => o.status === "delivered").length}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Completed Orders
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-2xl font-bold">
                                        {orders.filter((o) => o.status === "processing").length +
                                            orders.filter((o) => o.status === "shipped").length}
                                    </div>
                                    <p className="text-sm text-muted-foreground">Active Orders</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-2xl font-bold">
                                        $
                                        {orders
                                            .reduce((sum, order) => sum + order.total, 0)
                                            .toFixed(2)}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Total Spent (USD)
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
            </div>
        </>
    );
}
