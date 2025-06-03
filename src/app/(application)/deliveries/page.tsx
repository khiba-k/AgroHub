import { DeliveryAnalytics } from "@/components/deliveries/delivery-analytics";
import { DeliveryCalendar } from "@/components/deliveries/delivery-calendar";
import { DeliveryForm } from "@/components/deliveries/delivery-form";
import { DeliveryList } from "@/components/deliveries/delivery-list";
import { DeliveryMap } from "@/components/deliveries/delivery-map";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, MapPin, Plus } from "lucide-react";

export default function DeliveriesPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Deliveries</h1>
            <p className="text-muted-foreground">
              Manage your logistics and deliveries
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">
              <MapPin className="mr-2 h-4 w-4" /> View Map
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Delivery
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Delivery</DialogTitle>
                  <DialogDescription>
                    Enter details about the new delivery
                  </DialogDescription>
                </DialogHeader>
                <DeliveryForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="active">Active Deliveries</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <DeliveryList status="active" />
          </TabsContent>
          <TabsContent value="pending" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <DeliveryList status="pending" />
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <DeliveryList status="completed" />
          </TabsContent>
          <TabsContent value="map" className="space-y-4 pt-4">
            <DeliveryMap />
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4 pt-4">
            <DeliveryCalendar />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <DeliveryAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
