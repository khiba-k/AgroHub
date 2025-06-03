"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PlusCircle, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
    role?: string;
  };
  viewed: boolean;
  timestamp: string;
  content?: {
    type: "image" | "video" | "text";
    src?: string;
    text?: string;
    location?: string;
    tags?: string[];
  }[];
}

interface StoriesCarouselProps {
  stories?: Story[];
  currentUser?: {
    name: string;
    avatar: string;
  };
  onStoryClick?: (storyId: string) => void;
  onCreateStory?: () => void;
}

const StoriesCarousel = ({
  stories = [],
  currentUser = {
    name: "John Farmer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  onStoryClick = () => {},
  onCreateStory = () => {},
}: StoriesCarouselProps) => {
  const [hoveredStory, setHoveredStory] = useState<string | null>(null);

  // Group stories by user to show only one avatar per user
  const userStories = stories.reduce<Record<string, Story>>((acc, story) => {
    // If we haven't seen this user yet, or this story is newer than what we have
    if (!acc[story.user.name] || !acc[story.user.name].viewed) {
      acc[story.user.name] = story;
    }
    return acc;
  }, {});

  const uniqueStories = Object.values(userStories);

  return (
    <Card className="w-full bg-card mb-6 border-none shadow-md overflow-hidden">
      <CardContent className="p-4">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {/* Create Story Item */}
            <CarouselItem className="basis-1/6 sm:basis-1/6 md:basis-1/7 lg:basis-1/8">
              <div className="flex flex-col items-center space-y-2">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <Avatar className="h-14 w-14 border-2 border-background">
                      <AvatarImage src={currentUser.avatar} alt="Your avatar" />
                      <AvatarFallback>
                        {currentUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <Button
                    size="icon"
                    variant="primary"
                    className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-md"
                    onClick={onCreateStory}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-xs font-medium text-center">
                  Add Story
                </span>
              </div>
            </CarouselItem>

            {/* Story Items */}
            {uniqueStories.map((story) => (
              <CarouselItem
                key={story.id}
                className="basis-1/6 sm:basis-1/6 md:basis-1/7 lg:basis-1/8"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="flex flex-col items-center space-y-2 cursor-pointer group"
                        onClick={() => onStoryClick(story.id)}
                        onMouseEnter={() => setHoveredStory(story.id)}
                        onMouseLeave={() => setHoveredStory(null)}
                      >
                        <div
                          className={`h-16 w-16 rounded-full p-[2px] ${story.viewed ? "bg-muted" : "bg-gradient-to-br from-primary to-primary/70"}`}
                        >
                          <div className="h-full w-full rounded-full overflow-hidden border-2 border-background relative group-hover:scale-105 transition-transform">
                            <img
                              src={story.user.avatar}
                              alt={story.user.name}
                              className="h-full w-full object-cover"
                            />
                            {story.content &&
                              story.content[0]?.type === "image" && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Camera className="h-5 w-5 text-white" />
                                </div>
                              )}
                          </div>
                        </div>
                        <span className="text-xs font-medium text-center truncate w-full">
                          {story.user.name.split(" ")[0]}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{story.user.name}</p>
                      {story.user.role && (
                        <p className="text-xs text-muted-foreground">
                          {story.user.role}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {story.timestamp}
                      </p>
                      {story.content && story.content[0]?.tags && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {story.content[0].tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs text-primary">
                              #{tag}
                            </span>
                          ))}
                          {story.content[0].tags.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{story.content[0].tags.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-2">
            <CarouselPrevious className="static translate-y-0 h-8 w-8" />
            <CarouselNext className="static translate-y-0 h-8 w-8" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default StoriesCarousel;
