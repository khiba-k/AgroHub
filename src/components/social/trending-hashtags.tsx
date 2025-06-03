import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface HashtagProps {
  tag: string;
  posts: number;
}

interface TrendingHashtagsProps {
  hashtags?: HashtagProps[];
  onTagClick?: (tag: string) => void;
}

const TrendingHashtags = ({
  hashtags = [
    { tag: "SouthAfricanFarmers", posts: 1243 },
    { tag: "KenyaAgriTech", posts: 876 },
    { tag: "LesothoWoolProducers", posts: 654 },
    { tag: "DroughtResistant", posts: 521 },
    { tag: "AfricanProduce", posts: 498 },
  ],
  onTagClick = () => {},
}: TrendingHashtagsProps) => {
  return (
    <Card className="bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Hashtags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {hashtags.map((hashtag) => (
            <div
              key={hashtag.tag}
              className="flex items-center justify-between group hover:bg-muted/50 p-2 rounded-md transition-colors"
            >
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-primary"
                onClick={() => onTagClick(hashtag.tag)}
              >
                #{hashtag.tag}
              </Button>
              <Badge variant="secondary" className="text-xs">
                {hashtag.posts.toLocaleString()} posts
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            View All Trending Topics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingHashtags;
