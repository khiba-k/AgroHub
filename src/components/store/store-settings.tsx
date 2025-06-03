import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StoreSettings() {
  return (
    <Tabs defaultValue="general">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>
              Manage your store details and appearance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" defaultValue="Green Valley Farm Store" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-description">Store Description</Label>
              <Textarea
                id="store-description"
                defaultValue="We offer fresh, organic produce directly from our farm to your table. All our products are grown using sustainable farming practices."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                defaultValue="contact@greenvalleyfarm.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input
                id="contact-phone"
                type="tel"
                defaultValue="+254 123 456 789"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-location">Store Location</Label>
              <Input id="store-location" defaultValue="Eastern Region, Kenya" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="payment" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Configure how you receive payments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Mobile Money</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept payments via M-Pesa and other mobile money services
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Bank Transfer</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept direct bank transfers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Cash on Delivery</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept cash payments upon delivery
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Credit/Debit Cards</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept payments via credit or debit cards
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Label htmlFor="mpesa-number">M-Pesa Business Number</Label>
              <Input id="mpesa-number" defaultValue="123456" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank-account">Bank Account Number</Label>
              <Input id="bank-account" defaultValue="1234567890" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input id="bank-name" defaultValue="Kenya Commercial Bank" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Payment Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="shipping" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Options</CardTitle>
            <CardDescription>
              Configure your shipping methods and rates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Local Delivery</Label>
                  <p className="text-sm text-muted-foreground">
                    Deliver to customers within your region
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Nationwide Shipping</Label>
                  <p className="text-sm text-muted-foreground">
                    Ship to customers across the country
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Customer Pickup</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow customers to pick up orders from your location
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Label htmlFor="local-delivery-fee">Local Delivery Fee ($)</Label>
              <Input id="local-delivery-fee" type="number" defaultValue="5" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationwide-shipping-fee">
                Nationwide Shipping Fee ($)
              </Label>
              <Input
                id="nationwide-shipping-fee"
                type="number"
                defaultValue="15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="free-shipping-threshold">
                Free Shipping Threshold ($)
              </Label>
              <Input
                id="free-shipping-threshold"
                type="number"
                defaultValue="100"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Orders above this amount qualify for free shipping
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Shipping Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive order and customer notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">New Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when new orders are placed
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Order Status Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when order statuses change
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when product stock is low
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Customer Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when customers send messages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input
                id="notification-email"
                type="email"
                defaultValue="notifications@greenvalleyfarm.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notification-phone">
                SMS Notification Number
              </Label>
              <Input
                id="notification-phone"
                type="tel"
                defaultValue="+254 123 456 789"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notification-frequency">
                Notification Frequency
              </Label>
              <Select defaultValue="realtime">
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Notification Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
