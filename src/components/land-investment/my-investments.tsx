"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, TrendingUp, DollarSign, Eye } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function MyInvestments() {
  const { t } = useTranslation();

  // Mock investment data
  const activeInvestments = [
    {
      id: "1",
      title: "Highland Grazing Land Partnership",
      location: "Mokhotlong, Lesotho",
      investmentDate: "2023-05-15",
      amount: 25000,
      type: "Partnership",
      status: "active",
      returns: 8.5,
      nextPayment: "2023-12-15",
      progress: 65,
    },
    {
      id: "2",
      title: "Arable Land Lease",
      location: "Leribe, Lesotho",
      investmentDate: "2023-08-22",
      amount: 35000,
      type: "Lease (5 years)",
      status: "active",
      returns: 12.3,
      nextPayment: "2023-11-22",
      progress: 25,
    },
  ];

  const pastInvestments = [
    {
      id: "3",
      title: "Small Farm Joint Venture",
      location: "Maseru, Lesotho",
      investmentDate: "2021-03-10",
      endDate: "2023-03-10",
      amount: 15000,
      type: "Joint Venture",
      status: "completed",
      returns: 15.7,
      totalReturns: 4710,
    },
  ];

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">
            {t("landInvestment.activeInvestments")}
          </TabsTrigger>
          <TabsTrigger value="past">
            {t("landInvestment.pastInvestments")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 pt-4">
          {activeInvestments.length === 0 ? (
            <div className="text-center py-10 border rounded-lg">
              <p className="text-muted-foreground">
                {t("landInvestment.noActiveInvestments")}
              </p>
              <Button className="mt-4">
                {t("landInvestment.browseAvailableLand")}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {investment.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {investment.location}
                        </p>
                      </div>
                      <Badge>{investment.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {t("landInvestment.investmentDate")}
                        </p>
                        <p className="text-sm font-medium flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(investment.investmentDate)}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {t("landInvestment.investmentAmount")}
                        </p>
                        <p className="text-sm font-medium flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />$
                          {investment.amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {t("landInvestment.currentReturns")}
                        </p>
                        <p className="text-sm font-medium flex items-center text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {investment.returns}%
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {t("landInvestment.nextPayment")}
                        </p>
                        <p className="text-sm font-medium">
                          {formatDate(investment.nextPayment)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                          {t("landInvestment.investmentProgress")}
                        </p>
                        <p className="text-xs font-medium">
                          {investment.progress}%
                        </p>
                      </div>
                      <Progress value={investment.progress} className="h-2" />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />{" "}
                        {t("landInvestment.viewDetails")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("landInvestment.investmentSummary")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {t("landInvestment.totalInvested")}
                  </p>
                  <p className="text-2xl font-bold">
                    $
                    {activeInvestments
                      .reduce((sum, inv) => sum + inv.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {t("landInvestment.averageReturn")}
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {(
                      activeInvestments.reduce(
                        (sum, inv) => sum + inv.returns,
                        0,
                      ) / activeInvestments.length
                    ).toFixed(1)}
                    %
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {t("landInvestment.activeInvestments")}
                  </p>
                  <p className="text-2xl font-bold">
                    {activeInvestments.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4 pt-4">
          {pastInvestments.length === 0 ? (
            <div className="text-center py-10 border rounded-lg">
              <p className="text-muted-foreground">
                {t("landInvestment.noPastInvestments")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {investment.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {investment.location}
                        </p>
                      </div>
                      <Badge variant="outline">{investment.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {t("landInvestment.investmentPeriod")}
                        </p>
                        <p className="text-sm font-medium">
                          {formatDate(investment.investmentDate)} -{" "}
                          {formatDate(investment.endDate)}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {t("landInvestment.investmentAmount")}
                        </p>
                        <p className="text-sm font-medium">
                          ${investment.amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {t("landInvestment.totalReturn")}
                        </p>
                        <p className="text-sm font-medium text-green-600">
                          {investment.returns}% ($
                          {investment.totalReturns.toLocaleString()})
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {t("common.status")}
                        </p>
                        <p className="text-sm font-medium capitalize">
                          {investment.status}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />{" "}
                        {t("landInvestment.viewDetails")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {pastInvestments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("landInvestment.pastInvestmentSummary")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {t("landInvestment.totalInvested")}
                    </p>
                    <p className="text-2xl font-bold">
                      $
                      {pastInvestments
                        .reduce((sum, inv) => sum + inv.amount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {t("landInvestment.totalReturns")}
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      $
                      {pastInvestments
                        .reduce((sum, inv) => sum + inv.totalReturns, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {t("landInvestment.completedInvestments")}
                    </p>
                    <p className="text-2xl font-bold">
                      {pastInvestments.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
