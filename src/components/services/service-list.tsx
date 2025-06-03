"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServiceForm } from "./service-form";

export function ServiceList() {
  // Mock services data
  const services = [
    {
      id: "1",
      title: "Tractor Rental",
      category: "Equipment Rental",
      price: "$50/hour",
      image:
        "https://images.unsplash.com/photo-1588862081167-d5b98006637e?w=800&q=80",
      description:
        "Rent our modern tractors for plowing, tilling, and other field operations. Includes operator and fuel.",
      location: "Eastern Region",
      availability: "Available",
      rating: 4.8,
    },
    {
      id: "2",
      title: "Crop Spraying",
      category: "Pest Control",
      price: "$25/acre",
      image:
        "https://images.unsplash.com/photo-1626448126774-056e9051d9a0?w=800&q=80",
      description:
        "Professional crop spraying services for pest control and fertilization. Environmentally friendly options available.",
      location: "Central Region",
      availability: "Available",
      rating: 4.6,
    },
    {
      id: "3",
      title: "Soil Testing",
      category: "Consulting",
      price: "$75/sample",
      image:
        "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80",
      description:
        "Comprehensive soil analysis to determine nutrient levels, pH, and recommendations for optimal crop growth.",
      location: "All Regions",
      availability: "Limited",
      rating: 4.9,
    },
    {
      id: "4",
      title: "Harvesting Services",
      category: "Equipment Rental",
      price: "$100/acre",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
      description:
        "Professional harvesting services with modern combine harvesters. Ideal for grain crops like maize, wheat, and barley.",
      location: "Western Region",
      availability: "Seasonal",
      rating: 4.7,
    },
    {
      id: "5",
      title: "Irrigation Installation",
      category: "Installation",
      price: "$500/acre",
      image:
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=800&q=80",
      description:
        "Professional installation of drip irrigation, sprinkler systems, and other water-efficient irrigation solutions.",
      location: "All Regions",
      availability: "Available",
      rating: 4.8,
    },
    {
      id: "6",
      title: "Agricultural Consulting",
      category: "Consulting",
      price: "$200/session",
      image:
        "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=800&q=80",
      description:
        "Expert advice on crop selection, farming practices, and business planning from experienced agricultural consultants.",
      location: "Virtual",
      availability: "Available",
      rating: 4.9,
    },
  ];

  // Function to get availability badge color
  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "Limited":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "Seasonal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden flex flex-col h-full">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <Badge className="absolute top-2 right-2">{service.category}</Badge>
          </div>
          <CardContent className="p-4 flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.location}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <div className="flex items-center">
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </div>
                  </DropdownMenuItem>
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Service
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Service</DialogTitle>
                        <DialogDescription>
                          Update the details of your service offering
                        </DialogDescription>
                      </DialogHeader>
                      <ServiceForm initialData={service} />
                    </DialogContent>
                  </Dialog>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <div className="flex items-center">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-2">
              <p className="text-sm line-clamp-3">{service.description}</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Price:</span>
                <span className="font-medium">{service.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Rating:</span>
                <span className="font-medium">{service.rating}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Availability:</span>
                <Badge
                  variant="outline"
                  className={getAvailabilityBadge(service.availability)}
                >
                  {service.availability}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 mt-auto">
            <div className="flex justify-between w-full">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" /> View Details
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Edit Service</DialogTitle>
                    <DialogDescription>
                      Update the details of your service offering
                    </DialogDescription>
                  </DialogHeader>
                  <ServiceForm initialData={service} />
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
