import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Search,
  Filter,
  Eye,
  Download,
  TrendingUp,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  PieChart,
} from "lucide-react";
import { CurrencySwitcher } from "@/components/currency-switcher";

export default function FinancePage() {
  // Mock transactions data
  const transactions = [
    {
      id: "TRX-001",
      date: "2023-11-15",
      description: "Payment from Cape Town Organics",
      amount: 1250.75,
      type: "income",
      category: "Sales",
      status: "completed",
      currency: "USD",
    },
    {
      id: "TRX-002",
      date: "2023-11-14",
      description: "Purchase of Seeds",
      amount: 450.25,
      type: "expense",
      category: "Supplies",
      status: "completed",
      currency: "USD",
    },
    {
      id: "TRX-003",
      date: "2023-11-13",
      description: "Land Investment Return",
      amount: 875.5,
      type: "income",
      category: "Investment",
      status: "completed",
      currency: "USD",
    },
    {
      id: "TRX-004",
      date: "2023-11-12",
      description: "Equipment Maintenance",
      amount: 320.0,
      type: "expense",
      category: "Maintenance",
      status: "pending",
      currency: "USD",
    },
    {
      id: "TRX-005",
      date: "2023-11-10",
      description: "Auction Sale - Livestock",
      amount: 2150.0,
      type: "income",
      category: "Sales",
      status: "completed",
      currency: "USD",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "income":
        return "text-green-600";
      case "expense":
        return "text-red-600";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate financial summary
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
              <p className="text-muted-foreground">
                Manage your financial transactions and investments
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CurrencySwitcher defaultCurrency="USD" />
            <Button>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${netBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Current balance across all accounts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${totalIncome.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ${totalExpenses.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                -3.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Investment Returns
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$875.50</div>
              <p className="text-xs text-muted-foreground">
                +8.3% return on investments
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center mt-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <TabsContent value="transactions" className="space-y-4 mt-4">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Transaction ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Description
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Category
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Amount
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle font-medium">
                          {transaction.id}
                        </td>
                        <td className="p-4 align-middle">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="p-4 align-middle">
                          {transaction.description}
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant="outline">
                            {transaction.category}
                          </Badge>
                        </td>
                        <td
                          className={`p-4 align-middle font-medium ${getTypeColor(transaction.type)}`}
                        >
                          {transaction.type === "income" ? "+" : "-"}$
                          {transaction.amount.toFixed(2)}
                        </td>
                        <td className="p-4 align-middle">
                          <Badge
                            className={getStatusColor(transaction.status)}
                            variant="outline"
                          >
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="investments" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Land Investments</CardTitle>
                  <CardDescription>
                    Your agricultural land investment portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Highland Grazing Land</p>
                        <p className="text-sm text-muted-foreground">
                          Mokhotlong, Lesotho
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$25,000</p>
                        <p className="text-sm text-green-600">+8.5% return</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          Arable Land with Irrigation
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Leribe, Lesotho
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$35,000</p>
                        <p className="text-sm text-green-600">+12.3% return</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Crop Futures</CardTitle>
                  <CardDescription>
                    Your agricultural futures contracts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Maize Futures</p>
                        <p className="text-sm text-muted-foreground">
                          Expires Dec 2023
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$12,500</p>
                        <p className="text-sm text-green-600">+5.2% return</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Coffee Futures</p>
                        <p className="text-sm text-muted-foreground">
                          Expires Mar 2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$8,750</p>
                        <p className="text-sm text-red-600">-2.1% return</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expenses</CardTitle>
                  <CardDescription>
                    Monthly financial performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Chart visualization would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                  <CardDescription>Breakdown of income sources</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Chart visualization would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">
                          Expires 12/2025
                        </p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Wallet className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Bank Account</p>
                        <p className="text-sm text-muted-foreground">
                          Standard Bank ****1234
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Set Default
                    </Button>
                  </div>

                  <Button className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>
                  Scheduled payments and subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Equipment Lease</p>
                      <p className="text-sm text-muted-foreground">
                        Monthly payment
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$350.00</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> Due Nov 30, 2023
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Insurance Premium</p>
                      <p className="text-sm text-muted-foreground">
                        Quarterly payment
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$750.00</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> Due Dec 15, 2023
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
