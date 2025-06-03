"use client";

import { Button } from "@/components/ui/button";
import { PostCard } from "./post-card";
import { RefreshCw } from "lucide-react";

interface PostListProps {
  posts: Array<{
    id: string;
    author: {
      name: string;
      role?: string;
      avatar: string;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    timestamp: string;
    location?: string;
    tags?: string[];
  }>;
  currentUser: {
    name: string;
    avatar: string;
  };
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
}

const PostList = ({
  posts,
  currentUser,
  isLoading = false,
  hasMore = false,
  onLoadMore = () => {},
  onRefresh = () => {},
}: PostListProps) => {
  if (posts.length === 0 && !isLoading) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <p className="text-muted-foreground mb-4">
          No posts found. Follow more users or create your first post!
        </p>
        <Button onClick={onRefresh} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Feed
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Recent Posts</h2>
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} currentUser={currentUser} />
        ))}

        {isLoading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">
              Loading posts...
            </p>
          </div>
        )}

        {hasMore && !isLoading && (
          <div className="text-center py-4">
            <Button onClick={onLoadMore} variant="outline">
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
