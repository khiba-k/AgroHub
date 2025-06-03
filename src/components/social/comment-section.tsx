"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
}

interface CommentSectionProps {
  postId: string;
  initialComments?: Comment[];
  currentUser: {
    name: string;
    avatar: string;
  };
}

export function CommentSection({
  postId,
  initialComments = [],
  currentUser,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // Create a new comment
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
      content: newComment,
      timestamp: new Date(),
    };

    // Add the comment to the list
    setComments([...comments, comment]);
    setNewComment("");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-3">
        <Avatar>
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none"
          />
          <div className="mt-2 flex justify-end">
            <Button
              size="sm"
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </div>
      </div>

      {comments.length > 0 && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar>
                <AvatarImage
                  src={comment.author.avatar}
                  alt={comment.author.name}
                />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-accent rounded-lg p-3">
                  <div className="font-medium">{comment.author.name}</div>
                  <p>{comment.content}</p>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
