"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Grid, List } from "lucide-react";

interface FeedFiltersProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  onViewChange: (view: "grid" | "list") => void;
  onSearch: (query: string) => void;
  activeFilter: string;
  activeSort: string;
  activeView: "grid" | "list";
}

const FeedFilters = ({
  onFilterChange,
  onSortChange,
  onViewChange,
  onSearch,
  activeFilter = "all",
  activeSort = "latest",
  activeView = "list",
}: FeedFiltersProps) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center bg-card rounded-lg p-4 border">
      <div className="flex space-x-2">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
        >
          All
        </Button>
        <Button
          variant={activeFilter === "following" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("following")}
        >
          Following
        </Button>
        <Button
          variant={activeFilter === "popular" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("popular")}
        >
          Popular
        </Button>
      </div>

      <div className="flex flex-1 sm:max-w-md space-x-2">
        <form
          onSubmit={handleSearch}
          className="flex-1 flex space-x-2 relative"
        >
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              name="search"
              placeholder="Search posts..."
              className="pl-8"
            />
          </div>
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

        <div className="flex items-center space-x-2">
          <Select
            defaultValue={activeSort}
            onValueChange={(value) => onSortChange(value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="comments">Most Comments</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${activeView === "list" ? "bg-accent" : ""}`}
              onClick={() => onViewChange("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${activeView === "grid" ? "bg-accent" : ""}`}
              onClick={() => onViewChange("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedFilters;
