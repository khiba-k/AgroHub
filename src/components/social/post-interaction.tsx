"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { Heart, MessageSquare, Share } from "lucide-react";

interface PostInteractionProps {
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export function PostInteraction({
  likeCount,
  commentCount,
  isLiked,
  onLike,
  onComment,
  onShare,
}: PostInteractionProps) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className={isLiked ? "text-red-500" : ""}
          onClick={onLike}
        >
          <Heart
            className={`mr-1 h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`}
          />
          {likeCount > 0 && <span>{likeCount}</span>}
        </Button>
        <Button variant="ghost" size="sm" onClick={onComment}>
          <MessageSquare className="mr-1 h-4 w-4" />
          {commentCount > 0 && <span>{commentCount}</span>}
        </Button>
      </div>
      <Button variant="ghost" size="sm" onClick={onShare}>
        <Share className="mr-1 h-4 w-4" />
        {t("social.share")}
      </Button>
    </div>
  );
}
