"use client";

import axios from "axios";
import React, { useState } from "react";
import { CartItem } from "../../utils/types";
import { useUserStore } from "@/lib/store/userStores";
import { useToastStore } from "@/lib/store/useToastStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const CartOrderSummary = ({
  totalItems,
  totalPrice,
  cartItems,
  setCartItems, 
}: {
  totalItems: number;
  totalPrice: number;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}) => {
  const { userId } = useUserStore();
  const { showToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleProceedOrder = async () => {
    try {
      if (!userId) {
        showToast(false, "You must be logged in to place an order.");
        return;
      }

      const cart = sessionStorage.getItem("cart-items");
      if (!cart) {
        showToast(false, "Your cart is empty.");
        return;
      }

      const cartItems = JSON.parse(cart);

      const payload = {
        buyerId: userId,
        items: cartItems,
        totalPrice,
      };

      console.log("Order Payload: ", payload);

      setIsLoading(true);

      const response = await axios.post("/api/orders/create", payload);

      if (response.status === 200 || response.status === 201) {
        showToast(true, "Order placed successfully!");
        sessionStorage.removeItem("cart-items");
        setCartItems([]); // Clear cart state after successful order

        // Optional: redirect here if needed
      } else {
        showToast(false, "Something went wrong placing the order.");
      }
    } catch (error) {
      console.error(error);
      showToast(false, "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card className="sticky top-8 border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span>Items ({totalItems})</span>
              <span className="font-medium">LSL {totalPrice.toFixed(2)}</span>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">
                  LSL {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <Button
            className="w-full hover:bg-gray-800"
            size="lg"
            disabled={cartItems.length === 0 || isLoading}
            onClick={handleProceedOrder}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                Processing...
              </span>
            ) : (
              "Proceed with Order"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartOrderSummary;
