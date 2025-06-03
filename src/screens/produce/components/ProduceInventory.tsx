import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    PieChart,
} from "lucide-react";

export function ProduceInventory() {
    // Mock inventory data
    const inventoryItems = [
        {
            id: "1",
            name: "Tomatoes",
            quantity: "450 kg",
            status: "In Stock",
            location: "Warehouse A",
            lastUpdated: "2023-10-15",
            change: 5,
        },
        {
            id: "2",
            name: "Maize",
            quantity: "1,100 kg",
            status: "In Stock",
            location: "Warehouse B",
            lastUpdated: "2023-10-12",
            change: -3,
        },
        {
            id: "3",
            name: "Kale",
            quantity: "250 kg",
            status: "Low Stock",
            location: "Warehouse A",
            lastUpdated: "2023-10-14",
            change: -8,
        },
        {
            id: "4",
            name: "Beans",
            quantity: "600 kg",
            status: "In Stock",
            location: "Warehouse C",
            lastUpdated: "2023-10-10",
            change: 12,
        },
        {
            id: "5",
            name: "Potatoes",
            quantity: "800 kg",
            status: "In Stock",
            location: "Warehouse B",
            lastUpdated: "2023-10-08",
            change: 0,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Inventory
                        </CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3,200 kg</div>
                        <p className="text-xs text-muted-foreground">Across 5 products</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Low Stock Items
                        </CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground">
                            Item below threshold
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Inventory Value
                        </CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$5,842</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-green-500 font-medium">+8.2%</span>
                            <span className="ml-1">from last month</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.5 days</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <ArrowDownRight className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-green-500 font-medium">-2.3 days</span>
                            <span className="ml-1">from last month</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Inventory Items</CardTitle>
                    <CardDescription>Current stock levels and locations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="grid grid-cols-6 border-b bg-muted/50 p-3 font-medium">
                            <div className="col-span-2">Product</div>
                            <div>Quantity</div>
                            <div>Status</div>
                            <div>Location</div>
                            <div>Change</div>
                        </div>
                        {inventoryItems.map((item) => (
                            <div key={item.id} className="grid grid-cols-6 border-b p-3">
                                <div className="col-span-2 font-medium">{item.name}</div>
                                <div>{item.quantity}</div>
                                <div>
                                    <Badge
                                        variant="outline"
                                        className={`${item.status === "In Stock" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"}`}
                                    >
                                        {item.status}
                                    </Badge>
                                </div>
                                <div>{item.location}</div>
                                <div className="flex items-center">
                                    {item.change > 0 ? (
                                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                                    ) : item.change < 0 ? (
                                        <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                                    ) : null}
                                    <span
                                        className={`${item.change > 0 ? "text-green-500" : item.change < 0 ? "text-red-500" : ""}`}
                                    >
                                        {item.change > 0 ? "+" : ""}
                                        {item.change}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                            Export Inventory
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
