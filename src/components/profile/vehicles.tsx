"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/i18n";
import {
  Truck,
  Calendar,
  FileCheck,
  Upload,
  X,
  Plus,
  Thermometer,
  Fuel,
  Ruler,
  Weight,
} from "lucide-react";

interface VehiclesProps {
  userRole?: string;
}

export function Vehicles({ userRole = "logistics" }: VehiclesProps) {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState([
    {
      id: "veh-1",
      name: "Refrigerated Truck - Mercedes Benz Actros",
      type: "refrigerated",
      licensePlate: "LSO 456 GP",
      capacity: "15 tons",
      dimensions: "8.5m x 2.5m x 2.8m",
      temperatureRange: "-20°C to +5°C",
      fuelType: "Diesel",
      yearOfManufacture: "2020",
      lastInspection: "2023-08-15",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1586191552066-d52dd1e3af86?w=800&q=80",
    },
    {
      id: "veh-2",
      name: "Flatbed Truck - Isuzu FTR",
      type: "flatbed",
      licensePlate: "LSO 789 MP",
      capacity: "10 tons",
      dimensions: "7.2m x 2.4m x 1.2m",
      temperatureRange: null,
      fuelType: "Diesel",
      yearOfManufacture: "2019",
      lastInspection: "2023-06-10",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
    },
    {
      id: "veh-3",
      name: "Delivery Van - Toyota Hiace",
      type: "van",
      licensePlate: "LSO 234 JHB",
      capacity: "1.5 tons",
      dimensions: "5.3m x 1.9m x 2.1m",
      temperatureRange: null,
      fuelType: "Diesel",
      yearOfManufacture: "2021",
      lastInspection: "2023-09-05",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=800&q=80",
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "",
    licensePlate: "",
    capacity: "",
    dimensions: "",
    temperatureRange: "",
    fuelType: "",
    yearOfManufacture: "",
    lastInspection: "",
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "";
    }
  };

  const getVehicleTypeIcon = (type: string) => {
    switch (type) {
      case "refrigerated":
        return <Thermometer className="h-4 w-4 mr-1" />;
      case "flatbed":
        return <Ruler className="h-4 w-4 mr-1" />;
      case "van":
        return <Truck className="h-4 w-4 mr-1" />;
      case "tanker":
        return <Fuel className="h-4 w-4 mr-1" />;
      default:
        return <Truck className="h-4 w-4 mr-1" />;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddVehicle = () => {
    const newVeh = {
      id: `veh-${Date.now()}`,
      ...newVehicle,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
    };

    setVehicles([...vehicles, newVeh]);
    setNewVehicle({
      name: "",
      type: "",
      licensePlate: "",
      capacity: "",
      dimensions: "",
      temperatureRange: "",
      fuelType: "",
      yearOfManufacture: "",
      lastInspection: "",
    });
    setIsAddingNew(false);
  };

  const handleRemoveVehicle = (id: string) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  // Vehicle types
  const vehicleTypes = [
    { value: "refrigerated", label: "Refrigerated Truck" },
    { value: "flatbed", label: "Flatbed Truck" },
    { value: "van", label: "Delivery Van" },
    { value: "tanker", label: "Tanker Truck" },
    { value: "pickup", label: "Pickup Truck" },
    { value: "tractor", label: "Tractor Trailer" },
  ];

  // Fuel types
  const fuelTypes = [
    { value: "diesel", label: "Diesel" },
    { value: "petrol", label: "Petrol/Gasoline" },
    { value: "electric", label: "Electric" },
    { value: "hybrid", label: "Hybrid" },
    { value: "cng", label: "Compressed Natural Gas" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Fleet & Vehicles
        </CardTitle>
        <CardDescription>
          Manage your transportation vehicles and equipment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {vehicles.length === 0 ? (
          <div className="text-center py-8 border rounded-md">
            <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              You haven't added any vehicles to your fleet yet
            </p>
            <Button onClick={() => setIsAddingNew(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Your First Vehicle
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="border rounded-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="aspect-video md:aspect-square relative">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className={`absolute top-2 right-2 ${getStatusColor(vehicle.status)}`}
                    >
                      {vehicle.status.charAt(0).toUpperCase() +
                        vehicle.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="p-4 md:col-span-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{vehicle.name}</h3>
                        <div className="flex items-center mt-1">
                          {getVehicleTypeIcon(vehicle.type)}
                          <span className="text-sm text-muted-foreground">
                            {vehicle.type.charAt(0).toUpperCase() +
                              vehicle.type.slice(1)}{" "}
                            • {vehicle.licensePlate}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveVehicle(vehicle.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Capacity</p>
                        <p className="font-medium flex items-center">
                          <Weight className="h-3 w-3 mr-1" /> {vehicle.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dimensions</p>
                        <p className="font-medium flex items-center">
                          <Ruler className="h-3 w-3 mr-1" />{" "}
                          {vehicle.dimensions}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Fuel Type</p>
                        <p className="font-medium flex items-center">
                          <Fuel className="h-3 w-3 mr-1" /> {vehicle.fuelType}
                        </p>
                      </div>
                      {vehicle.temperatureRange && (
                        <div>
                          <p className="text-muted-foreground">
                            Temperature Range
                          </p>
                          <p className="font-medium flex items-center">
                            <Thermometer className="h-3 w-3 mr-1" />{" "}
                            {vehicle.temperatureRange}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-muted-foreground">Year</p>
                        <p className="font-medium">
                          {vehicle.yearOfManufacture}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Inspection</p>
                        <p className="font-medium">
                          {formatDate(vehicle.lastInspection)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <Button onClick={() => setIsAddingNew(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Vehicle
              </Button>
            </div>
          </div>
        )}

        {isAddingNew && (
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-medium mb-4">Add New Vehicle</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Vehicle Name/Model</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newVehicle.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Refrigerated Truck - Mercedes Benz Actros"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Vehicle Type</Label>
                  <select
                    id="type"
                    name="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newVehicle.type}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, type: e.target.value })
                    }
                  >
                    <option value="">Select type</option>
                    {vehicleTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    name="licensePlate"
                    value={newVehicle.licensePlate}
                    onChange={handleInputChange}
                    placeholder="e.g. LSO 456 GP"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    value={newVehicle.capacity}
                    onChange={handleInputChange}
                    placeholder="e.g. 15 tons"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
                  <Input
                    id="dimensions"
                    name="dimensions"
                    value={newVehicle.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g. 8.5m x 2.5m x 2.8m"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperatureRange">
                    Temperature Range (if applicable)
                  </Label>
                  <Input
                    id="temperatureRange"
                    name="temperatureRange"
                    value={newVehicle.temperatureRange}
                    onChange={handleInputChange}
                    placeholder="e.g. -20°C to +5°C"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newVehicle.fuelType}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, fuelType: e.target.value })
                    }
                  >
                    <option value="">Select fuel type</option>
                    {fuelTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearOfManufacture">Year of Manufacture</Label>
                  <Input
                    id="yearOfManufacture"
                    name="yearOfManufacture"
                    value={newVehicle.yearOfManufacture}
                    onChange={handleInputChange}
                    placeholder="e.g. 2020"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastInspection">Last Inspection Date</Label>
                  <Input
                    id="lastInspection"
                    name="lastInspection"
                    type="date"
                    value={newVehicle.lastInspection}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleImage">Vehicle Image</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <p className="text-muted-foreground">
                      Drag and drop image here or click to browse
                    </p>
                    <Button type="button" variant="outline" className="mt-2">
                      <Upload className="mr-2 h-4 w-4" /> Upload Image
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddVehicle}>Add Vehicle</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
