"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Image, MapPin, Smile, X, FileText } from "lucide-react";

interface CreatePostProps {
  user: {
    name: string;
    avatar: string;
  };
  onPostCreated?: (
    content: string,
    media?: { type: string; url: string },
  ) => void;
}

export function CreatePost({ user, onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<
    "image" | "video" | "document" | null
  >(null);
  const [documentName, setDocumentName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!content.trim()) return;

    setIsSubmitting(true);

    // Simulate post creation - in a real app, this would call an API
    setTimeout(() => {
      if (onPostCreated) {
        if (mediaPreview) {
          onPostCreated(content, {
            type: mediaType || "image",
            url: mediaPreview,
          });
        } else {
          onPostCreated(content);
        }
      }
      setContent("");
      setMediaPreview(null);
      setMediaType(null);
      setDocumentName("");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleFileUpload = (type: "image" | "video" | "document") => {
    setMediaType(type);
    if (fileInputRef.current) {
      if (type === "image") {
        fileInputRef.current.accept = "image/*";
      } else if (type === "video") {
        fileInputRef.current.accept = "video/*";
      } else if (type === "document") {
        fileInputRef.current.accept =
          ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt";
      }
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll just create a local preview
      const reader = new FileReader();

      if (mediaType === "document") {
        // For documents, we don't show a preview but store the file name
        setDocumentName(file.name);
        setMediaPreview(URL.createObjectURL(file));
      } else {
        reader.onload = () => {
          setMediaPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

      // Store in localStorage for demo purposes
      const storageKey =
        mediaType === "image"
          ? "uploadedImages"
          : mediaType === "video"
            ? "uploadedVideos"
            : "uploadedDocuments";

      const storedItems = JSON.parse(localStorage.getItem(storageKey) || "[]");
      storedItems.push({
        name: file.name,
        type: file.type,
        size: file.size,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(storageKey, JSON.stringify(storedItems));
    }
  };

  const handleRemoveMedia = () => {
    setMediaPreview(null);
    setMediaType(null);
    setDocumentName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
              className="resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {mediaPreview && (
              <div className="mt-3 relative">
                {mediaType === "image" ? (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="rounded-md max-h-64 w-auto object-contain"
                  />
                ) : mediaType === "video" ? (
                  <video
                    src={mediaPreview}
                    controls
                    className="rounded-md max-h-64 w-full"
                  />
                ) : (
                  <div className="rounded-md p-4 bg-muted flex items-center">
                    <FileText className="h-8 w-8 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">{documentName}</p>
                      <p className="text-xs text-muted-foreground">
                        Document attached
                      </p>
                    </div>
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full"
                  onClick={handleRemoveMedia}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3">
        <div className="flex space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => handleFileUpload("image")}
          >
            <Image className="h-4 w-4 mr-2" />
            Photo
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => handleFileUpload("video")}
          >
            <Camera className="h-4 w-4 mr-2" />
            Video
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => handleFileUpload("document")}
          >
            <FileText className="h-4 w-4 mr-2" />
            Document
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Smile className="h-4 w-4 mr-2" />
            Feeling
          </Button>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}
