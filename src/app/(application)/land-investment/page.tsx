import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LandListings } from "@/components/land-investment/land-listings";
import { MyInvestments } from "@/components/land-investment/my-investments";
import { LandMap } from "@/components/land-investment/land-map";
import { LandAnalytics } from "@/components/land-investment/land-analytics";
import { Plus, Filter, MapPin, Landmark } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LandForm } from "@/components/land-investment/land-form";

export default function LandInvestmentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Landmark className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Land Investment
              </h1>
              <p className="text-muted-foreground">
                Connect with investors or find land to invest in
              </p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> List Land
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>List Your Land</DialogTitle>
                <DialogDescription>
                  Enter details about your land for potential investors
                </DialogDescription>
              </DialogHeader>
              <LandForm />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="available">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="available">Available Land</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
            <TabsTrigger value="my-investments">My Investments</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="available" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Input type="text" placeholder="Search by location, size..." />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <LandListings type="available" />
          </TabsContent>
          <TabsContent value="my-listings" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <LandListings type="my-listings" />
          </TabsContent>
          <TabsContent value="my-investments" className="space-y-4 pt-4">
            <MyInvestments />
          </TabsContent>
          <TabsContent value="map" className="space-y-4 pt-4">
            <LandMap />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <LandAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
