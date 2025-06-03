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
import { Award, Calendar, FileCheck, Upload, X, Plus } from "lucide-react";

interface CertificationsProps {
  userRole?: string;
}

export function Certifications({ userRole = "farmer" }: CertificationsProps) {
  const { t } = useTranslation();
  const [certifications, setCertifications] = useState([
    // Farmer certifications
    ...(userRole === "farmer"
      ? [
          {
            id: "cert-1",
            name: "Organic Farming Certification",
            issuer: "African Organic Farming Association",
            issueDate: "2022-05-15",
            expiryDate: "2025-05-15",
            status: "active",
            type: "farming",
            documentUrl: "https://example.com/certificates/organic-farming.pdf",
          },
          {
            id: "cert-2",
            name: "Sustainable Agriculture Practices",
            issuer: "Global Sustainable Farming Initiative",
            issueDate: "2021-08-10",
            expiryDate: "2024-08-10",
            status: "active",
            type: "farming",
            documentUrl:
              "https://example.com/certificates/sustainable-agriculture.pdf",
          },
          {
            id: "cert-3",
            name: "Drone Pilot License for Agricultural Operations",
            issuer: "African Civil Aviation Authority",
            issueDate: "2023-02-20",
            expiryDate: "2026-02-20",
            status: "active",
            type: "technology",
            documentUrl: "https://example.com/certificates/drone-license.pdf",
          },
        ]
      : []),
    // Logistics certifications
    ...(userRole === "logistics"
      ? [
          {
            id: "cert-4",
            name: "Commercial Driver's License - Heavy Vehicles",
            issuer: "National Transport Authority",
            issueDate: "2021-03-15",
            expiryDate: "2026-03-15",
            status: "active",
            type: "transport",
            documentUrl: "https://example.com/certificates/cdl-heavy.pdf",
          },
          {
            id: "cert-5",
            name: "Refrigerated Transport Certification",
            issuer: "Cold Chain Association of Africa",
            issueDate: "2022-07-10",
            expiryDate: "2025-07-10",
            status: "active",
            type: "transport",
            documentUrl:
              "https://example.com/certificates/refrigerated-transport.pdf",
          },
          {
            id: "cert-6",
            name: "Hazardous Materials Transport License",
            issuer: "Department of Transportation",
            issueDate: "2023-01-05",
            expiryDate: "2026-01-05",
            status: "active",
            type: "transport",
            documentUrl: "https://example.com/certificates/hazmat.pdf",
          },
        ]
      : []),
    // Retailer certifications
    ...(userRole === "retailer"
      ? [
          {
            id: "cert-7",
            name: "Food Safety Management System Certification",
            issuer: "International Food Safety Authority",
            issueDate: "2022-04-18",
            expiryDate: "2025-04-18",
            status: "active",
            type: "safety",
            documentUrl: "https://example.com/certificates/food-safety.pdf",
          },
          {
            id: "cert-8",
            name: "Retail Business License",
            issuer: "Ministry of Trade and Industry",
            issueDate: "2021-09-30",
            expiryDate: "2024-09-30",
            status: "active",
            type: "business",
            documentUrl: "https://example.com/certificates/retail-license.pdf",
          },
        ]
      : []),
    // Service provider certifications
    ...(userRole === "service"
      ? [
          {
            id: "cert-9",
            name: "Pest Management Professional Certification",
            issuer: "Agricultural Pest Control Association",
            issueDate: "2022-06-12",
            expiryDate: "2025-06-12",
            status: "active",
            type: "pest-control",
            documentUrl: "https://example.com/certificates/pest-management.pdf",
          },
          {
            id: "cert-10",
            name: "Agricultural Equipment Maintenance Certification",
            issuer: "Farm Equipment Manufacturers Association",
            issueDate: "2021-11-05",
            expiryDate: "2024-11-05",
            status: "active",
            type: "maintenance",
            documentUrl:
              "https://example.com/certificates/equipment-maintenance.pdf",
          },
          {
            id: "cert-11",
            name: "Irrigation Systems Specialist",
            issuer: "Water Management Institute",
            issueDate: "2023-03-20",
            expiryDate: "2026-03-20",
            status: "active",
            type: "irrigation",
            documentUrl:
              "https://example.com/certificates/irrigation-specialist.pdf",
          },
        ]
      : []),
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    type: "",
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string, expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);

    // Check if certificate is expired
    if (now > expiry) {
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
    }

    // Check if certificate is expiring soon (within 3 months)
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    if (expiry < threeMonthsFromNow) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    }

    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
  };

  const getStatusText = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);

    if (now > expiry) {
      return "Expired";
    }

    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    if (expiry < threeMonthsFromNow) {
      return "Expiring Soon";
    }

    return "Active";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCertification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      ...newCertification,
      status: "active",
      documentUrl: "https://example.com/certificates/new-certificate.pdf",
    };

    setCertifications([...certifications, newCert]);
    setNewCertification({
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      type: "",
    });
    setIsAddingNew(false);
  };

  const handleRemoveCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  // Get role-specific certification types
  const getCertificationTypes = () => {
    switch (userRole) {
      case "farmer":
        return [
          { value: "farming", label: "Farming Practices" },
          { value: "technology", label: "Agricultural Technology" },
          { value: "safety", label: "Safety & Compliance" },
          { value: "organic", label: "Organic Certification" },
        ];
      case "logistics":
        return [
          { value: "transport", label: "Transport License" },
          { value: "safety", label: "Safety Certification" },
          { value: "vehicle", label: "Vehicle Certification" },
          { value: "international", label: "International Transport" },
        ];
      case "retailer":
        return [
          { value: "business", label: "Business License" },
          { value: "safety", label: "Food Safety" },
          { value: "quality", label: "Quality Assurance" },
        ];
      case "service":
        return [
          { value: "pest-control", label: "Pest Management" },
          { value: "maintenance", label: "Equipment Maintenance" },
          { value: "irrigation", label: "Irrigation Systems" },
          { value: "consulting", label: "Agricultural Consulting" },
        ];
      default:
        return [
          { value: "general", label: "General Certification" },
          { value: "professional", label: "Professional License" },
        ];
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Certifications & Licenses
        </CardTitle>
        <CardDescription>
          Manage your professional certifications and licenses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {certifications.length === 0 ? (
          <div className="text-center py-8 border rounded-md">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              You haven't added any certifications yet
            </p>
            <Button onClick={() => setIsAddingNew(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Your First Certification
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Issued by: {cert.issuer}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={getStatusColor(cert.status, cert.expiryDate)}
                    >
                      {getStatusText(cert.expiryDate)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveCertification(cert.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Issued: {formatDate(cert.issueDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Expires: {formatDate(cert.expiryDate)}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Badge variant="outline">{cert.type}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <FileCheck className="h-4 w-4" /> View Certificate
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <Button onClick={() => setIsAddingNew(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Certification
              </Button>
            </div>
          </div>
        )}

        {isAddingNew && (
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-medium mb-4">Add New Certification</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Certification Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newCertification.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Organic Farming Certification"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuing Organization</Label>
                  <Input
                    id="issuer"
                    name="issuer"
                    value={newCertification.issuer}
                    onChange={handleInputChange}
                    placeholder="e.g. African Organic Farming Association"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    name="issueDate"
                    type="date"
                    value={newCertification.issueDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={newCertification.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Certification Type</Label>
                  <select
                    id="type"
                    name="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newCertification.type}
                    onChange={(e) =>
                      setNewCertification({
                        ...newCertification,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="">Select type</option>
                    {getCertificationTypes().map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <p className="text-muted-foreground">
                  Drag and drop certificate file here or click to browse
                </p>
                <Button type="button" variant="outline" className="mt-2">
                  <Upload className="mr-2 h-4 w-4" /> Upload Certificate
                </Button>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCertification}>
                  Add Certification
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
