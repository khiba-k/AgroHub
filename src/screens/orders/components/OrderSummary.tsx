// components/orders/OrdersSummary.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OrdersSummaryProps {
  total: number;
  processing: number;
  shipped: number;
  delivered: number;
  pending: number;
}

export function OrdersSummary({
  total,
  processing,
  shipped,
  delivered,
  pending,
}: OrdersSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          Overview of your order history and spending
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processing}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Shipped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shipped}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{delivered}</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
