import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    BarChart,
    Landmark,
    Leaf,
    ShoppingCart,
    TrendingUp,
    Users,
} from "lucide-react";
import Link from "next/link";
import { DashboardCropRecommendations } from "./components/DashboardCropRecommendations";
import { DashboardWeatherWidget } from "./components/DashboardWeatherWidget";

export default function Dashboard() {
    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back to your AgroHub dashboard.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$4,231.89</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Listings
                            </CardTitle>
                            <Leaf className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">
                                +2 new since last week
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">
                                +4 since yesterday
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Land Investments
                            </CardTitle>
                            <Landmark className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">
                                +1 new investment opportunity
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Revenue Overview</CardTitle>
                            <CardDescription>
                                Your sales performance over the past 6 months
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[240px] flex items-center justify-center border-b pb-4">
                                <BarChart className="h-16 w-16 text-muted-foreground" />
                                <p className="ml-4 text-muted-foreground">
                                    Chart visualization will appear here
                                </p>
                            </div>
                            <div className="flex items-center justify-center space-x-2 pt-4">
                                <Button size="sm">Weekly</Button>
                                <Button size="sm" variant="outline">
                                    Monthly
                                </Button>
                                <Button size="sm" variant="outline">
                                    Yearly
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="col-span-3 grid gap-4 lg:grid-cols-1">
                        <DashboardWeatherWidget location="Maseru, Lesotho" />
                        <DashboardCropRecommendations location="Maseru Region" />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/marketplace" passHref>
                                    <Button variant="outline" className="w-full justify-start">
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Browse Marketplace
                                    </Button>
                                </Link>
                                <Link href="/land-investment" passHref>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Landmark className="mr-2 h-4 w-4" />
                                        Land Investment
                                    </Button>
                                </Link>
                                <Link href="/auctions" passHref>
                                    <Button variant="outline" className="w-full justify-start">
                                        <BarChart className="mr-2 h-4 w-4" />
                                        Auctions
                                    </Button>
                                </Link>
                                <Link href="/social" passHref>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Users className="mr-2 h-4 w-4" />
                                        Social Feed
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    <p className="text-sm">
                                        New land investment opportunity in Maseru
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                    <p className="text-sm">
                                        Your auction listing received a new bid
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                    <p className="text-sm">
                                        Weather alert: Rain expected tomorrow
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                    <p className="text-sm">3 new connections in your network</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
