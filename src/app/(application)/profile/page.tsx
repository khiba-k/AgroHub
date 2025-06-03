import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Camera, MapPin, Pencil } from "lucide-react";

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "John Farmer",
    role: "Farmer",
    location: "Nairobi, Kenya",
    bio: "Organic farmer specializing in vegetables and fruits. Passionate about sustainable farming practices and connecting directly with consumers.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    coverImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    email: "john@agrohub.com",
    phone: "+254 123 456 789",
    website: "www.johnfarm.com",
    joinedDate: "January 2023",
  };

  return (
    <>
      <div className="space-y-6">
        <div className="relative h-48 w-full overflow-hidden rounded-xl md:h-60">
          <img
            src={user.coverImage}
            alt="Cover image"
            className="h-full w-full object-cover"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-4 top-4 bg-background/50 hover:bg-background/70"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative -mt-12 h-24 w-24 overflow-hidden rounded-full border-4 border-background md:-mt-16 md:h-32 md:w-32">
              <Avatar className="h-full w-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="ghost"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background hover:bg-accent"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{user.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{user.role}</span>
                <span>•</span>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              </div>
            </div>
          </div>
          <Button>Edit Profile</Button>
        </div>

        <Tabs defaultValue="wall">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="wall">Wall</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>
          <TabsContent value="wall" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Post</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Share an update with your network..." />
                <div className="mt-4 flex justify-end">
                  <Button>Post</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No posts yet. Start sharing with your network!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="about" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>Your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={user.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={user.phone} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" value={user.website} readOnly />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" value={user.bio} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products" className="pt-4">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No products listed yet.</p>
                <Button className="mt-4">Add Product</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="connections" className="pt-4">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No connections yet. Connect with farmers, retailers, and other
                  agricultural professionals.
                </p>
                <Button className="mt-4">Find Connections</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
