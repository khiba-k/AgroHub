import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { CartItem } from "../../utils/types";

const CartItems = ({
  filteredCartItems,
  totalItems,
  searchQuery,
  updateQuantity,
  removeItem,
  lineErrors,
  isLoadingListings = false,  // <-- new prop with default false
}: {
  filteredCartItems: CartItem[];
  totalItems: number;
  searchQuery: string;
  updateQuantity: (produceId: string, newQuantity: number) => void;
  removeItem: (produceId: string) => void;
  lineErrors: Record<string, string>;
  isLoadingListings?: boolean; // optional boolean
}) => {
  return (
    <div>
      <div className="rounded-lg border border-gray-200">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <p className="text-sm mt-1">
            {searchQuery ? (
              <>
                {filteredCartItems.length} of {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
                {filteredCartItems.length === 0
                  ? " found"
                  : " matching your search"}
              </>
            ) : (
              <>
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </>
            )}
          </p>
        </div>

        <div className="divide-y">
          {filteredCartItems.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4" />
              {searchQuery ? (
                <>
                  <h3 className="text-lg font-medium mb-2">No items found</h3>
                  <p>Try searching for a different produce name or type</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500">
                    Start shopping to add items to your cart
                  </p>
                </>
              )}
            </div>
          ) : (
            filteredCartItems.map((item) => (
              <div key={item.produceId} className="p-6 transition-colors">
                <div className="flex items-center justify-between flex-col md:flex-row">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">
                      {item.produceType
                        ? `${item.produceType} ${item.produceName}`
                        : item.produceName}
                    </h3>
                    <p className="text-lg font-semibold mt-2">
                      LSL {item.totalPrice.toFixed(2)} ({item.selectedQuantity}{" "}
                      {item.unitType})
                    </p>

                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Breakdown:</strong>
                      <ul className="list-disc list-inside">
                        {item.orderBreakdown.map((ob) => (
                          <li key={ob.farmerId}>
                            {ob.farmerName}{" "}
                            {ob.location && `(${ob.location})`}: {ob.quantity}{" "}
                            {item.unitType} @ LSL{" "}
                            {(ob.price / ob.quantity).toFixed(2)} each
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end space-y-2 mt-4 md:mt-0">
                    <div className="flex items-center space-x-2">
                      <label
                        htmlFor={`quantity-${item.produceId}`}
                        className="text-sm font-medium"
                      >
                        Quantity:
                      </label>
                      <Input
                        id={`quantity-${item.produceId}`}
                        type="number"
                        min="1"
                        value={item.selectedQuantity}
                        disabled={isLoadingListings}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          updateQuantity(item.produceId, newQuantity);
                        }}
                        className="w-20 text-center"
                      />
                    </div>

                    {lineErrors[item.produceId] && (
                      <p className="text-red-600 text-sm">
                        {lineErrors[item.produceId]}
                      </p>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.produceId)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={isLoadingListings} // optionally disable remove too while loading
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
