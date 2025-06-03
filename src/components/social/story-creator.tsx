"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";
import { Camera, Image, FileText, MapPin, X, Hash, Type } from "lucide-react";

interface StoryCreatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStoryCreated: (story: any) => void;
  user: {
    name: string;
    avatar: string;
    role?: string;
  };
}

export function StoryCreator({
  open,
  onOpenChange,
  onStoryCreated,
  user,
}: StoryCreatorProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"image" | "text" | "document">(
    "image",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [textContent, setTextContent] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      if (activeTab === "image") {
        fileInputRef.current.accept = "image/*";
      } else if (activeTab === "document") {
        fileInputRef.current.accept =
          ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt";
      }
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (activeTab === "document") {
        setDocumentName(file.name);
        setMediaPreview(URL.createObjectURL(file));
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setMediaPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveMedia = () => {
    setMediaPreview(null);
    setDocumentName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = () => {
    if (
      (activeTab === "image" && !mediaPreview) ||
      (activeTab === "text" && !textContent) ||
      (activeTab === "document" && !mediaPreview)
    ) {
      return;
    }

    setIsSubmitting(true);

    // Create story object based on the active tab
    const storyContent = {
      type: activeTab,
      ...(activeTab === "image" && { src: mediaPreview }),
      ...(activeTab === "text" && { text: textContent }),
      ...(activeTab === "document" && {
        src: mediaPreview,
        documentType: documentName,
      }),
      location: location || undefined,
      tags: tags.length > 0 ? tags : undefined,
    };

    // Simulate API call
    setTimeout(() => {
      onStoryCreated({
        id: `story-${Date.now()}`,
        user,
        viewed: false,
        timestamp: "now",
        content: [storyContent],
      });

      // Reset form
      setActiveTab("image");
      setMediaPreview(null);
      setDocumentName("");
      setTextContent("");
      setLocation("");
      setTags([]);
      setCurrentTag("");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("social.createStory")}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              {t("social.photo")}
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              {t("social.text")}
            </TabsTrigger>
            <TabsTrigger value="document" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t("social.document")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            {mediaPreview ? (
              <div className="relative">
                <img
                  src={mediaPreview}
                  alt="Story preview"
                  className="w-full h-[300px] object-cover rounded-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={handleRemoveMedia}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="w-full h-[300px] border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={handleFileUpload}
              >
                <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  {t("social.uploadPhoto")}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <Textarea
              placeholder={t("social.storyTextPlaceholder")}
              className="min-h-[200px] text-lg"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
          </TabsContent>

          <TabsContent value="document" className="space-y-4">
            {mediaPreview ? (
              <div className="relative border rounded-md p-4">
                <div className="flex items-center">
                  <FileText className="h-10 w-10 mr-4 text-primary" />
                  <div>
                    <p className="font-medium">{documentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("social.documentAttached")}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={handleRemoveMedia}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="w-full h-[200px] border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={handleFileUpload}
              >
                <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  {t("social.uploadDocument")}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <p className="text-sm font-medium">{t("social.location")}</p>
            </div>
            <Input
              placeholder={t("social.locationPlaceholder")}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Hash className="h-4 w-4 mr-2 text-muted-foreground" />
              <p className="text-sm font-medium">{t("social.tags")}</p>
            </div>
            <div className="flex items-center">
              <Input
                placeholder={t("social.tagsPlaceholder")}
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                variant="outline"
                className="ml-2"
                onClick={handleAddTag}
                disabled={!currentTag.trim()}
              >
                {t("social.add")}
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              (activeTab === "image" && !mediaPreview) ||
              (activeTab === "text" && !textContent) ||
              (activeTab === "document" && !mediaPreview)
            }
          >
            {isSubmitting ? t("social.creating") : t("social.createStory")}
          </Button>
        </DialogFooter>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </DialogContent>
    </Dialog>
  );
}
