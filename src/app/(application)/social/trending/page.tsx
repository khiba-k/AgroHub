import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hash, MapPin, Search, TrendingUp, Users } from "lucide-react";

export default function TrendingPage() {
  // Mock trending data
  const trendingTopics = [
    { tag: "SouthAfricanFarmers", posts: 1243, growth: "+15%" },
    { tag: "KenyaAgriTech", posts: 876, growth: "+23%" },
    { tag: "LesothoWoolProducers", posts: 654, growth: "+8%" },
    { tag: "DroughtResistant", posts: 521, growth: "+12%" },
    { tag: "AfricanProduce", posts: 498, growth: "+5%" },
    { tag: "FarmToTable", posts: 432, growth: "+7%" },
    { tag: "OrganicFarming", posts: 387, growth: "+10%" },
    { tag: "RainwaterHarvesting", posts: 356, growth: "+18%" },
  ];

  const trendingPeople = [
    {
      name: "Thabo Mofokeng",
      handle: "@thabomofokeng",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thabo",
      role: "Farmer",
      location: "Cape Town, South Africa",
      followers: 12500,
      growth: "+8%",
    },
    {
      name: "Wanjiku Kamau",
      handle: "@wanjikuk",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wanjiku",
      role: "Agricultural Expert",
      location: "Nairobi, Kenya",
      followers: 8700,
      growth: "+15%",
    },
    {
      name: "Tumelo Lerotholi",
      handle: "@tumelol",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tumelo",
      role: "Wool Producer",
      location: "Maseru, Lesotho",
      followers: 6300,
      growth: "+12%",
    },
    {
      name: "Lindiwe Dlamini",
      handle: "@lindiwed",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lindiwe",
      role: "Distributor",
      location: "Johannesburg, South Africa",
      followers: 5800,
      growth: "+7%",
    },
    {
      name: "Kipchoge Korir",
      handle: "@kipchogekorir",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kipchoge",
      role: "AgriTech Innovator",
      location: "Eldoret, Kenya",
      followers: 4900,
      growth: "+20%",
    },
  ];

  const trendingLocations = [
    {
      name: "Nairobi, Kenya",
      posts: 2345,
      growth: "+18%",
      topics: ["KenyaAgriTech", "DroughtResistant", "FarmToTable"],
    },
    {
      name: "Cape Town, South Africa",
      posts: 1876,
      growth: "+12%",
      topics: ["SouthAfricanFarmers", "OrganicFarming", "WineProduction"],
    },
    {
      name: "Johannesburg, South Africa",
      posts: 1654,
      growth: "+9%",
      topics: ["UrbanFarming", "AgriDistribution", "FarmersMarket"],
    },
    {
      name: "Maseru, Lesotho",
      posts: 987,
      growth: "+15%",
      topics: ["LesothoWoolProducers", "HighlandFarming", "WaterConservation"],
    },
    {
      name: "Mombasa, Kenya",
      posts: 876,
      growth: "+7%",
      topics: ["CoastalFarming", "FishFarming", "ExportProduce"],
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trending</h1>
          <p className="text-muted-foreground">
            Discover what's popular in the agricultural community
          </p>
        </div>

        <div className="relative flex-1 mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search trending topics, people, or locations..."
            className="pl-8"
          />
        </div>

        <Tabs defaultValue="topics">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="topics">
              <Hash className="mr-2 h-4 w-4" /> Topics
            </TabsTrigger>
            <TabsTrigger value="people">
              <Users className="mr-2 h-4 w-4" /> People
            </TabsTrigger>
            <TabsTrigger value="locations">
              <MapPin className="mr-2 h-4 w-4" /> Locations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendingTopics.map((topic, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold text-primary">
                              #{topic.tag}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {topic.posts.toLocaleString()} posts
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            {topic.growth}
                          </Badge>
                        </div>
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            View Posts
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="people" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Trending People
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingPeople.map((person, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={person.avatar} alt={person.name} />
                          <AvatarFallback>
                            {person.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{person.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {person.handle}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Badge variant="outline" className="mr-2">
                              {person.role}
                            </Badge>
                            <MapPin className="h-3 w-3 mr-1" />
                            {person.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="font-medium">
                            {person.followers.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">
                            followers
                          </span>
                        </div>
                        <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {person.growth}
                        </Badge>
                        <div className="mt-2">
                          <Button size="sm">Follow</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Trending Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingLocations.map((location, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold flex items-center">
                              <MapPin className="mr-2 h-4 w-4" />
                              {location.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {location.posts.toLocaleString()} posts
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            {location.growth}
                          </Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {location.topics.map((topic, i) => (
                            <Badge key={i} variant="secondary">
                              #{topic}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            View Posts
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
