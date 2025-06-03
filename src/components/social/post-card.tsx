"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { PostInteraction } from "./post-interaction";
import { CommentSection } from "./comment-section";
import { ShareDialog } from "./share-dialog";
import { MapPin, Globe, FileText } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DocumentPost } from "./document-post";
import { DocumentViewer } from "@/components/document-viewer";

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      role?: string;
      avatar: string;
    };
    content: string;
    image?: string;
    video?: string;
    document?: string;
    documentType?: string;
    likes: number;
    comments: number;
    timestamp: string;
    location?: string;
    tags?: string[];
  };
  currentUser: {
    name: string;
    avatar: string;
  };
}

export function PostCard({ post, currentUser }: PostCardProps) {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleDocumentClick = () => {
    setDocumentViewerOpen(true);
  };

  // Function to detect and linkify hashtags
  const renderContent = (content: string) => {
    const hashtagRegex = /(#\w+)/g;
    const parts = content.split(hashtagRegex);

    return parts.map((part, index) => {
      if (part.match(hashtagRegex)) {
        return (
          <span
            key={index}
            className="text-primary hover:underline cursor-pointer"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center">
              <p className="font-semibold">{post.author.name}</p>
              {post.author.role && (
                <Badge variant="outline" className="ml-2">
                  {post.author.role}
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <p>
                {formatDistanceToNow(new Date(post.timestamp), {
                  addSuffix: true,
                })}
              </p>
              {post.location && (
                <div className="flex items-center ml-2">
                  <span className="mx-1">•</span>
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{post.location}</span>
                </div>
              )}
              <div className="flex items-center ml-2">
                <span className="mx-1">•</span>
                <Globe className="h-3 w-3 mr-1" />
                <span>{t("social.public")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="whitespace-pre-line">{renderContent(post.content)}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {post.image && (
          <div className="mt-4 rounded-md overflow-hidden">
            <img
              src={post.image}
              alt="Post attachment"
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}

        {post.video && (
          <div className="mt-4 rounded-md overflow-hidden">
            <video
              src={post.video}
              controls
              className="w-full h-auto max-h-96"
            />
          </div>
        )}

        {post.document && (
          <div className="mt-4">
            <DocumentPost
              documentUrl={post.document}
              documentType={post.documentType || "Document"}
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-4 flex flex-col">
        <PostInteraction
          likeCount={likeCount}
          commentCount={post.comments}
          isLiked={isLiked}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />

        {showComments && (
          <div className="mt-4 w-full">
            <CommentSection
              postId={post.id}
              currentUser={currentUser}
              initialComments={[
                {
                  id: "1",
                  author: {
                    name: "Sarah Ochieng",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
                  },
                  content: "Great post! Looking forward to more updates.",
                  timestamp: new Date(Date.now() - 3600000),
                },
              ]}
            />
          </div>
        )}
      </CardFooter>

      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        postId={post.id}
        postTitle={post.content.substring(0, 30) + "..."}
      />

      {post.document && (
        <Dialog open={documentViewerOpen} onOpenChange={setDocumentViewerOpen}>
          <DialogContent className="max-w-4xl h-[80vh] p-0">
            <DocumentViewer file={post.document} type="auto" />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
