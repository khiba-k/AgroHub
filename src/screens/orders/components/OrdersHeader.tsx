// components/orders/OrdersHeader.tsx
import { Package } from "lucide-react";

export function OrdersHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-2">
        <Package className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Track and manage produce orders
          </p>
        </div>
      </div>
    </div>
  );
}
