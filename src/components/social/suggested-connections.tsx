import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { UserPlus } from "lucide-react";

interface Connection {
  id: string;
  name: string;
  role: string;
  avatar: string;
  mutualConnections?: number;
  location?: string;
}

interface SuggestedConnectionsProps {
  connections?: Connection[];
  title?: string;
  showLocation?: boolean;
  maxDisplay?: number;
}

const SuggestedConnections = ({
  connections = [
    {
      id: "1",
      name: "Maria Rodriguez",
      role: "Farmer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      mutualConnections: 5,
      location: "Eastern Region",
    },
    {
      id: "2",
      name: "David Kimani",
      role: "Distributor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      mutualConnections: 3,
      location: "Central Region",
    },
    {
      id: "3",
      name: "Sarah Ochieng",
      role: "Agricultural Expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      mutualConnections: 8,
      location: "Western Region",
    },
    {
      id: "4",
      name: "John Mwangi",
      role: "Retailer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      mutualConnections: 2,
      location: "Northern Region",
    },
  ],
  title = "Suggested Connections",
  showLocation = true,
  maxDisplay = 4,
}: SuggestedConnectionsProps) => {
  const displayConnections = connections.slice(0, maxDisplay);

  return (
    <Card className="w-full bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayConnections.map((connection) => (
          <div
            key={connection.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={connection.avatar} alt={connection.name} />
                <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{connection.name}</p>
                <p className="text-xs text-muted-foreground">
                  {connection.role}
                </p>
                {showLocation && connection.location && (
                  <p className="text-xs text-muted-foreground">
                    {connection.location}
                  </p>
                )}
                {connection.mutualConnections && (
                  <p className="text-xs text-muted-foreground">
                    {connection.mutualConnections} mutual connection
                    {connection.mutualConnections !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Connect</span>
            </Button>
          </div>
        ))}

        {connections.length > maxDisplay && (
          <Button variant="link" className="w-full text-sm mt-2">
            View all connections
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SuggestedConnections;
