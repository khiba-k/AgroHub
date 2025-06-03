import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TrendingHashtags from "./trending-hashtags";
import SuggestedConnections from "./suggested-connections";
import { MapPin } from "lucide-react";

interface FeedSidebarProps {
  location?: string;
  hashtags?: Array<{ tag: string; posts: number }>;
  connections?: Array<{
    id: string;
    name: string;
    role: string;
    avatar: string;
    mutualConnections?: number;
    location?: string;
  }>;
  onTagClick?: (tag: string) => void;
}

const FeedSidebar = ({
  location = "Nairobi, Kenya",
  hashtags = [],
  connections = [],
  onTagClick = () => {},
}: FeedSidebarProps) => {
  return (
    <div className="space-y-6 sticky top-6">
      {location && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              Your Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{location}</p>
          </CardContent>
        </Card>
      )}

      <TrendingHashtags hashtags={hashtags} onTagClick={onTagClick} />

      <SuggestedConnections connections={connections} />
    </div>
  );
};

export default FeedSidebar;
