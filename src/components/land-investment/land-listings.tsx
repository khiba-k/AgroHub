"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  MapPin,
  Landmark,
  Ruler,
  Droplets,
} from "lucide-react";
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
import { LandForm } from "./land-form";
import { LandDetails } from "./land-details";
import { useTranslation } from "@/lib/i18n";

interface LandListingsProps {
  type: "available" | "my-listings";
}

export function LandListings({ type }: LandListingsProps) {
  const { t } = useTranslation();

  // Mock land data
  const lands = [
    {
      id: "1",
      title: "Fertile Farmland in Maseru District",
      location: "Maseru, Lesotho",
      size: 50, // hectares
      price: 75000, // USD
      pricePerHectare: 1500,
      waterAccess: true,
      soilType: "Loamy",
      description:
        "Fertile farmland with good access to water sources. Suitable for various crops including wheat, maize, and vegetables.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      owner: {
        name: "Tumelo Lerotholi",
        contact: "+266 5555 1234",
      },
      status: "available",
      investmentType: "Full Purchase",
      currency: "USD",
    },
    {
      id: "2",
      title: "Highland Grazing Land",
      location: "Mokhotlong, Lesotho",
      size: 120, // hectares
      price: 96000, // USD
      pricePerHectare: 800,
      waterAccess: true,
      soilType: "Clay Loam",
      description:
        "Excellent highland grazing land suitable for livestock. Natural water sources and good vegetation coverage.",
      image:
        "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&q=80",
      owner: {
        name: "Lineo Mokhoro",
        contact: "+266 5555 5678",
      },
      status: "available",
      investmentType: "Partnership",
      currency: "USD",
    },
    {
      id: "3",
      title: "Arable Land with Irrigation",
      location: "Leribe, Lesotho",
      size: 35, // hectares
      price: 70000, // USD
      pricePerHectare: 2000,
      waterAccess: true,
      soilType: "Sandy Loam",
      description:
        "Arable land with established irrigation system. Perfect for intensive crop farming with high yield potential.",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
      owner: {
        name: "Thabo Mofokeng",
        contact: "+266 5555 9012",
      },
      status: "my-listing",
      investmentType: "Lease (10 years)",
      currency: "USD",
    },
    {
      id: "4",
      title: "Mixed-Use Agricultural Land",
      location: "Berea, Lesotho",
      size: 80, // hectares
      price: 120000, // USD
      pricePerHectare: 1500,
      waterAccess: true,
      soilType: "Loam",
      description:
        "Mixed-use agricultural land suitable for both crops and livestock. Includes small forested area and natural spring.",
      image:
        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
      owner: {
        name: "Mpho Lebona",
        contact: "+266 5555 3456",
      },
      status: "my-listing",
      investmentType: "Full Purchase",
      currency: "USD",
    },
  ];

  const filteredLands = lands.filter((land) =>
    type === "available"
      ? land.status === "available"
      : land.status === "my-listing",
  );

  const [selectedLand, setSelectedLand] = React.useState<any>(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const handleViewDetails = (land: any) => {
    setSelectedLand(land);
    setDetailsOpen(true);
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

  return (
    <div className="space-y-6">
      {filteredLands.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-muted-foreground">
            {type === "available"
              ? t("landInvestment.noAvailableLand")
              : t("landInvestment.noListings")}
          </p>
          {type === "my-listings" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">
                  {t("landInvestment.listYourLand")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{t("landInvestment.listYourLand")}</DialogTitle>
                  <DialogDescription>
                    {t("landInvestment.listingDescription")}
                  </DialogDescription>
                </DialogHeader>
                <LandForm />
              </DialogContent>
            </Dialog>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLands.map((land) => (
            <Card key={land.id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={land.image}
                  alt={land.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <Badge className="absolute top-2 right-2">
                  {land.investmentType}
                </Badge>
              </div>
              <CardContent className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{land.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {land.location}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        {t("common.actions")}
                      </DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewDetails(land)}>
                        <Eye className="mr-2 h-4 w-4" />{" "}
                        {t("landInvestment.viewDetails")}
                      </DropdownMenuItem>
                      {type === "my-listings" && (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Edit className="mr-2 h-4 w-4" />{" "}
                                {t("landInvestment.editListing")}
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>
                                  {t("landInvestment.editLandListing")}
                                </DialogTitle>
                                <DialogDescription>
                                  {t("landInvestment.editListingDescription")}
                                </DialogDescription>
                              </DialogHeader>
                              <LandForm initialData={land} />
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />{" "}
                            {t("landInvestment.removeListing")}
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm flex items-center">
                      <Ruler className="h-3 w-3 mr-1" />{" "}
                      {t("landInvestment.size")}:
                    </span>
                    <span className="font-medium">
                      {land.size} {t("landInvestment.hectares")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {t("landInvestment.price")}:
                    </span>
                    <span className="font-medium">
                      {getCurrencySymbol(land.currency)}
                      {land.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {t("landInvestment.perHectare")}:
                    </span>
                    <span className="font-medium">
                      {getCurrencySymbol(land.currency)}
                      {land.pricePerHectare.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm flex items-center">
                      <Droplets className="h-3 w-3 mr-1" />{" "}
                      {t("landInvestment.waterAccess")}:
                    </span>
                    <span className="font-medium">
                      {land.waterAccess ? t("common.yes") : t("common.no")}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between border-t mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(land)}
                >
                  <Eye className="mr-2 h-4 w-4" />{" "}
                  {t("landInvestment.viewDetails")}
                </Button>
                {type === "available" ? (
                  <Button size="sm">
                    <Landmark className="mr-2 h-4 w-4" />{" "}
                    {t("landInvestment.invest")}
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Edit className="mr-2 h-4 w-4" /> {t("common.edit")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>
                          {t("landInvestment.editLandListing")}
                        </DialogTitle>
                        <DialogDescription>
                          {t("landInvestment.editListingDescription")}
                        </DialogDescription>
                      </DialogHeader>
                      <LandForm initialData={land} />
                    </DialogContent>
                  </Dialog>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedLand && <LandDetails land={selectedLand} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
