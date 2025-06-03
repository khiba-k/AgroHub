import { ServiceAnalytics } from "@/components/services/service-analytics";
import { ServiceBookings } from "@/components/services/service-bookings";
import { ServiceCalendar } from "@/components/services/service-calendar";
import { ServiceForm } from "@/components/services/service-form";
import { ServiceList } from "@/components/services/service-list";
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
import { Plus } from "lucide-react";

export default function ServicesPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Services</h1>
            <p className="text-muted-foreground">
              Manage your agricultural services
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Enter details about your new service offering
                </DialogDescription>
              </DialogHeader>
              <ServiceForm />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="services">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="services" className="space-y-4 pt-4">
            <ServiceList />
          </TabsContent>
          <TabsContent value="bookings" className="space-y-4 pt-4">
            <ServiceBookings />
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4 pt-4">
            <ServiceCalendar />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <ServiceAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
