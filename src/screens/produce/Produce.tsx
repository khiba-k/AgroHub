"use client";
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
import { Filter, Plus } from "lucide-react";
import { ProduceCalendar } from "./components/ProduceCalendar";
import  ProduceForm  from "./components/ProduceForm";
import { ProduceInventory } from "./components/ProduceInventory";
import { ProduceList } from "./components/ProduceList";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function Produce() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Produce Listings</h1>
            <p className="text-muted-foreground">
              Manage your farm produce and inventory
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Produce
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Produce</DialogTitle>
                <DialogDescription>
                  Enter details about your new produce listing
                </DialogDescription>
              </DialogHeader>
              <ProduceForm />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="active">
          <TabsList className="w-full justify-start flex-wrap">
            <TabsTrigger value="active">Active Listings</TabsTrigger>
            <TabsTrigger value="sold">Sold</TabsTrigger>
            <TabsTrigger value="harvest">To Be Harvested</TabsTrigger>
            <TabsTrigger value="calendar">Planting Calendar</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <ProduceList status="active" />
          </TabsContent>

          <TabsContent value="sold" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <ProduceList status="sold" />
          </TabsContent>

          <TabsContent value="harvest" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <ProduceList status="harvest" />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4 pt-4">
            <ProduceCalendar />
          </TabsContent>

          <TabsContent value="draft" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <ProduceList status="draft" />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4 pt-4">
            <ProduceInventory />
          </TabsContent>
        </Tabs>
        
      </div>
    </>
  );
}
